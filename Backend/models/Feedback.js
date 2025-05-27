const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // Student information
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },

  // Course/Assignment information
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  courseName: {
    type: String,
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    default: null
  },
  assignmentTitle: {
    type: String,
    default: null
  },

  // Teacher information
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  teacherName: {
    type: String,
    required: true
  },

  // Feedback content
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  
  // Feedback type and category
  feedbackType: {
    type: String,
    enum: ['positive', 'constructive', 'neutral', 'question'],
    default: 'neutral'
  },
  category: {
    type: String,
    enum: [
      'assignment_feedback',
      'course_feedback', 
      'general_inquiry',
      'technical_issue',
      'grade_inquiry',
      'content_clarification',
      'other'
    ],
    default: 'general_inquiry'
  },

  // Priority and urgency
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'closed'],
    default: 'pending',
    index: true
  },

  // Teacher response
  teacherResponse: {
    message: {
      type: String,
      maxlength: 2000
    },
    respondedAt: {
      type: Date
    },
    responseType: {
      type: String,
      enum: ['answer', 'acknowledgment', 'follow_up_needed']
    }
  },

  // Rating system (optional - for student to rate teacher's response)
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 500
    },
    ratedAt: {
      type: Date
    }
  },

  // Attachments
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Visibility and permissions
  isPrivate: {
    type: Boolean,
    default: false
  },
  visibleToStudent: {
    type: Boolean,
    default: true
  },

  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  },

  // Flags
  isArchived: {
    type: Boolean,
    default: false
  },
  requiresFollowUp: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
feedbackSchema.index({ teacherId: 1, status: 1, submittedAt: -1 });
feedbackSchema.index({ studentId: 1, submittedAt: -1 });
feedbackSchema.index({ courseId: 1, status: 1 });
feedbackSchema.index({ priority: 1, status: 1 });

// Virtual for response time calculation
feedbackSchema.virtual('responseTime').get(function() {
  if (this.teacherResponse && this.teacherResponse.respondedAt) {
    return this.teacherResponse.respondedAt.getTime() - this.submittedAt.getTime();
  }
  return null;
});

// Virtual for time since submission
feedbackSchema.virtual('timeSinceSubmission').get(function() {
  return Date.now() - this.submittedAt.getTime();
});

// Pre-save middleware to update lastUpdatedAt
feedbackSchema.pre('save', function(next) {
  this.lastUpdatedAt = new Date();
  
  // Auto-set resolved date when status changes to resolved
  if (this.isModified('status') && this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  
  // Set urgent flag based on priority
  this.isUrgent = this.priority === 'urgent';
  
  next();
});

// Static methods
feedbackSchema.statics.getByTeacher = function(teacherId, filters = {}) {
  const query = { teacherId, ...filters };
  return this.find(query)
    .populate('studentId', 'name email')
    .populate('courseId', 'name code')
    .sort({ submittedAt: -1 });
};

feedbackSchema.statics.getByStudent = function(studentId, filters = {}) {
  const query = { studentId, visibleToStudent: true, ...filters };
  return this.find(query)
    .populate('teacherId', 'name email')
    .populate('courseId', 'name code')
    .sort({ submittedAt: -1 });
};

feedbackSchema.statics.getPendingFeedback = function(teacherId) {
  return this.find({ 
    teacherId, 
    status: 'pending' 
  })
  .populate('studentId', 'name email')
  .populate('courseId', 'name code')
  .sort({ priority: -1, submittedAt: 1 });
};

feedbackSchema.statics.getStatsByTeacher = function(teacherId, dateRange = {}) {
  const matchStage = { teacherId: new mongoose.Types.ObjectId(teacherId) };
  
  if (dateRange.start || dateRange.end) {
    matchStage.submittedAt = {};
    if (dateRange.start) matchStage.submittedAt.$gte = new Date(dateRange.start);
    if (dateRange.end) matchStage.submittedAt.$lte = new Date(dateRange.end);
  }

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
        averageRating: { $avg: '$rating.score' },
        urgentCount: { $sum: { $cond: ['$isUrgent', 1, 0] } }
      }
    }
  ]);
};

// Instance methods
feedbackSchema.methods.markAsResolved = function(responseMessage, responseType = 'answer') {
  this.status = 'resolved';
  this.resolvedAt = new Date();
  this.teacherResponse = {
    message: responseMessage,
    respondedAt: new Date(),
    responseType: responseType
  };
  return this.save();
};

feedbackSchema.methods.addTeacherResponse = function(responseMessage, responseType = 'answer') {
  this.teacherResponse = {
    message: responseMessage,
    respondedAt: new Date(),
    responseType: responseType
  };
  this.status = 'in_progress';
  return this.save();
};

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;