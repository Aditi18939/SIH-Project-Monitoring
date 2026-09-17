const express = require("express");
const Project = require("../models/Project");
const Risk = require("../models/Risk");
const Alert = require("../models/Alert");
const Milestone = require("../models/Milestone");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const projects = await Project.find();
    const risks = await Risk.find();
    const alerts = await Alert.find();
    const milestones = await Milestone.find();

    const totalProjects = projects.length;

    const averageProgress =
      totalProjects > 0
        ? Math.round(
            projects.reduce((sum, project) => sum + project.progress, 0) /
              totalProjects
          )
        : 0;

    const onTrack = projects.filter(
      (project) => project.status === "On Track"
    ).length;

    const delayed = projects.filter(
      (project) => project.status === "Delayed"
    ).length;

    const atRisk = projects.filter(
      (project) => project.status === "At Risk"
    ).length;

    const highRisks = risks.filter(
      (risk) => risk.riskLevel === "High"
    ).length;

    const mediumRisks = risks.filter(
      (risk) => risk.riskLevel === "Medium"
    ).length;

    const activeAlerts = alerts.filter(
      (alert) => alert.status === "Active"
    ).length;

    const completedMilestones = milestones.filter(
      (milestone) => milestone.status === "Completed"
    ).length;

    res.json({
      totalProjects,
      averageProgress,
      projectStatus: {
        onTrack,
        delayed,
        atRisk
      },
      risks: {
        high: highRisks,
        medium: mediumRisks
      },
      activeAlerts,
      milestones: {
        total: milestones.length,
        completed: completedMilestones
      }
    });
  } catch (error) {
    console.log("DASHBOARD SUMMARY ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard summary",
      error: error.message
    });
  }
});

module.exports = router;