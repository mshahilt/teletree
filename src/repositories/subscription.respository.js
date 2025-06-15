const Subscription = require('../models/subscription.model');

class SubscriptionRepository {
  async createSubscription(data) {
    try {
      const subscription = new Subscription(data);
      return await subscription.save();
    } catch (error) {
      throw new Error(`Error creating subscription: ${error.message}`);
    }
  }

  async getAllSubscriptions(filter = {}, projection = null, options = {}) {
    try {
      return await Subscription.find(filter, projection, options)
        .populate('planId')
        .populate('userId');
    } catch (error) {
      throw new Error(`Error fetching subscriptions: ${error.message}`);
    }
  }

  async getSubscriptionById(id) {
    try {
      return await Subscription.findById(id)
        .populate('planId')
        .populate('userId');
    } catch (error) {
      throw new Error(`Error fetching subscription by ID: ${error.message}`);
    }
  }

  async getSubscriptionsByUserId(userId) {
    try {
      return await Subscription.findOne({ userId })
        .sort({ createdAt: -1 })
        .populate('planId');
    } catch (error) {
      throw new Error(`Error fetching latest subscription for user: ${error.message}`);
    }
  }

  async updateSubscriptionByOrderId(orderId, updateData) {
      return await Subscription.findOneAndUpdate(
        { razorpayOrderId: orderId },
        updateData,
        { new: true }
      );
  }
  async updateSubscription(id, updateData) {
    try {
      return await Subscription.updateOne({userId: id}, updateData, {
        new: true,
        runValidators: true
      });
    } catch (error) {
      throw new Error(`Error updating subscription: ${error.message}`);
    }
  }

  async deleteSubscription(id) {
    try {
      return await Subscription.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting subscription: ${error.message}`);
    }
  }
}

module.exports = new SubscriptionRepository();
