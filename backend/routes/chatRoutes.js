const express = require('express');
const { protect, restrictTo } = require('../utils/security');
const { getChats, createChat } = require('../controllers/chatController');

const router = express.Router();

module.exports = (io) => {
  router.get('/', protect, restrictTo('Attendee', 'Organizer'), getChats(io));
  router.post('/', protect, restrictTo('Attendee', 'Organizer'), createChat(io));
  return router;
};
