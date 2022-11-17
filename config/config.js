import mongoose from "mongoose";
const dbUrl = "mongodb://localhost:27017/post-app-mern";
export default mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connect!");
  })
  .catch((err) => {
    console.log("Can't connect to Databse!", err);
    process.exit();
  });
