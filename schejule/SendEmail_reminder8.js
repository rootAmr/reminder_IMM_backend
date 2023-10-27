import Suratizin from "../models/SuratizinModel.js";
import nodemailer from "nodemailer";
import { Op } from "sequelize"; 

export const sendReminder8 = async () => {
    try {
        const currentDate = new Date();

        const suratizinList = await Suratizin.findAll({
            where: {
                reminder8: {
                    [Op.and]: [
                        { [Op.lte]: currentDate },
                        { [Op.gte]: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0) }
                    ]
                }
            }
        });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'emailimmreminder@gmail.com',
                pass: 'bdnhlipmrikrgbxm'
            }
        });

        for (const suratizin of suratizinList) {
            const berakhirDate = new Date(suratizin.tanggal_berakhir);
            const daysRemaining = Math.ceil((berakhirDate - currentDate) / (1000 * 60 * 60 * 24));

            let subject = "";
            if (daysRemaining > 1) {
                subject = `Peringatan ${daysRemaining} hari lagi ${suratizin.name_of_report} akan habis`;
            } else if (daysRemaining === 1) {
                subject = `${suratizin.name_of_report} habis hari ini`;
            } else if (daysRemaining === 0) {
                subject = `${suratizin.name_of_report} habis hari ini`;
            } else {
                subject = `${suratizin.name_of_report} sudah lebih ${Math.abs(daysRemaining)} hari dari tanggal dibuat`;
            }
            let statusMessage = "Belum Upload File"; 
            let statusColor = "#ed4a21"; 
            if (suratizin.url !== null) {
                statusMessage = "Sudah Upload File";
                statusColor = "#58eb34"; 
            }

            const toEmails = suratizin.from_email.split(',').map(email => email.trim());


            if (suratizin.status_8 !== 'berhasil8') {
                const mailOptions = {
                    from: 'emailimmreminder@gmail.com',
                    to: toEmails.join(', '),
                    cc: '11201004@student.itk.ac.id',
                    subject: subject,
                    html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #007bff;
                                color: #ffffff;
                                padding: 10px;
                                text-align: center;
                                border-radius: 5px 5px 0 0;
                            }
                            .content {
                                padding: 20px;
                            }
                            .list {
                                list-style: none;
                                padding: 0;
                                margin: 0;
                            }
                            .list-item {
                                margin-bottom: 10px;
                            }
                            .list-item strong {
                                display: inline-block;
                                width: 120px;
                                font-weight: bold;
                            }.status {
                                font-weight: bold;
                                color: ${statusColor}; 
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>${subject}</h1>
                            </div>
                            <div class="content">
                                <p>${subject}</p>
                                <p>Detail:</p>
                                <ul class="list">
                                    <li class="list-item"><strong>Periode:</strong> ${suratizin.period}</li>
                                    <li class="list-item"><strong>Payment Media:</strong> ${suratizin.payment_media}</li>
                                    <li class="list-item"><strong>Name of report:</strong> ${suratizin.name_of_report}</li>
                                    <li class="list-item"><strong>PIC:</strong> ${suratizin.pic}</li>
                                    <li class="list-item"><strong>Tanggal Dibuat:</strong> ${suratizin.tanggal_dibuat}</li>
                                    <li class="list-item"><strong>Tanggal Berakhir:</strong> ${suratizin.tanggal_berakhir}</li>
                                    <li class="list-item"><strong>Status Obligation<p class="status">${statusMessage}</p></strong></li>
                                </ul>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            };

                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent to:', mailOptions.to);

                        if (info.accepted.includes(suratizin.from_email)) {
                            try {
                                await suratizin.update({ status_8: 'berhasil8' });
                                console.log('Status updated to "berhasil8" for:', suratizin.uuid);
                            } catch (updateError) {
                                console.error('Error updating status_reminder8:', updateError);
                            }
                        }
                    }
                });
            } else {
                console.log('Email already sent for:', suratizin.uuid);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

export default sendReminder8;
