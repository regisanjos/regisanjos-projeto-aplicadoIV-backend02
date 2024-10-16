const prisma = require('../config/db'); 


exports.createNeed = async (req, res) => {
  const { description, quantity } = req.body;

  if (!description || !quantity) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'A quantidade deve ser maior que zero' });
  }

  try {
    
    const need = await prisma.needs.create({
      data: {
        description,
        quantity,
      },
    });

    res.status(201).json({ message: 'Necessidade criada com sucesso', need });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde' });
  }
};


exports.getAllNeeds = async (req, res) => {
  try {
    const needs = await prisma.needs.findMany();

    res.status(200).json(needs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter necessidades, tente novamente mais tarde' });
  }
};


exports.getNeedById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const need = await prisma.needs.findUnique({
      where: { id },
    });

    if (!need) {
      return res.status(404).json({ error: 'Necessidade não encontrada' });
    }

    res.status(200).json(need);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter necessidade, tente novamente mais tarde' });
  }
};


exports.updateNeed = async (req, res) => {
  const id = parseInt(req.params.id);
  const { description, quantity } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (!description || !quantity) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'A quantidade deve ser maior que zero' });
  }

  try {
    const need = await prisma.needs.update({
      where: { id },
      data: {
        description,
        quantity,
      },
    });

    res.status(200).json({ message: 'Necessidade atualizada com sucesso', need });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar necessidade, tente novamente mais tarde' });
  }
};

exports.deleteNeed = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    await prisma.needs.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Necessidade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar necessidade, tente novamente mais tarde' });
  }
};
