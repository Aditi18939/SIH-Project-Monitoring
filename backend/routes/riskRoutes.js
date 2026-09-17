const express = require("express");
const Risk = require("../models/Risk");

const router = express.Router();

// Get risks for a project
router.get("/:projectId", async (req, res) => {
  try {
    const risks = await Risk.find({
      projectId: req.params.projectId
    });

    res.json(risks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch risks",
      error: error.message
    });
  }
});

// Add a risk
router.post("/", async (req, res) => {
  try {
    const risk = new Risk(req.body);

    const savedRisk = await risk.save();

    res.status(201).json(savedRisk);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create risk",
      error: error.message
    });
  }
});

module.exports = router;