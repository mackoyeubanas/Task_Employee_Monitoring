const express = require('express');
const router = express.Router();

const statisticsController = require('../controllers/statisticsController');

router.route('/').get(statisticsController.getStatistics);

module.exports = router;