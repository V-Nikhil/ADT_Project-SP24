const chatService = require('../services/chatService');

exports.getMessages = async (req, res) => {
  try {
    const messages = await chatService.fetchMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { message } = req.body;
    await chatService.saveMessage(message);
    res.status(201).send('Message saved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
