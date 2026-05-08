const express = require("express");

const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
      where: {
        status: "Done",
      },
    });

    const pendingTasks = await Task.count({
      where: {
        status: "Todo",
      },
    });

    const inProgressTasks = await Task.count({
      where: {
        status: "In Progress",
      },
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;