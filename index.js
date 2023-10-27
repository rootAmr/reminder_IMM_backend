import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import FileUpload from "express-fileupload";

import cron from "node-cron";
import sendReminder1 from "./schejule/SendEmail_reminder1.js";
import sendReminder4 from "./schejule/SendEmail_reminder4.js";
import sendReminder2 from "./schejule/SendEmail_reminder2.js";
import sendReminder3 from "./schejule/SendEmail_reminder3.js";
import sendReminder5 from "./schejule/SendEmail_reminder5.js";
import sendReminder6 from "./schejule/SendEmail_reminder6.js";
import sendReminder7 from "./schejule/SendEmail_reminder7.js";
import sendReminder8 from "./schejule/SendEmail_reminder8.js";
import sendReminder9 from "./schejule/SendEmail_reminder9.js";
import sendReminder10 from "./schejule/SendEmail_reminder10.js";
import sendReminder11 from "./schejule/SendEmail_reminder11.js";
import sendReminder12 from "./schejule/SendEmail_reminder12.js";
// import {uploadFile} from "./controllers/Upload.js";
// app.post(uploadFile);

//import Uploadrouter from "./routes/Uploadrouter.js"
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoutes from "./routes/UserRoutes.js";
import SuratizinRoutes from "./routes/SuratizinRoutes.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});


// (async()=>{
//     await db.sync();
// })();
  
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://172.29.27.46:3000','http://192.168.1.9:3000','http://10.160.118.23:3000']
}));


cron.schedule('* * * * *', async () => {
    try {
        await sendReminder1();
        await sendReminder2();
        await sendReminder3();
        await sendReminder4();
        await sendReminder5();
        await sendReminder6();
        await sendReminder7();
        await sendReminder8();
        await sendReminder9();
        await sendReminder10();
        await sendReminder11();
        await sendReminder12();

        console.log("Pengecekan pesan sent successfully at", new Date());
    } catch (error) {
        console.error("Error:", error.message);
    }
});

// Penjadwalan tugas cron (jika digunakan)
// cron.schedule('*/5 * * * *', async () => {
//     try {
//         await sendEmail1Bulan();
//         await sendEmail1Minggu();
//         await sendEmail2Minggu();
//         await sendEmail3Minggu();
//         console.log("Pengecekan pesan sent successfully at", new Date());
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// });

// Sistem reminder (jika digunakan)
// cron.schedule('0 8,13 * * *', async () => {
//     try {
//         await sendEmail1Bulan();
//         await sendEmail1Minggu();
//         console.log("Emails sent successfully at", new Date());
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// });


// app.use(FileUpload({
//     uploadDir: path.join(__dirname, 'uploads'), // Define your upload directory
//     limits: { fileSize: 10 * 1024 * 1024 }, // Set a reasonable file size limit
//   }));

app.use(express.json());
//app.use(Uploadrouter);
app.use(UserRoutes);
app.use(FileUpload());
app.use(SuratizinRoutes);
app.use(AuthRoute);
app.use(express.static("pubilc"));

app.listen(process.env.APP_PORT, () => {
    console.log("Server Berjalan..");
});
