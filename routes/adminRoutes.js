
const express = require('express')
const path = require('path')
const userAuthetication = require('../middleware/auth')

const adminController = require('../controller/adminCont')

const router = express.Router()

router.get('/admin/getadmingroups', userAuthetication.authenticate,adminController.getAdminGroups)

router.get('/admin/groupmembers/:groupId', userAuthetication.authenticate, adminController.getMembers)

router.delete('/admin/deletemember/:memberId', userAuthetication.authenticate, adminController.deleteMember)

module.exports = router