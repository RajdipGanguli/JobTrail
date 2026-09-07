import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jobPostingUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["wishlist", "applied", "oa", "interview", "offer", "rejected"],
      default: "applied",
    },
    source: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);