import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, "..", "..", "front");

const authRoutes = Router();

authRoutes.get("/", (_, res) => {
  res.sendFile(path.resolve(frontendPath, "front-usuario", "html", "index.html"));
});

authRoutes.get(["/login", "/login.html"], (_, res) => {
  res.sendFile(path.resolve(frontendPath, "front-usuario", "html", "login.html"));
});

authRoutes.get(["/register", "/register.html"], (_, res) => {
  res.sendFile(path.resolve(frontendPath, "front-usuario", "html", "register.html"));
});

authRoutes.get(["/admin", "/admin.html"], (_, res) => {
  res.sendFile(path.resolve(frontendPath, "front-admin", "html", "admin.html"));
});

export default authRoutes;