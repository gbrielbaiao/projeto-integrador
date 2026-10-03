import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.resolve(projectRoot, ".env") });
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/front", express.static(path.resolve(projectRoot, "front")));
server.use(express.static(path.resolve(projectRoot, "front", "front-usuario")));

server.use("/", authRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});