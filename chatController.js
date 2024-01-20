const User = require('../models/User');
const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    // Find users and create a new chat
    const chat = await Chat.create({
      users: [req.user.id, userId],
    });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    // Find the chat by ID
    const chat = await Chat.findById(chatId);
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.body;
    const message = req.body.message;
    // Find the chat and add the message
    const chat = await Chat.findById(chatId);
    chat.messages.push({ sender: req.user.id, content: message });
    await chat.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
