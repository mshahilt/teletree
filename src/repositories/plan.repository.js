const Plan = require('../models/plan.model');

class PlanRepository {
  async createPlan(planData) {
    try {
      const newPlan = new Plan(planData);
      return await newPlan.save();
    } catch (error) {
      throw new Error(`Error creating plan: ${error.message}`);
    }
  }

  async getAllPlans(filter = {}, projection = null, options = {}) {
    try {
      return await Plan.find(filter, projection, options);
    } catch (error) {
      throw new Error(`Error fetching plans: ${error.message}`);
    }
  }

  async getPlanById(planId) {
    try {
      return await Plan.findById(planId);
    } catch (error) {
      throw new Error(`Error fetching plan by ID: ${error.message}`);
    }
  }

  async updatePlan(planId, updateData) {
    try {
      return await Plan.findByIdAndUpdate(planId, updateData, {
        new: true,
        runValidators: true
      });
    } catch (error) {
      throw new Error(`Error updating plan: ${error.message}`);
    }
  }

  async deletePlan(planId) {
    try {
      return await Plan.findByIdAndDelete(planId);
    } catch (error) {
      throw new Error(`Error deleting plan: ${error.message}`);
    }
  }
}

module.exports = new PlanRepository();
