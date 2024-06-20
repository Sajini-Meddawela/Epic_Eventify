const express = require('express');
const chatController = require('../controllers/chatController');
const { protect, restrictTo } = require('../utils/security');

const router = express.Router();

router.route('/')
  .get(protect, chatController.getChats)
  .post(protect, restrictTo('Organizer'), chatController.createChat);

module.exports = (io) => {
  return router;
};
