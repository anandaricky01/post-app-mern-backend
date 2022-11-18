import express from "express";
import cors from "cors";
import UserRoutes from "./app/routes/user.routes.js";
import AuthRoutes from "./app/routes/auth.routes.js";
import PostRoutes from "./app/routes/post.routes.js";
import config from "./config/config.js";
 
const app = express();

app.use(cors());
app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PostRoutes);

app.listen(3000, () => {
  console.log("server up and starting...");
});
