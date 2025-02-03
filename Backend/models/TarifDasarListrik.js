module.exports = (sequelize, DataTypes) => {
    const TarifDasarListrik = sequelize.define('TarifDasarListrik', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        jenis_daya: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nilai_daya: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tarif_listrik: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        tanggal_dibuat: {
            type: DataTypes.DATE,  
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return TarifDasarListrik;
};