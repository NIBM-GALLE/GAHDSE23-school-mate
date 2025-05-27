const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

const feedbackController = {
  // Create new feedback
  createFeedback: async (req, res) => {
    try {
      const {
        courseId,
        courseName,
        assignmentId,
        assignmentTitle,
        teacherId,
        teacherName,
        subject,
        message,
        feedbackType,
        category,
        priority,
        isPrivate
      } = req.body;

      // Get student info from authenticated user
      const studentId = req.user.id;
      const studentName = req.user.name;
      const studentEmail = req.user.email;

      const feedback = new Feedback({
        studentId,
        studentName,
        studentEmail,
        courseId,
        courseName,
        assignmentId,
        assignmentTitle,
        teacherId,
        teacherName,
        subject,
        message,
        feedbackType: feedbackType || 'neutral',
        category: category || 'general_inquiry',
        priority: priority || 'medium',
        isPrivate: isPrivate || false
      });

      await feedback.save();

      const populatedFeedback = await Feedback.findById(feedback._id)
        .populate('studentId', 'name email')
        .populate('courseId', 'name code')
        .populate('teacherId', 'name email');

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        data: populatedFeedback
      });
    } catch (error) {
      console.error('Error creating feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit feedback',
        error: error.message
      });
    }
  },

  // Get all feedback for a teacher
  getTeacherFeedback: async (req, res) => {
    try {
      const teacherId = req.user.role === 'teacher' ? req.user.id : req.params.teacherId;
      const { status, priority, category, page = 1, limit = 10, sortBy = 'submittedAt', sortOrder = 'desc' } = req.query;

      // Build filter object
      const filters = {};
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      if (category) filters.category = category;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

      const feedback = await Feedback.find({ teacherId, ...filters })
        .populate('studentId', 'name email avatar')
        .populate('courseId', 'name code')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Feedback.countDocuments({ teacherId, ...filters });

      res.json({
        success: true,
        data: feedback,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: feedback.length,
          totalItems: total
        }
      });
    } catch (error) {
      console.error('Error fetching teacher feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch feedback',
        error: error.message
      });
    }
  },

  // Get all feedback for a student
  getStudentFeedback: async (req, res) => {
    try {
      const studentId = req.user.id;
      const { status, courseId, page = 1, limit = 10 } = req.query;

      const filters = { visibleToStudent: true };
      if (status) filters.status = status;
      if (courseId) filters.courseId = courseId;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const feedback = await Feedback.find({ studentId, ...filters })
        .populate('teacherId', 'name email')
        .populate('courseId', 'name code')
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Feedback.countDocuments({ studentId, ...filters });

      res.json({
        success: true,
        data: feedback,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: feedback.length,
          totalItems: total
        }
      });
    } catch (error) {
      console.error('Error fetching student feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch feedback',
        error: error.message
      });
    }
  },

  // Get single feedback by ID
  getFeedbackById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback ID'
        });
      }

      const feedback = await Feedback.findById(id)
        .populate('studentId', 'name email avatar')
        .populate('courseId', 'name code')
        .populate('teacherId', 'name email');

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      // Check permissions
      const hasAccess = 
        (userRole === 'student' && feedback.studentId._id.toString() === userId && feedback.visibleToStudent) ||
        (userRole === 'teacher' && feedback.teacherId._id.toString() === userId) ||
        userRole === 'admin';

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.json({
        success: true,
        data: feedback
      });
    } catch (error) {
      console.error('Error fetching feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch feedback',
        error: error.message
      });
    }
  },

  // Teacher responds to feedback
  respondToFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const { message, responseType = 'answer', markAsResolved = true } = req.body;
      const teacherId = req.user.id;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback ID'
        });
      }

      const feedback = await Feedback.findById(id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      // Check if teacher owns this feedback
      if (feedback.teacherId.toString() !== teacherId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      if (markAsResolved) {
        await feedback.markAsResolved(message, responseType);
      } else {
        await feedback.addTeacherResponse(message, responseType);
      }

      const updatedFeedback = await Feedback.findById(id)
        .populate('studentId', 'name email')
        .populate('courseId', 'name code');

      res.json({
        success: true,
        message: 'Response added successfully',
        data: updatedFeedback
      });
    } catch (error) {
      console.error('Error responding to feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to respond to feedback',
        error: error.message
      });
    }
  },

  // Update feedback status
  updateFeedbackStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, requiresFollowUp } = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback ID'
        });
      }

      const feedback = await Feedback.findById(id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      // Check permissions (only teacher or admin can update status)
      if (userRole === 'teacher' && feedback.teacherId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      if (userRole === 'student') {
        return res.status(403).json({
          success: false,
          message: 'Students cannot update feedback status'
        });
      }

      if (status) feedback.status = status;
      if (typeof requiresFollowUp !== 'undefined') feedback.requiresFollowUp = requiresFollowUp;

      await feedback.save();

      const updatedFeedback = await Feedback.findById(id)
        .populate('studentId', 'name email')
        .populate('courseId', 'name code');

      res.json({
        success: true,
        message: 'Feedback status updated successfully',
        data: updatedFeedback
      });
    } catch (error) {
      console.error('Error updating feedback status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update feedback status',
        error: error.message
      });
    }
  },

  // Get feedback statistics for teacher
  getTeacherStats: async (req, res) => {
    try {
      const teacherId = req.user.id;
      const { startDate, endDate } = req.query;

      const dateRange = {};
      if (startDate) dateRange.start = startDate;
      if (endDate) dateRange.end = endDate;

      const stats = await Feedback.getStatsByTeacher(teacherId, dateRange);

      // Get pending feedback count
      const pendingFeedback = await Feedback.getPendingFeedback(teacherId);

      // Get recent feedback (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentCount = await Feedback.countDocuments({
        teacherId,
        submittedAt: { $gte: sevenDaysAgo }
      });

      res.json({
        success: true,
        data: {
          overview: stats[0] || {
            total: 0,
            pending: 0,
            resolved: 0,
            averageRating: 0,
            urgentCount: 0
          },
          pendingItems: pendingFeedback.length,
          recentFeedback: recentCount
        }
      });
    } catch (error) {
      console.error('Error fetching teacher stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch statistics',
        error: error.message
      });
    }
  },

  // Student rates teacher's response
  rateFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const { score, comment } = req.body;
      const studentId = req.user.id;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback ID'
        });
      }

      if (!score || score < 1 || score > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating score must be between 1 and 5'
        });
      }

      const feedback = await Feedback.findById(id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      if (feedback.studentId.toString() !== studentId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      if (!feedback.teacherResponse.message) {
        return res.status(400).json({
          success: false,
          message: 'Cannot rate feedback without teacher response'
        });
      }

      feedback.rating = {
        score,
        comment: comment || '',
        ratedAt: new Date()
      };

      await feedback.save();

      res.json({
        success: true,
        message: 'Rating submitted successfully',
        data: feedback
      });
    } catch (error) {
      console.error('Error rating feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit rating',
        error: error.message
      });
    }
  },

  // Archive feedback
  archiveFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid feedback ID'
        });
      }

      const feedback = await Feedback.findById(id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      // Check permissions
      const hasAccess = 
        (userRole === 'teacher' && feedback.teacherId.toString() === userId) ||
        userRole === 'admin';

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      feedback.isArchived = true;
      await feedback.save();

      res.json({
        success: true,
        message: 'Feedback archived successfully'
      });
    } catch (error) {
      console.error('Error archiving feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to archive feedback',
        error: error.message
      });
    }
  },

  // Get pending feedback for teacher dashboard
  getPendingFeedback: async (req, res) => {
    try {
      const teacherId = req.user.id;
      const { limit = 10 } = req.query;

      const pendingFeedback = await Feedback.find({
        teacherId,
        status: 'pending'
      })
      .populate('studentId', 'name email avatar')
      .populate('courseId', 'name code')
      .sort({ priority: -1, submittedAt: 1 })
      .limit(parseInt(limit));

      res.json({
        success: true,
        data: pendingFeedback
      });
    } catch (error) {
      console.error('Error fetching pending feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending feedback',
        error: error.message
      });
    }
  }
};

module.exports = feedbackController;