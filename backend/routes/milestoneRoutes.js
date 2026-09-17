const express = require("express");
const Milestone = require("../models/Milestone");

const router = express.Router();

// Get milestones for a project
router.get("/:projectId", async (req, res) => {
  try {
    const milestones = await Milestone.find({
      projectId: req.params.projectId
    });

    res.json(milestones);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch milestones",
      error: error.message
    });
  }
});

// Add a milestone
router.post("/", async (req, res) => {
  try {
    const milestone = new Milestone(req.body);

    const savedMilestone = await milestone.save();

    res.status(201).json(savedMilestone);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create milestone",
      error: error.message
    });
  }
});

module.exports = router;