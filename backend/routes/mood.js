const express = require('express');
const router = express.Router();
const { submitMoodCheckin, getMoodHistory, getMoodStreak } = require('../controllers/moodController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.post('/', submitMoodCheckin);
router.get('/history', getMoodHistory);
router.get('/streak', getMoodStreak);

module.exports = router;
