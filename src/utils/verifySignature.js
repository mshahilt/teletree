const crypto = require('crypto');

function verifyRazorpaySignature(orderId, paymentId, receivedSignature, secret) {
    const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

    return generatedSignature === receivedSignature;
}

module.exports = verifyRazorpaySignature;

