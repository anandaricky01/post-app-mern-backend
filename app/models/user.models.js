import mongoose, { mongo } from "mongoose";

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password : {
      type : String,
      required : true
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", User);
