var connection_db = require('./db_connect_postgre');
const Sequelize = require('sequelize');

/**
 * Create Table Users
 */
const Account = connection_db.define('account', {
    fullName: { type: Sequelize.STRING },
    email : { type : Sequelize.STRING },
    id_user: { type: Sequelize.STRING },
    role : {type: Sequelize.INTEGER}
});

// Account.sync();

module.exports = Account;

