const bcrypt = require('bcrypt');
const prisma = require('../config/database');
const { generateToken, generateRefreshToken } = require('../config/jwt');

// Register new user
const register = async (req, res) => {
  try {
    const { email, phone, password, name, age, gender, language, stage } = req.body;

    // Validate required fields
    if (!email || !password || !name || !gender || !stage) {
      return res.status(400).json({ 
        error: { message: 'Missing required fields: email, password, name, gender, and stage are required' } 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ 
        error: { message: 'User with this email already exists' } 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and profile in a transaction
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        userProfile: {
          create: {
            name,
            age: age ? parseInt(age) : null,
            gender,
            language: language || 'ENGLISH',
            stage
          }
        }
      },
      include: { userProfile: true }
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: { message: 'Registration failed. Please try again.' } 
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({ 
        error: { message: 'Email/phone and password are required' } 
      });
    }

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: email ? { email } : { phone },
      include: { userProfile: true }
    });

    if (!user) {
      return res.status(401).json({ 
        error: { message: 'Invalid credentials' } 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: { message: 'Invalid credentials' } 
      });
    }

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: { message: 'Login failed. Please try again.' } 
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { userProfile: true }
    });

    if (!user) {
      return res.status(404).json({ 
        error: { message: 'User not found' } 
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch profile' } 
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, age, gender, language, stage, deliveryDate, weeksPostpartum, partnerContact, profilePhoto } = req.body;

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: req.userId },
      data: {
        ...(name && { name }),
        ...(age && { age: parseInt(age) }),
        ...(gender && { gender }),
        ...(language && { language }),
        ...(stage && { stage }),
        ...(deliveryDate && { deliveryDate: new Date(deliveryDate) }),
        ...(weeksPostpartum && { weeksPostpartum }),
        ...(partnerContact !== undefined && { partnerContact }),
        ...(profilePhoto !== undefined && { profilePhoto })
      }
    });

    res.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to update profile' } 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
