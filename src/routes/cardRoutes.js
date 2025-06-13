const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cardController = require('../controllers/cardController');

router.get('/getCardData/:id', cardController.getCardData);
router.get('/previewCardData', authMiddleware, cardController.previewCardData);
router.post('/updateCard', authMiddleware,cardController.updateCard);
router.get('/getCardAllData', authMiddleware, cardController.getCardAllData);
router.get('/getViewCard/:id', cardController.getViewCard);
router.get('/getVisitorCard/:id', cardController.getVisitorCard);
router.get('/getVerified', authMiddleware, cardController.getVerified);
module.exports = router;