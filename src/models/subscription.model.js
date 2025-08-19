const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    planId: {
        type: String,
        ref: "Plan",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    benefits: {
        type: [String],
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    },
    numberOfUsagesLeft: {
        type: Number,
        required: true,
        min: 0
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String
    },
    amount: {   // 💰 Add this field
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 864000 // 10 days in seconds
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
