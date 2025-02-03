const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect : 'mysql',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,               
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi berhasil ke database MySQL!');
  } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
  }
}

connectDB();

module.exports = sequelize;
