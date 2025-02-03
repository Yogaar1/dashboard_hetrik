module.exports = (sequelize, DataTypes) => {
    const Berita = sequelize.define('Berita', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        judul_berita: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        konten: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tanggal_dibuat: {
            type: DataTypes.DATE, 
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Berita;
};