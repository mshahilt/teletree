const subscriptionService = require('../services/subscription.service');
const planService = require('../services/plan.service');
const razorpay = require('../../config/razorPay')

const createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const subscription = await subscriptionService.createSubscription({ userId, planId });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createRazorPayOrder = async(req, res) => {
  try {
  const { planId, amount } = req.body;
  console.log("🔔 [Create Order] Request received for Plan ID:", planId, "with amount:", amount);

  const plans = await planService.getAllPlans();
  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    console.warn("❌ [Create Order] Invalid Plan ID:", planId);
    return res.status(400).json({
      success: false,
      message: 'Invalid plan selected'
    });
  }

  if (amount !== plan.amount * 100) {
    console.warn("❌ [Create Order] Amount mismatch. Expected:", plan.amount * 100, "Received:", amount);
    return res.status(400).json({
      success: false,
      message: 'Amount mismatch'
    });
  }

  console.log("✅ [Create Order] Plan validated:", plan.plan);
  console.log("user id" , req.session?.user?.id);
  console.log("user id" , req.session?.user);

  const options = {
    amount,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      planId,
      planName: plan.plan,
      userId: req.session?.user?._id || 'guest'
    }
  };

  console.log("📦 [Create Order] Creating Razorpay order with options:", options);

  const order = await razorpay.orders.create(options);
  console.log("🎉 [Create Order] Razorpay order created successfully:", order.id);

  await subscriptionService.createSubscription({userId:req.session?.user?._id, planId, razorpayOrderId:order.id});
  console.log("✅ [Subscription] Temporary subscription stored with status 'created'");

  res.json({
    success: true,
    order,
    razorpayKeyId: process.env.RAZORPAYKEYID
  });

  } catch (error) {
    console.error("🔥 [Create Order] Error creating order or subscription:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
}

const verifyRazorPayPayment = async (req, res) => {
   try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const updated = await subscriptionService.verifyPayment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and subscription activated.',
      data: updated
    });

  } catch (err) {
    console.error('Verification error:', err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}

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

const viewFullProfileInfo = async(req, res) => {
  try {
    const userId = req.session?.user?._id;
    const workerId = req.body?.professionalId;
    console.log("workerId : ", workerId);
    const profileInfo = await subscriptionService.viewWorkerContactInfo(userId, workerId);
    console.log("profileInfo :",profileInfo);
    res.status(200).json({ success: true, contacts: profileInfo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message }); 
  }
}

const getHasSubscription = async(req, res) => {
  try {
    const userId = req.session?.user?._id;
    const has = await subscriptionService.hasSubscriptions(userId);
    res.status(200).json({success: true, data: has});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message }); 
    
  }
}
const getSubscriptionsByUserId = async (req, res) => {
  try {
    const userId = req.session?.user?._id;
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(userId);
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
  createRazorPayOrder,
  verifyRazorPayPayment,
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionsByUserId,
  updateSubscription,
  deleteSubscription,
  decrementUsage,
  viewFullProfileInfo,
  getHasSubscription
};
