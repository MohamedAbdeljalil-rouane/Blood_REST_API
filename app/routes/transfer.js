const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transfer");
const {auth} = require("../middlewares/auth")


router.post('/make-transfer',auth, transferController.transferBlood);


module.exports = router;