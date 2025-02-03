module.exports = (sequelize, DataTypes) => {
    const TarifPPJ = sequelize.define('TarifPPJ', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        provinsi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wilayah: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate_ppj: {
            type: DataTypes.DECIMAL(5, 4),
            allowNull: false,
        },
        tanggal_dibuat: {
            type: DataTypes.DATE,  
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return TarifPPJ;
};