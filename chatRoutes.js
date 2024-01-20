const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/create', chatController.createChat);
router.get('/:chatId', chatController.getChat);
router.post('/message', chatController.sendMessage);

module.exports = router;
