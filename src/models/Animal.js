const Sequelize = require('sequelize');
const db = require('../config/db');

const Animal =  db.define('animal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    species: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    speed: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    }
});

module.exports = Animal;
