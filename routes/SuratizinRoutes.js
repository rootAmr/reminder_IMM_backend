import express from "express";
import {
    getSuratizin,
    getSuratizinById,
    updateSuratizin,
    deleteSuratizin,
    createSuratizin
} from "../controllers/Suratizin.js";
import { verifyUser, adminOnly  } from "../middleware/AuthUser.js";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/suratizin',verifyUser,adminOnly,getSuratizin);
router.get('/suratizin/:id',verifyUser,adminOnly,getSuratizinById);
router.post('/suratizin', verifyUser,adminOnly,createSuratizin);
router.patch('/suratizin/:id',verifyUser,updateSuratizin);
router.delete('/suratizin/:id',verifyUser,deleteSuratizin);

export default router;
