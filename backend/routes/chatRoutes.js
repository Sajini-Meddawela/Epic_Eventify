const express = require('express');
const { getChats, createChat } = require('../controllers/chatController');

const router = express.Router();

module.exports = (io) => {
  router.get('/', getChats(io));
  router.post('/', createChat(io));
  return router;
};
