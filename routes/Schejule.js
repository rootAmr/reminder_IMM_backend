import express from "express";
import { sendEmailController } from "../controllers/FormatEmail.js";

const router = express.Router();

// Definisi rute untuk mengirim email
router.post("/send-email", sendEmailController);

export default router;