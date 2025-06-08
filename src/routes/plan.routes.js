// routes/plan.routes.js

const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');

// Create a new plan
router.post('/', planController.createPlan);

// Get all plans
router.get('/', planController.getAllPlans);

// Get a specific plan by ID
router.get('/:id', planController.getPlanById);

// Update a specific plan by ID
router.put('/:id', planController.updatePlan);

// Delete a specific plan by ID
router.delete('/:id', planController.deletePlan);

module.exports = router;
