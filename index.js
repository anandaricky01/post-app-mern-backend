import express from "express";
import cors from "cors";
import UserRoutes from "./app/routes/user.routes.js";
import config from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen(3000, () => {
  console.log("server up and starting...");
});
