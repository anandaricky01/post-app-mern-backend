import mongoose, { mongo } from "mongoose";

const Post = mongoose.Schema(
  {
    title : {
        type : String,
        required : true,
        unique : true
    },
    slug : {
        type : String,
        required : true
    },
    category : {
        type : Array,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    vote : {
      upVote : {
        type : Number,
        default : 0
      },
      downVote : {
        type : Number,
        default : 0
      },
    },
    comment : {
      commentBy : {
        type : String,
      },
      body : {
        type : String
      },
      dateComment : {
        type : Date
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("posts", Post);
