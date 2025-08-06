const express = require('express');
const router = express.Router();
const facebookService = require('../services/facebookService');

// ดึงคอมเมนต์จากโพสต์ Facebook
router.post('/comments', async (req, res) => {
  try {
    const { postUrl } = req.body;
    
    // Extract post ID from URL
    const postId = extractPostId(postUrl);
    if (!postId) {
      return res.status(400).json({ error: 'Invalid Facebook post URL' });
    }
    
    const comments = await facebookService.getPostComments(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ส่งคำตอบกลับไปยัง Facebook
router.post('/reply', async (req, res) => {
  try {
    const { commentId, message } = req.body;
    const result = await facebookService.replyToComment(commentId, message);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ฟังก์ชันช่วยเหลือ: ดึง Post ID จาก URL
function extractPostId(url) {
  const regex = /(\d+)(?:\?|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

module.exports = router;
