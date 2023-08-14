import Suratizin from "../models/SuratizinModel.js";
import User from "../models/UserModel.js";
import path from "path";
import {Op} from "sequelize";

export const getSuratizin = async (req, res) => {
    try {
        const response = await Suratizin.findAll({
            attributes: ['nama_perizinan','pic', 'departemen', 'tanggalExp', 'reminder', 'uploadFile'],
            include: [{
                model: User,
                attributes: ['nama','uuid']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getSuratizinById = async (req, res) => {
    try {
        const suratizin = await Suratizin.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratizin) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const response = await Suratizin.findOne({
            attributes: ['uuid', 'nama_perizinan', 'pic', 'userId', 'departemen', 'tanggalExp', 'reminder', 'uploadFile'],
            where: {
                uuid: suratizin.uuid
            },
            include: [{
                model: User,  // Ganti 'user' dengan 'User'
                attributes: ['nama','uuid']  // Ubah 'nama_perizinan' menjadi 'nama'
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const createSuratizin = async (req, res) => {
    const { nama_perizinan, pic, departemen, tanggalExp, reminder } = req.body;

    try {
        // Buat entri Suratizin
        const createdSuratizin = await Suratizin.create({
            nama_perizinan: nama_perizinan,
            pic: pic,
            departemen: departemen,
            tanggalExp: tanggalExp,
            reminder: reminder,
            userId: req.userId
        });

        if (!req.files || !req.files.file) {
            throw new Error("Tidak Ada File yang Diunggah");
        }

        const uploadFile = req.files.file;
        const fileSize = uploadFile.data.length;
        const ext = path.extname(uploadFile.name);
        const fileName = `${createdSuratizin._id}${ext}`;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        if (!allowedTypes.includes(ext.toLowerCase())) {
            throw new Error("Format Gambar Tidak Valid");
        }
        if (fileSize > 5000000) {
            throw new Error("Ukuran Gambar harus Kurang dari 5 MB");
        }

        await uploadFile.mv(`./public/images/${fileName}`);

        // Buat entri Produk
        await Product.create({ name: nama_perizinan, image: fileName, url: url });

        res.status(201).json({ msg: "Suratizin dan Produk Berhasil Dibuat" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};



export const updateSuratizin = async (req, res) => {
    try {
        const suratizin = await Suratizin.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratizin) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const { nama_perizinan, pic, departemen, tanggalExp, reminder, uploadFile } = req.body;

        await Suratizin.update(
            {
                nama_perizinan, pic, departemen, tanggalExp, reminder, uploadFile
            },
            {
                where: {
                    uuid: req.params.id
                }
            }
        );

        res.status(200).json({ msg: "Surat perizinan berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteSuratizin = async (req, res) => {
    try {
        const suratizin = await Suratizin.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratizin) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        await Suratizin.destroy({
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json({ msg: "Surat perizinan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

