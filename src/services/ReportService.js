const reportService = require('../services/reportService');


exports.getDonationReport = async (req, res) => {
  try {
    const report = await reportService.getDonationReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de doações' });
  }
};


exports.getUserDonationReport = async (req, res) => {
  try {
    const report = await reportService.getUserDonationReport(req.params.userId);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de doações para o usuário' });
  }
};


exports.getNeedsReport = async (req, res) => {
  try {
    const report = await reportService.getNeedsReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de necessidades' });
  }
};


exports.getUserReport = async (req, res) => {
  try {
    const report = await reportService.getUserReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de usuários' });
  }
};