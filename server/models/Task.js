const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(
      "Todo",
      "In Progress",
      "Done"
    ),
    defaultValue: "Todo",
  },

  assignedTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;