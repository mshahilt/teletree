const PlanRepository = require('../repositories/plan.repository');

class PlanService {
  async createPlan(planData) {
    // logic/validation here if needed
    return await PlanRepository.createPlan(planData);
  }

  async getAllPlans(filter = {}, projection = null, options = {}) {
    return await PlanRepository.getAllPlans(filter, projection, options);
  }

  async getPlanById(planId) {
    const plan = await PlanRepository.getPlanById(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    return plan;
  }

  async updatePlan(planId, updateData) {
    const updated = await PlanRepository.updatePlan(planId, updateData);
    if (!updated) {
      throw new Error('Plan not found or could not be updated');
    }
    return updated;
  }

  async deletePlan(planId) {
    const deleted = await PlanRepository.deletePlan(planId);
    if (!deleted) {
      throw new Error('Plan not found or could not be deleted');
    }
    return deleted;
  }
}

module.exports = new PlanService();
