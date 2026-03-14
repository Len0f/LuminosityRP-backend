import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/models/connection.js";
import authRoutes from "./src/routes/auth.js";
import rulesRoutes from "./src/routes/rules.js";
import usersRoutes from "./src/routes/users.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://luminosity-rp-frontend.vercel.app",
      "https://www.luminosityrp.fr", "https://luminosityrp.fr"
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rules", rulesRoutes);
app.use("/api/users", usersRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));

export default app;
