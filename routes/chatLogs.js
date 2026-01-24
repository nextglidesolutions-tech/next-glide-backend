const express = require('express');
const router = express.Router();
const ChatLog = require('../models/ChatLog');

// @route   POST api/chat-logs
// @desc    Save a new chat log
// @access  Public
router.post('/', async (req, res) => {
    // DEBUG LOG
    console.log('📝 ChatLog POST attempt:', req.body);
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ error: 'Please provide both question and answer' });
    }

    try {
        const newChatLog = new ChatLog({
            question,
            answer,
        });

        const chatLog = await newChatLog.save();
        res.status(201).json(chatLog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/chat-logs
// @desc    Get all chat logs
// @access  Private (Admin)
router.get('/', async (req, res) => {
    try {
        const chatLogs = await ChatLog.find().sort({ timestamp: -1 });
        res.json(chatLogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
