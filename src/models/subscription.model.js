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
    numberOfUsagesLeft: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);