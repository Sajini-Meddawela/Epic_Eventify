const express = require('express');
const { getMessages, createMessage } = require('../controllers/messageController');

const router = express.Router();

module.exports = (io) => {
  router.get('/:chatId', getMessages(io));
  router.post('/', createMessage(io));
  return router;
};
