const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low"
    },

    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Alert", alertSchema);