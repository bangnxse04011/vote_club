var connection_db = require('./db_connect_postgre');
const Sequelize = require('sequelize');

/**
 * Create Table Manager_video
 */
const Manager_like = connection_db.define('manager_like', {
    id_video: { type: Sequelize.STRING },
    id_user: { type: Sequelize.STRING },
});

// Manager_like.sync();

module.exports = Manager_like;

