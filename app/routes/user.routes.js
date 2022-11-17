import express from "express";
import { getUsers, getUsersById, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();
const url = "/api/users";

router.get(`${url}`, getUsers);
router.post(`${url}`, createUser);
router.get(`${url}/:id`, getUsersById);
router.put(`${url}/:id`, updateUser);
router.delete(`${url}/:id`, deleteUser);

export default router;
