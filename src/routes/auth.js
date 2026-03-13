import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Identifiant et mot de passe requis" });

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res
      .status(401)
      .json({ message: "Identifiant ou mot de passe incorrect" });

  const token = signToken(user._id);
  res.json({ token, user });
});

// GET /api/auth/me
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
