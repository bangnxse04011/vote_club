var connection_db = require('./db_connect_postgre');
const Sequelize = require('sequelize');

/**
 * Create Table Account details
 */
const Account_details = connection_db.define('account_details', {
    fullName: { type: Sequelize.STRING },
    email : { type : Sequelize.STRING },
    phone_number: { type: Sequelize.INTEGER },
    address : { type : Sequelize.STRING },
    status : { type : Sequelize.INTEGER}
});

// Account_details.sync()

module.exports = Account_details;

