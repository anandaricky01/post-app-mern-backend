import mongoose from "mongoose";

const Comment = mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    vote: {
      upVote: {
        type: Number,
        default: 0,
      },
      downVote: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", Comment);
