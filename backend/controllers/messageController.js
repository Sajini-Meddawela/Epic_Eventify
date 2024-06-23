const messageService = require('../services/messageService');

const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getMessages(chatId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const messageData = { ...req.body, userId: req.user.id };
    const messageId = await messageService.createMessage(messageData);

    req.io.to(req.body.chatId).emit('receiveMessage', { ...messageData, id: messageId });

    res.status(201).json({ messageId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  createMessage,
};
