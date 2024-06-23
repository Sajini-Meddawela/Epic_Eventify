const chats = []; // In-memory store for chats

const getChatsService = (io) => {
  return chats;
};

const createChatService = (io, chatData) => {
  const newChat = { id: chats.length + 1, ...chatData };
  chats.push(newChat);
  io.emit('chatCreated', newChat);
  return newChat;
};

module.exports = { getChatsService, createChatService };
