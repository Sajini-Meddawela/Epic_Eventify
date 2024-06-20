const db = require('../db');

const getMessages = async (chatId) => {
  const [rows] = await db.query('SELECT * FROM messages WHERE chatId = ?', [chatId]);
  return rows;
};

const createMessage = async (messageData) => {
  const { chatId, userId, message } = messageData;
  const [result] = await db.query(
    'INSERT INTO messages (chatId, userId, message) VALUES (?, ?, ?)',
    [chatId, userId, message]
  );
  return result.insertId;
};

module.exports = {
  getMessages,
  createMessage,
};
