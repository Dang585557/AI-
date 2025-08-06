
const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// สร้างคำตอบด้วย AI
router.post('/generate-reply', async (req, res) => {
  try {
    const { comment, tone } = req.body;
    
    if (!comment || !tone) {
      return res.status(400).json({ error: 'Comment and tone are required' });
    }
    
    const aiReply = await openaiService.generateCommentReply(comment, tone);
    res.json({ reply: aiReply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
