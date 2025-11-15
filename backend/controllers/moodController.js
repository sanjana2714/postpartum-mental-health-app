const prisma = require('../config/database');

// Submit mood check-in
const submitMoodCheckin = async (req, res) => {
  try {
    const { moodLevel, notes } = req.body;

    if (!moodLevel) {
      return res.status(400).json({ 
        error: { message: 'Mood level is required' } 
      });
    }

    // Validate mood level
    const validMoods = ['VERY_HAPPY', 'HAPPY', 'NEUTRAL', 'SAD', 'VERY_SAD'];
    if (!validMoods.includes(moodLevel)) {
      return res.status(400).json({ 
        error: { message: 'Invalid mood level' } 
      });
    }

    const moodCheckin = await prisma.moodCheckin.create({
      data: {
        userId: req.userId,
        moodLevel,
        notes: notes || null
      }
    });

    res.status(201).json({
      message: 'Mood check-in submitted successfully',
      moodCheckin
    });
  } catch (error) {
    console.error('Submit mood error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to submit mood check-in' } 
    });
  }
};

// Get mood history
const getMoodHistory = async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;

    const where = {
      userId: req.userId,
      ...(startDate && endDate && {
        checkinDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const moodHistory = await prisma.moodCheckin.findMany({
      where,
      orderBy: { checkinDate: 'desc' },
      take: parseInt(limit)
    });

    res.json({ moodHistory });
  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch mood history' } 
    });
  }
};

// Get mood streak
const getMoodStreak = async (req, res) => {
  try {
    // Get all mood check-ins for the user, ordered by date descending
    const moodCheckins = await prisma.moodCheckin.findMany({
      where: { userId: req.userId },
      orderBy: { checkinDate: 'desc' },
      select: { checkinDate: true }
    });

    if (moodCheckins.length === 0) {
      return res.json({ streak: 0, lastCheckinDate: null });
    }

    // Calculate streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there's a check-in today
    const lastCheckin = new Date(moodCheckins[0].checkinDate);
    lastCheckin.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today - lastCheckin) / (1000 * 60 * 60 * 24));

    if (daysDiff > 1) {
      // Streak is broken
      return res.json({ streak: 0, lastCheckinDate: moodCheckins[0].checkinDate });
    }

    // Count consecutive days
    let currentDate = new Date(today);
    if (daysDiff === 1) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    for (const checkin of moodCheckins) {
      const checkinDate = new Date(checkin.checkinDate);
      checkinDate.setHours(0, 0, 0, 0);

      if (checkinDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (checkinDate < currentDate) {
        break;
      }
    }

    res.json({ 
      streak, 
      lastCheckinDate: moodCheckins[0].checkinDate 
    });
  } catch (error) {
    console.error('Get mood streak error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to calculate mood streak' } 
    });
  }
};

module.exports = {
  submitMoodCheckin,
  getMoodHistory,
  getMoodStreak
};
