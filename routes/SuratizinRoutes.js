import express from "express";
import {
    getSuratizin,
    getSuratizinById,
    updateSuratizin,
    deleteSuratizin,
    createSuratizin,
    getDepartemen
} from "../controllers/Suratizin.js";
import { verifyUser, adminOnly  } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/suratizin', verifyUser,getSuratizin);
router.get('/suratizin_user',getSuratizin);
router.get('/getdepartemen',verifyUser, getDepartemen);
router.get('/suratizin/:id', verifyUser,getSuratizinById);
router.post('/suratizin', verifyUser,createSuratizin);
router.patch('/suratizin/:id', verifyUser, updateSuratizin);
router.delete('/suratizin/:id', verifyUser, deleteSuratizin);

export default router;