const path = require('path')

const userAuthetication = require('../middleware/auth')

const express = require('express')

const chatController = require('../controller/chatCont')

const router = express.Router()

router.post('/chat/send', userAuthetication.authenticate, chatController.postChat )

module.exports = router