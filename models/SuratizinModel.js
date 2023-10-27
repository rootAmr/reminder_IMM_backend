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
    institution: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    period: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    name_of_report: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    pic: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },  
    departemen: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    from_email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cc: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    userId: {
        type: DataTypes.INTEGER, // Ubah tipe data sesuai dengan tipe data primary key di tabel Users
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    tanggal_dibuat: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    tanggal_berakhir: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    payment_media: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    remark: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    reminder1: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    reminder2: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder3: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder4: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder5: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder6: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder7: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder8: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder9: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder10: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder11: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    reminder12: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    status_reminder1: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder2: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder3: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder4: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder5: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder6: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder7: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder8: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder9: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder10: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder11: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    status_reminder12: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,

}, {
    freezeTableName: true
});

Users.hasMany(Suratizin);
Suratizin.belongsTo(Users, { foreignKey: 'userId' });

export default Suratizin;

