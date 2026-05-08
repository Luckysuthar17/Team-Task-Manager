const express = require("express");

const Project = require("../models/Project");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Project created",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;