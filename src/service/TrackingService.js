const trackingService = require('../services/trackingService');


exports.createTrackingRecord = async (req, res) => {
  try {
    const trackingRecord = await trackingService.createTrackingRecord({
      donationId: req.body.donationId,
      location: req.body.location,
      status: req.body.status,
    });
    res.status(201).json({ message: 'Registro de rastreamento criado com sucesso', trackingRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getTrackingByDonationId = async (req, res) => {
  try {
    const trackingRecords = await trackingService.getTrackingByDonationId(req.params.donationId);
    res.status(200).json(trackingRecords);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


exports.updateTrackingStatus = async (req, res) => {
  try {
    const trackingRecord = await trackingService.updateTrackingStatus(req.params.id, req.body);
    res.status(200).json({ message: 'Status de rastreamento atualizado com sucesso', trackingRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteTrackingRecord = async (req, res) => {
  try {
    await trackingService.deleteTrackingRecord(req.params.id);
    res.status(200).json({ message: 'Registro de rastreamento deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};