import mongoose from "mongoose";

const Vote = mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    vote: {
        type : Boolean
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("votes", Vote);
