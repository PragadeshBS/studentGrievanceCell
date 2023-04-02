const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    authorType: {
      type: String,
      required: true,
      enum: ["staff", "student", "anonymous"],
    },
    grievance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grievance",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
