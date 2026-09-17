const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();

    console.log("PROJECTS FOUND:", projects.length);

    res.json(projects);
  } catch (error) {
    console.log("PROJECT FETCH ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message
    });
  }
});

// Add a new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.log("PROJECT CREATE ERROR:", error);

    res.status(400).json({
      message: "Failed to create project",
      error: error.message
    });
  }
});

// Add demo projects
router.post("/seed", async (req, res) => {
  try {
    await Project.deleteMany({});

    const projects = await Project.insertMany([
      {
        name: "Digital Infrastructure Project",
        manager: "Project Manager 1",
        progress: 75,
        status: "On Track",
        budget: 25,
        duration: "18 Months",
        startDate: "2026-01-01",
        expectedEndDate: "2027-06-30"
      },
      {
        name: "Smart City Development",
        manager: "Project Manager 2",
        progress: 52,
        status: "Delayed",
        budget: 40,
        duration: "24 Months",
        startDate: "2026-02-01",
        expectedEndDate: "2028-01-31"
      },
      {
        name: "National Data Platform",
        manager: "Project Manager 3",
        progress: 38,
        status: "At Risk",
        budget: 30,
        duration: "20 Months",
        startDate: "2026-03-01",
        expectedEndDate: "2027-10-31"
      },
      {
        name: "Rural Connectivity Project",
        manager: "Project Manager 4",
        progress: 64,
        status: "On Track",
        budget: 35,
        duration: "22 Months",
        startDate: "2026-01-15",
        expectedEndDate: "2027-11-15"
      }
    ]);

    res.status(201).json(projects);
  } catch (error) {
    console.log("PROJECT SEED ERROR:", error);

    res.status(500).json({
      message: "Failed to add demo projects",
      error: error.message
    });
  }
});

module.exports = router;