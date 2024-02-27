import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserToSidebar } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUserToSidebar);

export default router;
