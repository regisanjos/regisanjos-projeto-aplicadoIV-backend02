const prisma = require('../config/db'); 


exports.createDonation = async (req, res) => {
  const { description, quantity, status } = req.body;

  if (!description || !quantity || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
   
    const donation = await prisma.donation.create({
      data: {
        description,
        quantity,
        status,
        userId: req.user.id, // Associa a doação ao usuário que está logado
      },
    });

    res.status(201).json({ message: 'Doação criada com sucesso', donation });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde' });
  }
};


exports.getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        user: true, // Incluir informações do usuário que criou a doação
      },
    });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter doações' });
  }
};


exports.getDonationById = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true, 
      },
    });

    if (!donation) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter doação' });
  }
};


exports.updateDonation = async (req, res) => {
  const { id } = req.params;
  const { description, quantity, status } = req.body;

  try {
    const donation = await prisma.donation.update({
      where: { id: parseInt(id) },
      data: {
        description,
        quantity,
        status,
      },
    });

    res.status(200).json({ message: 'Doação atualizada com sucesso', donation });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar doação' });
  }
};


exports.deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.donation.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Doação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar doação' });
  }
};

