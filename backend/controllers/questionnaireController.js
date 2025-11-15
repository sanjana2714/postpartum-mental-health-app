const prisma = require('../config/database');

// Helper function to calculate risk level
const calculateRiskLevel = (type, score) => {
  if (type === 'EPDS') {
    if (score < 10) return 'LOW';
    if (score <= 12) return 'MEDIUM';
    return 'HIGH';
  } else if (type === 'GAD7') {
    if (score <= 4) return 'LOW';
    if (score <= 9) return 'MEDIUM';
    return 'HIGH';
  } else if (type === 'PSS') {
    if (score <= 13) return 'LOW';
    if (score <= 26) return 'MEDIUM';
    return 'HIGH';
  }
  return 'LOW';
};

// Helper function to check for critical responses
const checkCriticalResponses = (type, responses) => {
  // For EPDS, Question 10 is about self-harm
  if (type === 'EPDS' && responses.length >= 10) {
    const question10Response = responses[9]; // 0-indexed
    if (question10Response >= 1) {
      return true; // Critical response detected
    }
  }
  return false;
};

// Submit questionnaire response
const submitQuestionnaire = async (req, res) => {
  try {
    const { type, responses, score } = req.body;

    if (!type || !responses || score === undefined) {
      return res.status(400).json({ 
        error: { message: 'Type, responses, and score are required' } 
      });
    }

    // Validate questionnaire type
    const validTypes = ['EPDS', 'GAD7', 'PSS'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        error: { message: 'Invalid questionnaire type' } 
      });
    }

    // Check for critical responses
    const isCritical = checkCriticalResponses(type, responses);

    // Create questionnaire response
    const questionnaireResponse = await prisma.questionnaireResponse.create({
      data: {
        userId: req.userId,
        type,
        score: parseInt(score),
        responses: responses
      }
    });

    // Calculate risk level
    const riskLevel = calculateRiskLevel(type, parseInt(score));

    // If critical response detected, create an alert
    if (isCritical) {
      await prisma.alert.create({
        data: {
          userId: req.userId,
          message: `Critical response detected in ${type} questionnaire. Immediate attention recommended.`,
          isActive: true
        }
      });
    }

    res.status(201).json({
      message: 'Questionnaire submitted successfully',
      questionnaireResponse,
      riskLevel,
      isCritical
    });
  } catch (error) {
    console.error('Submit questionnaire error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to submit questionnaire' } 
    });
  }
};

// Get questionnaire history
const getQuestionnaireHistory = async (req, res) => {
  try {
    const { type, startDate, endDate, limit = 10 } = req.query;

    const where = {
      userId: req.userId,
      ...(type && { type }),
      ...(startDate && endDate && {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const history = await prisma.questionnaireResponse.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit)
    });

    // Add risk levels to each response
    const historyWithRiskLevels = history.map(response => ({
      ...response,
      riskLevel: calculateRiskLevel(response.type, response.score)
    }));

    res.json({ history: historyWithRiskLevels });
  } catch (error) {
    console.error('Get questionnaire history error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch questionnaire history' } 
    });
  }
};

// Get latest scores for all questionnaire types
const getLatestScores = async (req, res) => {
  try {
    const types = ['EPDS', 'GAD7', 'PSS'];
    const latestScores = {};

    for (const type of types) {
      const latest = await prisma.questionnaireResponse.findFirst({
        where: { 
          userId: req.userId,
          type
        },
        orderBy: { createdAt: 'desc' }
      });

      if (latest) {
        latestScores[type] = {
          score: latest.score,
          riskLevel: calculateRiskLevel(type, latest.score),
          date: latest.createdAt
        };
      } else {
        latestScores[type] = null;
      }
    }

    res.json({ latestScores });
  } catch (error) {
    console.error('Get latest scores error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch latest scores' } 
    });
  }
};

// Get active alerts
const getActiveAlerts = async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { 
        userId: req.userId,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch alerts' } 
    });
  }
};

// Dismiss alert
const dismissAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const alert = await prisma.alert.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.userId
      }
    });

    if (!alert) {
      return res.status(404).json({ 
        error: { message: 'Alert not found' } 
      });
    }

    await prisma.alert.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });

    res.json({ message: 'Alert dismissed successfully' });
  } catch (error) {
    console.error('Dismiss alert error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to dismiss alert' } 
    });
  }
};

module.exports = {
  submitQuestionnaire,
  getQuestionnaireHistory,
  getLatestScores,
  getActiveAlerts,
  dismissAlert
};
