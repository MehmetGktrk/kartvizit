const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/cards', adminController.cards);
router.get('/pendingUsers', adminController.pendingUsers);
router.post('/verifyUser', adminController.verifyUser);
router.post('/rejectUser', adminController.rejectUser);
router.get('/getUsers', adminController.getUsers);
router.get('/getCompanies', adminController.getCompanies);
router.post('/addCompany', adminController.addCompany);

module.exports = router;