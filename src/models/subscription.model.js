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
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Subscription', SubscriptionSchema);