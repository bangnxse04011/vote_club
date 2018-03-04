var connection_db = require('./db_connect_postgre');
const Sequelize = require('sequelize');

/**
 * Create Table Users
 */
const Account_admin = connection_db.define('account_admin', {
    fullName: { type: Sequelize.STRING },
    email : { type : Sequelize.STRING },
    username: { type: Sequelize.STRING },
    password : {type: Sequelize.STRING},
    status : { type : Sequelize.INTEGER}
});

// Account_admin.sync();

module.exports = Account_admin;

