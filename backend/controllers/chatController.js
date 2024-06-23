const chatService = require('../services/chatService');

const getChats = async (req, res, next) => {
  try {
    const chats = await chatService.getChats();
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

const createChat = async (req, res, next) => {
  try {
    const chatData = req.body;
    // console.log("chatData:", chatData);
    const newChat = await chatService.createChat(chatData);
    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error.message);
    if (error.sqlMessage) {
      console.error("SQL Error:", error.sqlMessage);
    }
    next(error);
  }
};

module.exports = {
  getChats,
  createChat,
};
