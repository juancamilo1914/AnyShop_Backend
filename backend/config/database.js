const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ Conectado a MySQL'))
    .catch(err => console.error('❌ Error al conectar:', err));

module.exports = sequelize;