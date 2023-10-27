import Suratizin from "../models/SuratizinModel.js";
import sendAfterSumbited from "./SendAfterSumbite.js";
import User from "../models/UserModel.js";
import path from "path";
import crypto from "crypto";
import fs from 'fs';

export const createSuratizin = async (req, res) => {
    try {
        const institution = req.body.institution;
        const period = req.body.period;
        const name_of_report = req.body.name_of_report;
        const pic = req.body.pic;
        const from_email = req.body.from_email;
        const payment_media = req.body.payment_media;
        const remark = req.body.remark;
        const tanggal_dibuat = req.body.tanggal_dibuat;
        const tanggal_berakhir = req.body.tanggal_berakhir;
        const departemen = req.body.departemen;
        const cc = req.body.cc;
        const reminder1 = req.body.reminder1;
        const reminder2 = req.body.reminder2;
        const reminder3 = req.body.reminder3;
        const reminder4 = req.body.reminder4;
        const reminder5 = req.body.reminder5;
        const reminder6 = req.body.reminder6;
        const reminder7 = req.body.reminder7;
        const reminder8 = req.body.reminder8;
        const reminder9 = req.body.reminder9;
        const reminder10 = req.body.reminder10;
        const reminder11 = req.body.reminder11;
        const reminder12 = req.body.reminder12;
        const name = req.body.title;

        let fileName = null;
        let url = null;

        if (req.files !== null) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const allowedType = [".png", ".jpg", ".jpeg"];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid Images" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            const md5Hash = crypto.createHash("md5").update(file.data).digest("hex");
            fileName = `${md5Hash}${ext}`;
            url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

            file.mv(`./pubilc/images/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ msg: err.message });
                
                await createSuratizinWithFile();
            });
        } else {
            await createSuratizinWithFile();
        }

        async function createSuratizinWithFile() {
            try {
                const createdSuratizin = await Suratizin.create({
                    institution,
                    period,
                    name_of_report,
                    from_email,
                    payment_media,
                    pic,
                    remark,
                    tanggal_dibuat,
                    tanggal_berakhir,
                    departemen,
                    cc,
                    reminder1,
                    reminder2,
                    reminder3,
                    reminder4,
                    reminder5,
                    reminder6,
                    reminder7,
                    reminder8,
                    reminder9,
                    reminder10,
                    reminder11,
                    reminder12,
                    name,
                    image: fileName,
                    url,
                    userId: req.userId
                });
                
                // await sendAfterSumbited(
                //     institution,
                //     name_of_report,
                //     period,
                //     from_email,
                //     payment_media,
                //     pic,
                //     tanggal_dibuat,
                //     tanggal_berakhir,
                // );

                res.status(201).json({ msg: "Surat Izin Created Successfully", data: createdSuratizin });
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ msg: error.message });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getSuratizin = async (req, res) => {
    try {
        const response = await Suratizin.findAll({
            attributes: ['uuid',
                        'institution',
                        'name_of_report',
                        'period',
                        'departemen',
                        'payment_media',
                        'from_email',
                        'cc',
                        'pic', 
                        'remark', 
                        'tanggal_dibuat', 
                        'tanggal_berakhir',
                        'reminder1',
                        'reminder2',
                        'reminder3',
                        'reminder4',
                        'reminder5',
                        'reminder6',
                        'reminder7',
                        'reminder8',
                        'reminder9',
                        'reminder10',
                        'reminder11',
                        'reminder12',
                        'url',
                        'image'],
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
            attributes: ['uuid',
                        'institution',
                        'name_of_report',
                        'period',
                        'from_email',
                        'cc',
                        'pic', 
                        'remark',
                        'departemen',
                        'payment_media',
                        'tanggal_dibuat', 
                        'tanggal_berakhir',
                        'reminder1',
                        'reminder2',
                        'reminder3',
                        'reminder4',
                        'reminder5',
                        'reminder6',
                        'reminder7',
                        'reminder8',
                        'reminder9',
                        'reminder10',
                        'reminder11',
                        'reminder12',
                        'url',
                        'image'],
            where: {
                uuid: suratizin.uuid
            },
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

        let fileName = suratizin.image; // Default to current image
        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = `${file.md5}${ext}`;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid Images" });
            }
            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            const filepath = `./pubilc/images/${suratizin.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./pubilc/images/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const {
            institution,
            name_of_report,
            period,
            from_email,
            payment_media,
            pic,
            remark,
            tanggal_dibuat,
            tanggal_berakhir,
            reminder1,
            reminder2,
            reminder3,
            reminder4,
            reminder5,
            reminder6,
            reminder7,
            reminder8,
            reminder9,
            reminder10,
            reminder11,
            reminder12,
            title,
        } = req.body;

        await suratizin.update({
            institution,
            name_of_report,
            period,
            from_email,
            payment_media,
            pic,
            remark,
            tanggal_dibuat,
            tanggal_berakhir,
            reminder1,
            reminder2,
            reminder3,
            reminder4,
            reminder5,
            reminder6,
            reminder7,
            reminder8,
            reminder9,
            reminder10,
            reminder11,
            reminder12,
            name: title,
            image: fileName,
            url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
        });

        await sendAfterSumbited(
            institution,
            name_of_report,
            period,
            from_email,
            payment_media,
            pic,
            tanggal_dibuat,
            tanggal_berakhir,
        );

        res.status(200).json({ msg: "Surat perizinan berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
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

export const getDepartemen = async (req, res) => {
    try {
      const suratIzinList = await Suratizin.findAll({
        attributes: ['departemen', 'url']
      });
  
      const departemenCount = {};
      const urlStatus = {};
  
      // Menghitung jumlah departemen dan status URL
      suratIzinList.forEach((item) => {
        const departemen = item.departemen;
        const url = item.url;
        
        // Menghitung jumlah departemen
        if (departemen) {
          if (departemenCount[departemen]) {
            departemenCount[departemen]++;
          } else {
            departemenCount[departemen] = 1;
          }
        }
  
        // Menghitung status URL
        if (url) {
          if (urlStatus[departemen]) {
            urlStatus[departemen].sudah = (urlStatus[departemen].sudah || 0) + 1;
          } else {
            urlStatus[departemen] = { sudah: 1, belum: 0 };
          }
        } else {
          if (urlStatus[departemen]) {
            urlStatus[departemen].belum = (urlStatus[departemen].belum || 0) + 1;
          } else {
            urlStatus[departemen] = { sudah: 0, belum: 1 };
          }
        }
      });
  
      return res.json({
        departemenCount,
        urlStatus,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};