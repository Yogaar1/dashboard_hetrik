'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TarifPPJ', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      provinsi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      wilayah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate_ppj: {
        type: Sequelize.DECIMAL(5, 4),
        allowNull: false,
      },
      tanggal_dibuat: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TarifPPJ');
  }
};