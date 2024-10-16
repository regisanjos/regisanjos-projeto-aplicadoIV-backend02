const prisma = require('../config/db'); 

exports.create = async (data) => {
  return await prisma.tracking.create({
    data,
  });
};


exports.findByDonationId = async (donationId) => {
  return await prisma.tracking.findMany({
    where: { donationId: parseInt(donationId) },
    orderBy: { createdAt: 'asc' }, // Ordena pelo tempo de criação
  });
};


exports.findById = async (id) => {
  return await prisma.tracking.findUnique({
    where: { id: parseInt(id) },
  });
};


exports.update = async (id, data) => {
  return await prisma.tracking.update({
    where: { id: parseInt(id) },
    data,
  });
};


exports.delete = async (id) => {
  return await prisma.tracking.delete({
    where: { id: parseInt(id) },
  });
};