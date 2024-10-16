const prisma = require('../config/db'); 

exports.create = async (data) => {
  return await prisma.notification.create({
    data,
  });
};


exports.findByUserId = async (userId) => {
  return await prisma.notification.findMany({
    where: { userId: parseInt(userId) },
  });
};


exports.findById = async (id) => {
  return await prisma.notification.findUnique({
    where: { id: parseInt(id) },
  });
};


exports.delete = async (id) => {
  return await prisma.notification.delete({
    where: { id: parseInt(id) },
  });
};
