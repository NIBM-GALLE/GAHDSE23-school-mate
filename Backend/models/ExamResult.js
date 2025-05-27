const examResultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  grade: {
    type: String,
    required: true
  },
  feedback: {
    type: String
  }
}, { timestamps: true });

examResultSchema.index({ examId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('ExamResult', examResultSchema);