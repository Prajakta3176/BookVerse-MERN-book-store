import express from "express";
export const router = express.Router();
import {
  getUserInformation,
  signin,
  signup,
  updateAddress,
} from "../controller/user.js";
import authenticateToken from "./userAuth.js";

// sign up functionality

router
  .post("/signup", signup)
  .post("/signin", signin)
  .get("/user-information", authenticateToken, getUserInformation)
  .patch("/update-address", authenticateToken, updateAddress);

export default router;
