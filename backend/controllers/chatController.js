const { createChatService, getChatsService } = require('../services/chatService');

const getChats = (io) => (req, res, next) => {
  try {
    const chats = getChatsService(io);
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

const createChat = (io) => (req, res, next) => {
  try {
    const newChat = createChatService(io, req.body);
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};

module.exports = { getChats, createChat };
