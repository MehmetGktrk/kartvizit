const express = require("express");
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

router.get('/getAdmins', superAdminController.getAdmins);
router.post('/createAdmin', superAdminController.createAdmin);
router.post('/addPermission', superAdminController.addPermission);
router.post('/removePermission', superAdminController.removePermission);
router.post('/deleteAdmin', superAdminController.deleteAdmin);
router.post('/inactiveUser', superAdminController.inactiveUser);
router.post('/activeUser', superAdminController.activeUser);
router.get('/getPermission/:id', superAdminController.getPermission);

module.exports = router;