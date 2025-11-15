const express = require('express');
const router = express.Router();
const { 
  submitQuestionnaire, 
  getQuestionnaireHistory, 
  getLatestScores,
  getActiveAlerts,
  dismissAlert
} = require('../controllers/questionnaireController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.post('/', submitQuestionnaire);
router.get('/history', getQuestionnaireHistory);
router.get('/latest', getLatestScores);
router.get('/alerts', getActiveAlerts);
router.put('/alerts/:id/dismiss', dismissAlert);

module.exports = router;
