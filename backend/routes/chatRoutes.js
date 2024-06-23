const express = require('express');
const chatController = require('../controllers/chatController');
const { protect, restrictTo } = require('../utils/security');

const router = express.Router();

router.route('/')
  .post(protect, restrictTo('Organizer'), chatController.createChat)
  .get(protect, chatController.getChats);

module.exports = (io) => {
  return router;
};
