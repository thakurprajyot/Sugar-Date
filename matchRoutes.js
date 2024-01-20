const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches', matchController.getMatches);
router.post('/like', matchController.likeUser);
router.post('/dislike', matchController.dislikeUser);
router.get('/chat/:userId', matchController.getChat);

module.exports = router;
