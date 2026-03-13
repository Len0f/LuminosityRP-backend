import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);

// GET /api/users
router.get("/", async (req, res) => {
  const users = await User.find().sort("-createdAt").lean();
  res.json(users);
});

// POST /api/users
router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Identifiant et mot de passe requis" });

  const exists = await User.findOne({ username });
  if (exists)
    return res.status(409).json({ message: "Cet identifiant existe déjà" });

  try {
    const user = await User.create({
      username,
      password,
      role: role || "modo",
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères.",
      });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  const { role, password } = req.body;
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable" });

  if (req.user._id.toString() === req.params.id && role && role !== "admin")
    return res
      .status(400)
      .json({ message: "Vous ne pouvez pas modifier votre propre rôle" });

  if (role) user.role = role;
  if (password) user.password = password;
  await user.save();
  res.json(user);
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  if (req.user._id.toString() === req.params.id)
    return res
      .status(400)
      .json({ message: "Vous ne pouvez pas supprimer votre propre compte" });

  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Compte supprimé" });
});

export default router;
