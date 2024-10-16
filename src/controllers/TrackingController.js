const prisma = require('../config/db'); 


exports.createTrackingRecord = async (req, res) => {
  const { donationId, location, status } = req.body;

  if (!donationId || !location || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
   
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(donationId) },
    });

    if (!donation) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }

    
    const trackingRecord = await prisma.tracking.create({
      data: {
        donationId: parseInt(donationId),
        location,
        status,
      },
    });

    res.status(201).json({ message: 'Registro de rastreamento criado com sucesso', trackingRecord });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar registro de rastreamento' });
  }
};


exports.getTrackingByDonationId = async (req, res) => {
  const { donationId } = req.params;

  try {
    const trackingRecords = await prisma.tracking.findMany({
      where: { donationId: parseInt(donationId) },
      orderBy: { createdAt: 'asc' },
    });

    if (trackingRecords.length === 0) {
      return res.status(404).json({ error: 'Nenhum registro de rastreamento encontrado para esta doação' });
    }

    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter registros de rastreamento' });
  }
};


exports.updateTrackingStatus = async (req, res) => {
  const { id } = req.params;
  const { location, status } = req.body;

  if (!location || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const trackingRecord = await prisma.tracking.update({
      where: { id: parseInt(id) },
      data: {
        location,
        status,
      },
    });

    res.status(200).json({ message: 'Status de rastreamento atualizado com sucesso', trackingRecord });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status de rastreamento' });
  }
};


exports.deleteTrackingRecord = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tracking.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Registro de rastreamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar registro de rastreamento' });
  }
};