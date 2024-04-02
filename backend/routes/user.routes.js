import express from "express";
import { getUsersFroSidebar } from "../controllers/user.controller.js"
const router = express.Router();
router.get("/", getUsersFroSidebar) 
  
export default router;