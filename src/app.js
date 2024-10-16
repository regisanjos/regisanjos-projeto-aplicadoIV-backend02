require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const donationRoutes = require('./routes/DonationRoutes');
const needsRoutes = require('./routes/needsRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');
const trackingRoutes = require('./routes/TrackingRoutes');
const reportRoutes = require('./routes/ReportRoutes');
const errorHandler = require('./middlewares/errorHandler'); 

const app = express();


app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes); 
app.use('/donations', donationRoutes); 
app.use('/needs', needsRoutes); 
app.use('/notifications', notificationRoutes); 
app.use('/tracking', trackingRoutes); 
app.use('/reports', reportRoutes); 


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;