const express = require('express')
const path = require('path')
const userAuthetication = require('../middleware/auth')

const groupController = require('../controller/groupCont')

const router = express.Router()

router.post('/group/create', userAuthetication.authenticate, groupController.groupCreate)

router.get('/group/allgroup', userAuthetication.authenticate, groupController.getAllGroup)

router.get('/group/getchats/:groupId', userAuthetication.authenticate, groupController.getAllChats)

module.exports = router