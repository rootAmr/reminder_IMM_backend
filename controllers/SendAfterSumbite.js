import nodemailer from "nodemailer";

// Definisi controller untuk mengirim email
export const sendAfterSumbited = (institution,name_of_report,period, from_email, payment_media, pic, tanggal_dibuat, tanggal_berakhir) => {
    const mailOption = {
        from: 'emailimmreminder@gmail.com',
        to: 'emailimmreminder@gmail.com',
        subject: 'Berhasil Membuat Reminder Report & Payment Obligation',
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
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Berhasil Membuat Reminder Report & Payment Obligation</h1>
                    </div>
                    <div class="content">
                        <p>Selamat! Anda telah berhasil membuat jadwal reminder Report & Payment Obligation.</p>
                        <p>Detail</p>
                        <ul class="list">
                            <li class="list-item"><strong>Institution:</strong> ${institution}</li>
                            <li class="list-item"><strong>Name of Report :</strong> ${name_of_report}</li>
                            <li class="list-item"><strong>Periode:</strong> ${period}</li>
                            <li class="list-item"><strong>Payment Media:</strong> ${payment_media}</li>
                            <li class="list-item"><strong>PIC:</strong> ${pic}</li>
                            <li class="list-item"><strong>Tanggal Dibuat:</strong> ${tanggal_dibuat}</li>
                            <li class="list-item"><strong>Tanggal Berakhir:</strong> ${tanggal_berakhir}</li>
                        </ul>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    // Code untuk mengirim email
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'emailimmreminder@gmail.com',
            pass: 'bdnhlipmrikrgbxm'
        }
    });

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send("Email sent successfully");
        }
    });
};

export default sendAfterSumbited;
