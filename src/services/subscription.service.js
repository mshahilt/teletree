const SubscriptionRepository = require('../repositories/subscription.repository');
const PlanRepository = require('../repositories/plan.repository');

class SubscriptionService {
  async createSubscription({ userId, planId }) {
    const plan = await PlanRepository.getPlanById(planId);
    if (!plan) {
      throw new Error('Invalid plan selected');
    }

    const subscriptionData = {
      userId,
      planId,
      benefits: plan.benefits,
      numberOfUsagesLeft: plan.numberOfAllowedUsages,
    };

    return await SubscriptionRepository.createSubscription(subscriptionData);
  }

  async getAllSubscriptions(filter = {}, projection = null, options = {}) {
    return await SubscriptionRepository.getAllSubscriptions(filter, projection, options);
  }

  async getSubscriptionById(id) {
    const subscription = await SubscriptionRepository.getSubscriptionById(id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    return subscription;
  }

  async getSubscriptionsByUserId(userId) {
    return await SubscriptionRepository.getSubscriptionsByUserId(userId);
  }

  async updateSubscription(id, updateData) {
    const updated = await SubscriptionRepository.updateSubscription(id, updateData);
    if (!updated) {
      throw new Error('Subscription not found or update failed');
    }
    return updated;
  }

  async deleteSubscription(id) {
    const deleted = await SubscriptionRepository.deleteSubscription(id);
    if (!deleted) {
      throw new Error('Subscription not found or delete failed');
    }
    return deleted;
  }

  async decrementUsage(id) {
    const subscription = await this.getSubscriptionById(id);
    if (subscription.numberOfUsagesLeft <= 0) {
      throw new Error('No usages left in this subscription');
    }

    subscription.numberOfUsagesLeft -= 1;
    return await SubscriptionRepository.updateSubscription(id, {
      numberOfUsagesLeft: subscription.numberOfUsagesLeft,
    });
  }
}

module.exports = new SubscriptionService();
