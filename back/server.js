import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import path from "path";

dotenv.config();
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(path.resolve("front")));

server.use("/", authRoutes);

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});