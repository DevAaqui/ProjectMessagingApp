const path = require('path')

//const bcrypt = require('bcrypt')// Abhi brcypt baad me karenge

const express = require('express')

const userController = require('../controller/userCont')

const router = express.Router()

router.post('/user/signup',userController.postUsers)

module.exports = router