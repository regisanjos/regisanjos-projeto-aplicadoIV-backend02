const express = require('express');
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/donations', authMiddleware.protect, reportController.getDonationReport);
router.get('/users/:userId/donations', authMiddleware.protect, reportController.getUserDonationReport);
router.get('/needs', authMiddleware.protect, reportController.getNeedsReport);
router.get('/users', authMiddleware.protect, reportController.getUserReport);

module.exports = router;