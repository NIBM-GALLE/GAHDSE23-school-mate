const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateToken, requireRole } = require('../middleware/auth'); // Adjust path as needed
const { body, param, query, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules
const createFeedbackValidation = [
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
  body('courseName').trim().isLength({ min: 1, max: 200 }).withMessage('Course name is required and must be less than 200 characters'),
  body('teacherId').isMongoId().withMessage('Valid teacher ID is required'),
  body('teacherName').trim().isLength({ min: 1, max: 100 }).withMessage('Teacher name is required'),
  body('subject').trim().isLength({ min: 1, max: 200 }).withMessage('Subject is required and must be less than 200 characters'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required and must be less than 2000 characters'),
  body('feedbackType').optional().isIn(['positive', 'constructive', 'neutral', 'question']).withMessage('Invalid feedback type'),
  body('category').optional().isIn([
    'assignment_feedback', 'course_feedback', 'general_inquiry', 
    'technical_issue', 'grade_inquiry', 'content_clarification', 'other'
  ]).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority level'),
  body('assignmentId').optional().isMongoId().withMessage('Valid assignment ID required if provided'),
  body('isPrivate').optional().isBoolean().withMessage('isPrivate must be a boolean')
];

const responseValidation = [
  param('id').isMongoId().withMessage('Valid feedback ID is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Response message is required and must be less than 2000 characters'),
  body('responseType').optional().isIn(['answer', 'acknowledgment', 'follow_up_needed']).withMessage('Invalid response type'),
  body('markAsResolved').optional().isBoolean().withMessage('markAsResolved must be a boolean')
];

const statusUpdateValidation = [
  param('id').isMongoId().withMessage('Valid feedback ID is required'),
  body('status').optional().isIn(['pending', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status'),
  body('requiresFollowUp').optional().isBoolean().withMessage('requiresFollowUp must be a boolean')
];

const ratingValidation = [
  param('id').isMongoId().withMessage('Valid feedback ID is required'),
  body('score').isInt({ min: 1, max: 5 }).withMessage('Rating score must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment must be less than 500 characters')
];

const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sortBy').optional().isIn(['submittedAt', 'priority', 'status', 'subject']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
];

// Public routes (require authentication)
router.use(authenticateToken);

/**
 * @route   POST /api/feedback
 * @desc    Create new feedback (students only)
 * @access  Private (Student)
 */
router.post('/', 
  requireRole(['student']),
  createFeedbackValidation,
  handleValidationErrors,
  feedbackController.createFeedback
);

/**
 * @route   GET /api/feedback/student
 * @desc    Get all feedback for the authenticated student
 * @access  Private (Student)
 */
router.get('/student',
  requireRole(['student']),
  paginationValidation,
  handleValidationErrors,
  feedbackController.getStudentFeedback
);

/**
 * @route   GET /api/feedback/teacher
 * @desc    Get all feedback for the authenticated teacher
 * @access  Private (Teacher)
 */
router.get('/teacher',
  requireRole(['teacher', 'admin']),
  paginationValidation,
  handleValidationErrors,
  feedbackController.getTeacherFeedback
);

/**
 * @route   GET /api/feedback/teacher/pending
 * @desc    Get pending feedback for teacher dashboard
 * @access  Private (Teacher)
 */
router.get('/teacher/pending',
  requireRole(['teacher', 'admin']),
  [query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')],
  handleValidationErrors,
  feedbackController.getPendingFeedback
);

/**
 * @route   GET /api/feedback/teacher/stats
 * @desc    Get feedback statistics for teacher
 * @access  Private (Teacher)
 */
router.get('/teacher/stats',
  requireRole(['teacher', 'admin']),
  [
    query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO date'),
    query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO date')
  ],
  handleValidationErrors,
  feedbackController.getTeacherStats
);

/**
 * @route   GET /api/feedback/teacher/:teacherId
 * @desc    Get feedback for a specific teacher (admin only)
 * @access  Private (Admin)
 */
router.get('/teacher/:teacherId',
  requireRole(['admin']),
  [
    param('teacherId').isMongoId().withMessage('Valid teacher ID is required'),
    ...paginationValidation
  ],
  handleValidationErrors,
  feedbackController.getTeacherFeedback
);

/**
 * @route   GET /api/feedback/:id
 * @desc    Get single feedback by ID
 * @access  Private (Student/Teacher/Admin - based on ownership)
 */
router.get('/:id',
  [param('id').isMongoId().withMessage('Valid feedback ID is required')],
  handleValidationErrors,
  feedbackController.getFeedbackById
);

/**
 * @route   POST /api/feedback/:id/respond
 * @desc    Teacher responds to feedback
 * @access  Private (Teacher)
 */
router.post('/:id/respond',
  requireRole(['teacher', 'admin']),
  responseValidation,
  handleValidationErrors,
  feedbackController.respondToFeedback
);

/**
 * @route   PATCH /api/feedback/:id/status
 * @desc    Update feedback status
 * @access  Private (Teacher/Admin)
 */
router.patch('/:id/status',
  requireRole(['teacher', 'admin']),
  statusUpdateValidation,
  handleValidationErrors,
  feedbackController.updateFeedbackStatus
);

/**
 * @route   POST /api/feedback/:id/rate
 * @desc    Student rates teacher's response
 * @access  Private (Student)
 */
router.post('/:id/rate',
  requireRole(['student']),
  ratingValidation,
  handleValidationErrors,
  feedbackController.rateFeedback
);

/**
 * @route   PATCH /api/feedback/:id/archive
 * @desc    Archive feedback
 * @access  Private (Teacher/Admin)
 */
router.patch('/:id/archive',
  requireRole(['teacher', 'admin']),
  [param('id').isMongoId().withMessage('Valid feedback ID is required')],
  handleValidationErrors,
  feedbackController.archiveFeedback
);

// Additional utility routes

/**
 * @route   GET /api/feedback/course/:courseId
 * @desc    Get all feedback for a specific course
 * @access  Private (Teacher/Admin)
 */
router.get('/course/:courseId',
  requireRole(['teacher', 'admin']),
  [
    param('courseId').isMongoId().withMessage('Valid course ID is required'),
    ...paginationValidation
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const { page = 1, limit = 10, status, priority } = req.query;
      
      const filters = { courseId };
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const Feedback = require('../models/Feedback');
      
      const feedback = await Feedback.find(filters)
        .populate('studentId', 'name email')
        .populate('teacherId', 'name email')
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await Feedback.countDocuments(filters);
      
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
      console.error('Error fetching course feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch course feedback',
        error: error.message
      });
    }
  }
);

/**
 * @route   GET /api/feedback/analytics/overview
 * @desc    Get system-wide feedback analytics
 * @access  Private (Admin)
 */
router.get('/analytics/overview',
  requireRole(['admin']),
  [
    query('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO date'),
    query('endDate').optional().isISO8601().withMessage('End date must be a valid ISO date')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const Feedback = require('../models/Feedback');
      
      const matchStage = {};
      if (startDate || endDate) {
        matchStage.submittedAt = {};
        if (startDate) matchStage.submittedAt.$gte = new Date(startDate);
        if (endDate) matchStage.submittedAt.$lte = new Date(endDate);
      }
      
      const analytics = await Feedback.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalFeedback: { $sum: 1 },
            pendingCount: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
            resolvedCount: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
            averageRating: { $avg: '$rating.score' },
            urgentCount: { $sum: { $cond: ['$isUrgent', 1, 0] } },
            categoryBreakdown: {
              $push: '$category'
            },
            priorityBreakdown: {
              $push: '$priority'
            }
          }
        }
      ]);
      
      // Get category distribution
      const categoryStats = await Feedback.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]);
      
      // Get priority distribution
      const priorityStats = await Feedback.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 }
          }
        }
      ]);
      
      res.json({
        success: true,
        data: {
          overview: analytics[0] || {
            totalFeedback: 0,
            pendingCount: 0,
            resolvedCount: 0,
            averageRating: 0,
            urgentCount: 0
          },
          categoryDistribution: categoryStats,
          priorityDistribution: priorityStats
        }
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch analytics',
        error: error.message
      });
    }
  }
);

