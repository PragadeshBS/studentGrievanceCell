const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    grievanceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceType",
    },
    grievanceStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceStatus",
    },
    staffAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grievance", grievanceSchema);
