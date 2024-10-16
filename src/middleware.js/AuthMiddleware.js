const jwt = require('jsonwebtoken');
const prisma = require('../config/db'); 

exports.protect = async (req, res, next) => {

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado, token não fornecido' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

   
    req.user = user;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};


exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado, permissão insuficiente' });
  }
  next();
};