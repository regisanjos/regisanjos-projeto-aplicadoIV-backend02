const prisma = require('../config/db'); 


exports.create = async (data) => {
  return await prisma.needs.create({
    data,
  });
};


exports.findAll = async () => {
  return await prisma.needs.findMany();
};


exports.findById = async (id) => {
  return await prisma.needs.findUnique({
    where: { id: parseInt(id) },
  });
};


exports.update = async (id, data) => {
  return await prisma.needs.update({
    where: { id: parseInt(id) },
    data,
  });
};


exports.delete = async (id) => {
  return await prisma.needs.delete({
    where: { id: parseInt(id) },
  });
};