import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";
import { verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users",verifyUser, getUser);
router.get("/users/:id",verifyUser, getUserById);
router.post("/register",verifyUser, createUser);
router.put("/users/:id",verifyUser, updateUser);
router.delete("/users/:id",verifyUser, deleteUser);

export default router;
