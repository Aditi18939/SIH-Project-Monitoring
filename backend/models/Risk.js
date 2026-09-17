const mongoose = require("mongoose");

const riskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    riskType: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    probability: {
      type: Number,
      default: 0
    },

    impact: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    recommendation: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Risk", riskSchema);