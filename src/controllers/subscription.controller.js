const subscriptionService = require('../services/subscription.service');

const createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const subscription = await subscriptionService.createSubscription({ userId, planId });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getSubscriptionsByUserId = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(req.params.userId);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const updated = await subscriptionService.updateSubscription(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(204).json({ success: true, message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const decrementUsage = async (req, res) => {
  try {
    const updated = await subscriptionService.decrementUsage(req.params.id);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionsByUserId,
  updateSubscription,
  deleteSubscription,
  decrementUsage,
};
