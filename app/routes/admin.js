const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");



//Auth:
router.post('/auth/signup', adminController.signup);
router.post('/auth/login', adminController.login);


module.exports = router;