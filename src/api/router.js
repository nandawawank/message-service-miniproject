const express = require('express');
const router = express.Router();

const MessageService = require('../services/MessageService');
const MessageHandler = require('../api/MessageHandler');

const messageService = new MessageService();
const messageHandler = new MessageHandler(messageService);

router.get('/api/list/message', messageHandler.getListMessage);
router.get('/api/content/message/:chatId', messageHandler.getContentMessage);
router.post('/api/add/message', messageHandler.createMessage);
router.post('/api/reply/message', messageHandler.replyMessage);
router.post('/api/send/message', messageHandler.sendMessage);

module.exports = router;