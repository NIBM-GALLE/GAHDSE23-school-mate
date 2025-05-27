const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Registered', 'Confirmed', 'Cancelled'],
    default: 'Registered'
  }
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['Competition', 'Sports', 'Academic', 'Cultural', 'General'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  eligibleRoles: [{
    type: String,
    enum: ['Student', 'Teacher', 'Parent']
  }],
  maxParticipants: {
    type: Number
  },
  registrationDeadline: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [participantSchema]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);