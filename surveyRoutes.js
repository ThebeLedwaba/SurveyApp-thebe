const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const surveyController = require('../controllers/surveyController');

// Rate limiting for survey submission (5 requests per 15 minutes)
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 survey submissions
  message: 'Too many survey submissions from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// Input validation middleware for survey submission
const validateSurvey = [
  // Validate full name
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
    
  // Validate email
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
    
  // Validate contact number (assuming South African numbers)
  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Contact number must be 10 digits')
    .isNumeric().withMessage('Contact number must contain only numbers'),
    
  // Validate date of birth
  body('dateOfBirth')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Please use a valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 5 || age > 120) {
        throw new Error('Age must be between 5 and 120 years');
      }
      return true;
    }),
    
  // Validate favorite foods (array with at least one selection)
  body('favoriteFoods')
    .isArray({ min: 1 }).withMessage('Please select at least one favorite food')
    .custom((foods) => {
      const validFoods = ['Pizza', 'Pap and Wors', 'Other', 'Pasta'];
      return foods.every(food => validFoods.includes(food));
    }).withMessage('Invalid food selection'),
    
  // Validate all ratings (1-5 scale)
  body('ratings.eatOut')
    .notEmpty().withMessage('Eating out rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
    
  body('ratings.watchMovies')
    .notEmpty().withMessage('Movies rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
    
  body('ratings.watchTV')
    .notEmpty().withMessage('TV rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
    
  body('ratings.listenRadio')
    .notEmpty().withMessage('Radio rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
    
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

/**
 * @swagger
 * /api/surveys/submit:
 *   post:
 *     summary: Submit a new survey response
 *     tags: [Surveys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - contactNumber
 *               - dateOfBirth
 *               - favoriteFoods
 *               - ratings
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: TLM Ledwaba
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               contactNumber:
 *                 type: string
 *                 example: "0821234567"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               favoriteFoods:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Pizza, Pap and Wors, Other, Pasta]
 *                 example: ["Pizza", "Pasta"]
 *               ratings:
 *                 type: object
 *                 properties:
 *                   eatOut:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                   watchMovies:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                   watchTV:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                   listenRadio:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *     responses:
 *       201:
 *         description: Survey submitted successfully
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Server error
 */
router.post('/submit', submitLimiter, validateSurvey, surveyController.submitSurvey);

/**
 * @swagger
 * /api/surveys/stats:
 *   get:
 *     summary: Get survey statistics
 *     tags: [Surveys]
 *     responses:
 *       200:
 *         description: Survey statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSurveys:
 *                   type: integer
 *                   example: 42
 *                 averageAge:
 *                   type: number
 *                   format: float
 *                   example: 32.5
 *                 oldest:
 *                   type: integer
 *                   example: 78
 *                 youngest:
 *                   type: integer
 *                   example: 18
 *                 pizzaLoversPercentage:
 *                   type: number
 *                   format: float
 *                   example: 65.5
 *                 papWorsPercentage:
 *                   type: number
 *                   format: float
 *                   example: 45.2
 *                 averageEatOutRating:
 *                   type: number
 *                   format: float
 *                   example: 3.8
 *                 averageWatchMoviesRating:
 *                   type: number
 *                   format: float
 *                   example: 4.2
 *                 averageWatchTVRating:
 *                   type: number
 *                   format: float
 *                   example: 3.5
 *                 averageListenRadioRating:
 *                   type: number
 *                   format: float
 *                   example: 2.9
 *       500:
 *         description: Server error
 */
router.get('/stats', surveyController.getSurveyStats);

module.exports = router;