import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";
//CONECT DATABASE
import db from "./config/Database.js";
//ROUTES
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
//     await db.sync()
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
    origin: ['http://localhost:3000', 'http://172.29.27.46:3000']
}));

app.use(express.json());
app.use(UserRoutes);
app.use(SuratizinRoutes);
app.use(AuthRoute);
app.use(fileUpload());

//store.sync();

app.listen(process.env.APP_PORT,()=> {
    console.log("Server Berjalan..")
});


