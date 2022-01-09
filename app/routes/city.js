const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city");





router.post('/create-city', cityController.createCity);
router.get('/total-by-city', cityController.getTotalStockByCity);
router.get('/percentage-city', cityController.getPercentageByCity);


module.exports = router;