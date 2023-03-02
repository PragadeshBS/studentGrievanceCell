import mongoose from "mongoose";

const grievanceTypeSchema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.models.GrievanceType ||
  mongoose.model("GrievanceType", grievanceTypeSchema);
