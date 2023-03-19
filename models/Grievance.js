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
      required: true,
    },
    grievanceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceType",
      required: true,
    },
    grievanceStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceStatus",
      required: true,
    },
    staffAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
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
