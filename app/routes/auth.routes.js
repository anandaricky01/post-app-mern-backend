import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  emailRegistration,
  passwordRegistration,
  passwordConfirmation,
} from "../middlewares/user-validation.middleware.js";
import { guest } from "../middlewares/guest.middleware.js";
import { checkValue } from "../middlewares/checkValue.middleware.js";

const router = express.Router();
const url = "/api/auth";

router.post(
  `${url}/register`,
  guest,
  [emailRegistration, passwordRegistration, passwordConfirmation],
  checkValue,
  register
);
router.post(`${url}/login`, guest, login);

export default router;
