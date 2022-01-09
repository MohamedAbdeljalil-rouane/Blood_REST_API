const express = require("express");
const router = express.Router();
const technicienController = require("../controllers/technicien");



//Auth:
router.post('/auth/signup', technicienController.signup);
router.post('/auth/login', technicienController.login);


module.exports = router;