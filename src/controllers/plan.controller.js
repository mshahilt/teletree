const planService = require('../services/plan.service');

const createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPlanById = async (req, res) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await planService.updatePlan(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    await planService.deletePlan(req.params.id);
    res.status(204).json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
