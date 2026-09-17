const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    manager: {
      type: String,
      required: true
    },

    progress: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["On Track", "Delayed", "At Risk"],
      default: "On Track"
    },

    budget: {
      type: Number,
      default: 0
    },

    duration: {
      type: String,
      default: ""
    },

    startDate: {
      type: Date
    },

    expectedEndDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);