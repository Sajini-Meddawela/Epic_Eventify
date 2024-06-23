const messages = {}; // In-memory store for messages by chat ID

const getMessagesService = (io, chatId) => {
  return messages[chatId] || [];
};

const createMessageService = (io, messageData) => {
  const { chatId, message } = messageData;
  if (!messages[chatId]) {
    messages[chatId] = [];
  }
  const newMessage = { id: messages[chatId].length + 1, ...messageData };
  messages[chatId].push(newMessage);
  io.to(chatId).emit('receiveMessage', newMessage);
  return newMessage;
};

module.exports = { getMessagesService, createMessageService };
