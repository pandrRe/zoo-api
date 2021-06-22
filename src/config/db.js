const Sequelize = require('sequelize');
const { CONFIG } = require('./values');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: CONFIG('SQLITE_DB_PATH'),
});

module.exports = sequelize;
