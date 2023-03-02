import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.models.Grievance ||
  mongoose.model("Grievance", grievanceSchema);
