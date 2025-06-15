const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    plan: {
        type: String,
        required: true,
        trim: true
    },
    benefits: {
        type: [String],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    numberOfAllowedUsages: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);