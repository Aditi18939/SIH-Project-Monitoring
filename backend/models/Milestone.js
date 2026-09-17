const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
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

    status: {
      type: String,
      enum: ["Completed", "In Progress", "Pending"],
      default: "Pending"
    },

    progress: {
      type: Number,
      default: 0
    },

    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Milestone", milestoneSchema);