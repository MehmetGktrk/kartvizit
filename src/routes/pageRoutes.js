const express = require("express");
const router = express.Router();
const path = require("path");
const authorizeRole = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, '..', 'public',`${page}.html`));
});



router.get('/admin/:page', authMiddleware, authorizeRole(["admin", "superAdmin"]), (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, '..', 'public', 'admin', `${page}.html`));
});

router.get('/superAdmin/:page', authMiddleware, authorizeRole(["superAdmin"]), (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, '..', 'public', 'superAdmin', `${page}.html`));
})


module.exports = router;
