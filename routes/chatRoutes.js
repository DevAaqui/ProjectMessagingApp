const path = require('path')

const userAuthetication = require('../middleware/auth')

const express = require('express')

const chatController = require('../controller/chatCont')

const router = express.Router()

router.post('/chat/send', userAuthetication.authenticate, chatController.postChat)

router.get('/chat/chats', userAuthetication.authenticate, chatController.getAllChats)

router.get('/chat/nextchat/:chatId', userAuthetication.authenticate, chatController.getNextChat)

module.exports = router