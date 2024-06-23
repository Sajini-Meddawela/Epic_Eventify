const { createMessageService, getMessagesService } = require('../services/messageService');

const getMessages = (io) => (req, res, next) => {
  try {
    const messages = getMessagesService(io, req.params.chatId);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const createMessage = (io) => (req, res, next) => {
  try {
    const newMessage = createMessageService(io, req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages, createMessage };
