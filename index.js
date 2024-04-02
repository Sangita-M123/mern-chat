import path from "path"
import express from "express";
import dotenv from "dotenv";
 import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./backend/routes/auth.routes.js";
import connecttoMongoDB from "./backend/db/connecttoMongoDB.js";
import messageRoutes from "./backend/routes/message.routes.js";
import userRoutes from "./backend/routes/user.routes.js";
import {app, server} from "./backend/socket/socket.js"
// const app = express();

const PORT = process.env.PORT || 5000;
// for the deploy this app

const __dirname = path.resolve();
dotenv.config();
app.use(express.json());
 app.use(cors());
app.use(cookieParser())
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
//for the send to request
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "frontend","dist","index.html"))
})

 server.listen(PORT, () => {
  connecttoMongoDB();
  console.log(`server is running in on port ${PORT} `);
});
