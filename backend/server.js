import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the income request with json payload (from req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`server is running on port ${port} `);
});

server.listen(port, () => {
  connectMongoDB();
  console.log(`server is running on port ${port}`);
});
