const Sequelize = require('sequelize');

/**
 * Config DB connect to postgres
 */
const db_connection = new Sequelize('vote_club', 'bangnx1', 'bangnx1', {
    host: 'localhost',
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