const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

// Get alerts for a project
router.get("/:projectId", async (req, res) => {
  try {
    const alerts = await Alert.find({
      projectId: req.params.projectId
    }).sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts",
      error: error.message
    });
  }
});

// Add a new alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);

    const savedAlert = await alert.save();

    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create alert",
      error: error.message
    });
  }
});

module.exports = router;