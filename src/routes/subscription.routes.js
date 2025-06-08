const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');

// Create a new subscription
router.post('/', subscriptionController.createSubscription);

// Get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// Get subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Get subscriptions by user ID
router.get('/user/:userId', subscriptionController.getSubscriptionsByUserId);

// Update a subscription
router.put('/:id', subscriptionController.updateSubscription);

// Delete a subscription
router.delete('/:id', subscriptionController.deleteSubscription);

// Decrement usage
router.patch('/:id/decrement', subscriptionController.decrementUsage);

module.exports = router;
