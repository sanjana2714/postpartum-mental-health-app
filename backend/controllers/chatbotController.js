const prisma = require('../config/database');
const axios = require('axios');

// Simple rule-based chatbot responses (fallback when OpenAI is not configured)
const getRuleBasedResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
    return "I understand you're feeling anxious. It's completely normal to experience anxiety during the postpartum period. Try deep breathing exercises: breathe in for 4 counts, hold for 4, breathe out for 4. Would you like to try a guided breathing exercise or talk to a healthcare provider?";
  }
  
  if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
    return "Sleep deprivation is very common for new moms. Here are some tips: Sleep when baby sleeps, even if it's just 20 minutes. Ask for help from family or friends. Create a relaxing bedtime routine. If sleep problems persist, please consult your healthcare provider.";
  }
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
    return "Feeling stressed or overwhelmed is a normal part of new motherhood. Try these strategies: Take breaks when you can, practice mindfulness or meditation, reach out to your support network, and remember that it's okay to ask for help. You're doing great!";
  }
  
  if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('cry')) {
    return "I'm sorry you're feeling this way. Postpartum mood changes are common, but if these feelings persist or worsen, it's important to talk to a healthcare provider. In the meantime, try to: connect with loved ones, get gentle exercise like a short walk, and be kind to yourself. You're not alone in this.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('crisis') || lowerMessage.includes('harm')) {
    return "If you're having thoughts of harming yourself or your baby, please call the emergency helpline immediately at 1-800-123-4567 or text 'HELP' to 741741. You can also call 911 if you're in immediate danger. Your safety is the top priority.";
  }

  return "I'm here to support you. You can ask me about managing anxiety, improving sleep, coping with stress, or any other concerns you have about postpartum mental health. How can I help you today?";
};

// Send message to chatbot
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: { message: 'Message is required' } 
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        userId: req.userId,
        content: message
      }
    });

    let botResponse;

    // Try to use OpenAI if API key is configured
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      try {
        const openaiResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a compassionate mental health support assistant for postpartum mothers. Provide supportive, empathetic responses. Always encourage users to seek professional help for serious concerns. Keep responses concise and practical.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 200,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        botResponse = openaiResponse.data.choices[0].message.content;
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError.response?.data || openaiError.message);
        // Fall back to rule-based response
        botResponse = getRuleBasedResponse(message);
      }
    } else {
      // Use rule-based response
      botResponse = getRuleBasedResponse(message);
    }

    // Save bot response (you might want to create a separate field to distinguish bot messages)
    // For now, we'll just return it without saving

    res.json({
      message: 'Message sent successfully',
      response: botResponse
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to send message' } 
    });
  }
};

// Get chat history
const getChatHistory = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    const history = await prisma.chatMessage.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'asc' },
      take: parseInt(limit)
    });

    res.json({ history });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ 
      error: { message: 'Failed to fetch chat history' } 
    });
  }
};

module.exports = {
  sendMessage,
  getChatHistory
};
