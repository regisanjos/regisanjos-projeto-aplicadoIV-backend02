const express = require('express');
const trackingController = require('../controllers/TrackingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware.protect, trackingController.createTrackingRecord);
router.get('/donation/:donationId', authMiddleware.protect, trackingController.getTrackingByDonationId);
router.put('/:id', authMiddleware.protect, trackingController.updateTrackingStatus);
router.delete('/:id', authMiddleware.protect, trackingController.deleteTrackingRecord);

module.exports = router;