const notificationService = require('../services/NotificationService'); 
const { sendEmail } = require('../utils/SendEmail');


exports.createNotification = async (req, res) => {
  try {

    const notification = await notificationService.createNotification({
      message: req.body.message,
      userId: req.body.userId,
    });


    await sendEmail({
      to: req.body.userEmail,  
      subject: 'Nova Notificação',
      text: `Você tem uma nova notificação: ${req.body.message}`,
      html: `<p>${req.body.message}</p>`, 
    });

    
    res.status(201).json({ message: 'Notificação criada e email enviado com sucesso', notification });
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};


exports.getNotificationsByUserId = async (req, res) => {
  try {
    const notifications = await notificationService.getNotificationsByUserId(req.params.userId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id);
    res.status(200).json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

