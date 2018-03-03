const Sequelize = require('sequelize');
const util = require('./unit');

/**
 * Config DB connect to postgres
 */
const db_connection = new Sequelize(util._DB_NAME(), util._DB_USER(), util._DB_PASS(), {
    host: util._DB_HOST(),
    dialect: 'postgres',
  
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

/**
 * Method test connection to DB and show log
 */
db_connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db_connection;