const express = require('express');
const messageController = require('../controllers/messageController');
const { protect, restrictTo } = require('../utils/security');

const router = express.Router();

router.route('/:chatId')
  .get(protect, messageController.getMessages);

router.route('/')
  .post(protect, restrictTo('Organizer'), messageController.createMessage);

module.exports = (io) => {
  return router;
};
