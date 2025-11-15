const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory } = require('../controllers/chatbotController');
const { authenticate } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.post('/message', sendMessage);
router.get('/history', getChatHistory);

module.exports = router;
