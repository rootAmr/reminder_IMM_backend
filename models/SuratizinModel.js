import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Suratizin = db.define('surat_izin', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    nama_perizinan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    pic: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    userId: {
        type: DataTypes.INTEGER, // Ubah tipe data sesuai dengan tipe data primary key di tabel Users
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    departemen: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggalExp: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    reminder: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    uploadFile: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        } // Ubah menjadi false jika file upload wajib diisi
    }
}, {
    freezeTableName: true
});

Users.hasMany(Suratizin);
Suratizin.belongsTo(Users, { foreignKey: 'userId' });

export default Suratizin;
