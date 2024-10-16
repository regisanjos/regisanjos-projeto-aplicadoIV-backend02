const express = require('express');
const notificationController = require('../controllers/NotificationController'); 
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();


router.post('/', authMiddleware.protect, notificationController.createNotification);
router.get('/user/:userId', authMiddleware.protect, notificationController.getNotificationsByUserId);
router.delete('/:id', authMiddleware.protect, notificationController.deleteNotification);

module.exports = router;