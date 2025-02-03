'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TarifDasarListrik', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      jenis_daya: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nilai_daya: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tarif_listrik: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tanggal_dibuat: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TarifDasarListrik');
  }
};