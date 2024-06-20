const db = require('../db'); 

const getChats = async () => {
  const [rows] = await db.query('SELECT * FROM chats');
  return rows;
};

const createChat = async (chatData) => {
  const { chatImg, chatName, creator, createdDate } = chatData;

  if (!chatImg) {
    return { status: 'error', message: "chatImg cannot be null" };
  }

  try {
    const [result] = await db.query(
      "INSERT INTO chats (chatImg, chatName, creator, createdDate) VALUES (?, ?, ?, ?)",
      [chatImg, chatName, creator, createdDate]
    );
    console.log("Chat inserted successfully:", result);

    const res = { status: 'success', id: result.insertId, ...chatData };
    return res;
  } catch (error) {
    console.error("Error inserting chat:", error.message);
    return { status: 'error', message: "Failed to insert chat" };
  }
};

module.exports = {
  getChats,
  createChat,
};
