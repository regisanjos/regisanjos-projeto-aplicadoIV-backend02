const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');


exports.registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  return await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
};


exports.loginUser = async (email, password) => {
  
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error('Email ou senha incorretos');
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Email ou senha incorretos');
  }

  
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } 
  );

  return { token, user };
};


exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};