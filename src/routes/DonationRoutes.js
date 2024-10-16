const express = require('express');
const donationController = require('../controllers/donationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware.protect, donationController.createDonation);
router.get('/', authMiddleware.protect, donationController.getAllDonations);
router.get('/:id', authMiddleware.protect, donationController.getDonationById);
router.put('/:id', authMiddleware.protect, donationController.updateDonation);
router.delete('/:id', authMiddleware.protect, donationController.deleteDonation);

module.exports = router;