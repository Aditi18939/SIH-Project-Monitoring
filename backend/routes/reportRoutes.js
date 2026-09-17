const express = require("express");
const Project = require("../models/Project");
const Risk = require("../models/Risk");
const Milestone = require("../models/Milestone");

const router = express.Router();

router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const milestones = await Milestone.find({
      projectId: req.params.projectId
    });

    const risks = await Risk.find({
      projectId: req.params.projectId
    });

    const completedMilestones = milestones.filter(
      (m) => m.status === "Completed"
    ).length;

    const inProgressMilestones = milestones.filter(
      (m) => m.status === "In Progress"
    ).length;

    const pendingMilestones = milestones.filter(
      (m) => m.status === "Pending"
    ).length;

    const highRisks = risks.filter(
      (r) => r.riskLevel === "High"
    ).length;

    const mediumRisks = risks.filter(
      (r) => r.riskLevel === "Medium"
    ).length;

    const lowRisks = risks.filter(
      (r) => r.riskLevel === "Low"
    ).length;

    res.json({
      project: {
        name: project.name,
        manager: project.manager,
        progress: project.progress,
        status: project.status,
        budget: project.budget,
        duration: project.duration
      },

      milestoneSummary: {
        total: milestones.length,
        completed: completedMilestones,
        inProgress: inProgressMilestones,
        pending: pendingMilestones
      },

      riskSummary: {
        total: risks.length,
        high: highRisks,
        medium: mediumRisks,
        low: lowRisks
      }
    });
  } catch (error) {
    console.log("REPORT ERROR:", error);

    res.status(500).json({
      message: "Failed to generate project report",
      error: error.message
    });
  }
});

module.exports = router;