// import nodemailer from "nodemailer";
// // Definisi controller untuk mengirim email
// export const sendEmailController = (req, res) => {
//     const mailOption = {
//         from: 'lusemuakp@gmail.com',
//         to: '11201004@student.itk.ac.id',
//         subject: 'Email from Node_JS',
//         text: 'Hello, this is an email from Node.js!'
//     };

//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: 'lusemuakp@gmail.com',
//             pass: 'pleemxgutiaogmvu'
//         }
//     });

//     transporter.sendMail(mailOption, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error sending email");
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.status(200).send("Email sent successfully");
//         }
//     });
// };

// export default sendEmailController;