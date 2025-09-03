const express = require('express');
const router = express.Router();
const elevenLabsService = require('../services/elevenlabs.service');

// Create interview agent
router.post('/create-agent', async (req, res) => {
  try {
    const agent = await elevenLabsService.createAgent();
    res.json({
      message: 'Interview agent created successfully',
      agent: agent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get interview questions
router.get('/questions', async (req, res) => {
  try {
    res.json({
      questions: [
        "What is JSX and why is it used in React?",
        "What's the difference between useState and useEffect hooks?",
        "How do you pass data from a parent component to a child component?",
        "What is the purpose of keys in React lists?",
        "What's the difference between functional components and class components?"
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit interview answers
router.post('/submit', async (req, res) => {
  try {
    // TODO: Implement answer submission and evaluation logic
    res.json({ message: 'Interview submission endpoint' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
