import { Sequelize } from "sequelize";

const db = new Sequelize ('reminderdata','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;




