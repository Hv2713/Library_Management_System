import express, { Router } from "express";
import {
  getAllUsers,
  registerNewAdmin,
} from "../controllers/userController.js";
import {
  isAuthenticated,
  isAuthroized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all",isAuthenticated,isAuthroized("Admin"),getAllUsers);
router.post("/add/new-admin",
    isAuthenticated,
    isAuthroized("Admin"),
    registerNewAdmin
);

export default router;