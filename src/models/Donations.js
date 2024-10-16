const prisma = require('../config/db'); 


exports.create = async (data) => {
  return await prisma.donation.create({
    data,
  });
};


exports.findAll = async () => {
  return await prisma.donation.findMany({
    include: {
      user: true, 
    },
  });
};


exports.findById = async (id) => {
  return await prisma.donation.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: true, 
    },
  });
};


exports.update = async (id, data) => {
  return await prisma.donation.update({
    where: { id: parseInt(id) },
    data,
  });
};


exports.delete = async (id) => {
  return await prisma.donation.delete({
    where: { id: parseInt(id) },
  });
};