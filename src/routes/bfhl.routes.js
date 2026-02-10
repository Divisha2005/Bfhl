
import express from "express";
import { bfhlController } from "../controllers/bfhl.controller.js";

const router = express.Router();

router.post("/bfhl", bfhlController);

export default router;
