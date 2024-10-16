const notificationModel = require('../models/Notification');


exports.createNotification = async (notificationData) => {
  return await notificationModel.create(notificationData);
};


exports.getNotificationsByUserId = async (userId) => {
  const notifications = await notificationModel.findByUserId(userId);

  if (!notifications || notifications.length === 0) {
    throw new Error('Nenhuma notificação encontrada para este usuário');
  }

  return notifications;
};


exports.deleteNotification = async (id) => {
  const notification = await notificationModel.delete(id);

  if (!notification) {
    throw new Error('Erro ao deletar a notificação');
  }

  return notification;
};