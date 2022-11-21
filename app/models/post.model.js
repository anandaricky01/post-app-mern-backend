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
    }
  },
  { timestamps: true }
);

export default mongoose.model("posts", Post);
