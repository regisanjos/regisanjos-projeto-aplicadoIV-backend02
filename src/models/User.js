const prisma = require('../config/db'); 

exports.create = async (data) => {
  return await prisma.user.create({
    data,
  });
};


exports.findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};


exports.findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};


exports.findAll = async () => {
  return await prisma.user.findMany();
};


exports.update = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
};


exports.delete = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};