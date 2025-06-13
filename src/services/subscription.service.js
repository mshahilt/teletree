const SubscriptionRepository = require('../repositories/subscription.respository');
const telecallerRepository = require("../repositories/telecaller.repository")
const PlanRepository = require('../repositories/plan.repository');
const verifyRazorpaySignature = require('../utils/verifySignature');

class SubscriptionService {
  async createSubscription({userId, planId, razorpayOrderId }) {
    console.log("user id :", userId);
    const plan = await PlanRepository.getPlanById(planId);
  if (!plan) {
    throw new Error('Invalid plan selected');
  }

  const subscriptionData = {
    userId,
    planId,
    benefits: plan.benefits,
    numberOfUsagesLeft: plan.numberOfAllowedUsages,
    razorpayOrderId: razorpayOrderId,
    status: 'created',
    verified: false
  };

  return await SubscriptionRepository.createSubscription(subscriptionData);
  }

  
async verifyPayment({ orderId, paymentId, signature }) {
  const isValid = verifyRazorpaySignature(
    orderId,
    paymentId,
    signature,
    process.env.RAZORPAYKEYSECRET
  );

  if (!isValid) {
    throw new Error('Invalid Razorpay signature');
  }

  const updateData = {
    razorpayPaymentId: paymentId,
    razorpaySignature: signature,
    status: 'paid',
    verified: true
  };

  const updatedSubscription = await SubscriptionRepository.updateSubscriptionByOrderId(orderId, updateData);

  if (!updatedSubscription) {
    throw new Error('Subscription not found for this Razorpay order ID');
  }

  return updatedSubscription;
}
  async viewWorkerContactInfo(userId, workerId){
    const subscription = this.getSubscriptionsByUserId(userId);
    if(subscription.numberOfUsagesLeft < 0) {
      throw new Error("Maximum usage exceeded");
    }
    this.decrementUsage(userId);
    return await telecallerRepository.getWorkerContactDetails(workerId);
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
    return await SubscriptionRepository.getSubscriptionsByUserId(userId)
  }
  async hasSubscriptions(userId) {
    const subs = await SubscriptionRepository.getSubscriptionsByUserId(userId);
    return !!(subs && subs.numberOfUsagesLeft > 0);
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
    console.log("decrementUsage called with id:", id);
    const subscription = await this.getSubscriptionsByUserId(id);
    console.log("Fetched subscription:", subscription);
    if (subscription.numberOfUsagesLeft <= 0) {
      console.log("No usages left in this subscription");
      throw new Error('No usages left in this subscription');
    }

    subscription.numberOfUsagesLeft -= 1;
    console.log("Updated numberOfUsagesLeft:", subscription.numberOfUsagesLeft);
    const updated = await SubscriptionRepository.updateSubscription(id, {
      numberOfUsagesLeft: subscription.numberOfUsagesLeft,
    });
    console.log("Subscription after update:", updated);
    return updated;
  }
}

module.exports = new SubscriptionService();
