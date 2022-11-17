import express from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  emailRegistration,
  passwordRegistration,
  passwordConfirmation,
} from "../middlewares/user-validation.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { checkValue } from "../middlewares/checkValue.middleware.js";
const router = express.Router();
const url = "/api/users";

router.get(`${url}`, getUsers);
router.post(
  `${url}`,
  authenticate,
  [emailRegistration, passwordRegistration, passwordConfirmation],
  checkValue,
  createUser
);
router.get(`${url}/:id`, getUsersById);
router.put(`${url}/:id`, authenticate, updateUser);
router.delete(`${url}/:id`, authenticate, deleteUser);

export default router;