/**
 * @route   GET /api/feedback/search
 * @desc    Search feedback by keywords
 * @access  Private (Teacher/Admin)
 */
router.get('/search',
  requireRole(['teacher', 'admin']),
  [
    query('q').trim().isLength({ min: 1 }).withMessage('Search query is required'),
    query('scope').optional().isIn(['subject', 'message', 'both']).withMessage('Invalid search scope'),
    ...paginationValidation
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { q, scope = 'both', page = 1, limit = 10 } = req.query;
      const userId = req.user.id;
      const userRole = req.user.role;
      
      const Feedback = require('../models/Feedback');
      
      // Build search query
      let searchQuery = {};
      if (scope === 'subject') {
        searchQuery.subject = { $regex: q, $options: 'i' };
      } else if (scope === 'message') {
        searchQuery.message = { $regex: q, $options: 'i' };
      } else {
        searchQuery.$or = [
          { subject: { $regex: q, $options: 'i' } },
          { message: { $regex: q, $options: 'i' } }
        ];
      }
      
      // Add role-based filtering
      if (userRole === 'teacher') {
        searchQuery.teacherId = userId;
      }
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const feedback = await Feedback.find(searchQuery)
        .populate('studentId', 'name email')
        .populate('teacherId', 'name email')
        .populate('courseId', 'name code')
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      
      const total = await Feedback.countDocuments(searchQuery);
      
      res.json({
        success: true,
        data: feedback,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: feedback.length,
          totalItems: total
        },
        searchQuery: q
      });
    } catch (error) {
      console.error('Error searching feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search feedback',
        error: error.message
      });
    }
  }
);

module.exports = router;