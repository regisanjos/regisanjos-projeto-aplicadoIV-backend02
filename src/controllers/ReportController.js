const prisma = require('../config/db'); 


exports.getDonationReport = async (req, res) => {
  try {
    const donationReport = await prisma.donation.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    res.status(200).json(donationReport);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de doações' });
  }
};

exports.getUserDonationReport = async (req, res) => {
  const { userId } = req.params;

  try {
    const userDonationReport = await prisma.donation.groupBy({
      by: ['status'],
      where: {
        userId: parseInt(userId),
      },
      _count: {
        id: true,
      },
    });

    res.status(200).json(userDonationReport);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de doações para o usuário' });
  }
};

exports.getNeedsReport = async (req, res) => {
  try {
    const needsReport = await prisma.needs.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        quantity: true,
      },
    });

    res.status(200).json(needsReport);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de necessidades' });
  }
};


exports.getUserReport = async (req, res) => {
  try {
    const userReport = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true,
      },
    });

    res.status(200).json(userReport);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de usuários' });
  }
};