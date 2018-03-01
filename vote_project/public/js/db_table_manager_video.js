var connection_db = require('./db_connect_postgre');
const Sequelize = require('sequelize');

/**
 * Create Table Manager_video
 */
const Manager_video = connection_db.define('manager_video', {
    id_user: { type: Sequelize.STRING },
    link_video : { type: Sequelize.STRING },
    description : { type: Sequelize.STRING },
    full_name : { type: Sequelize.STRING },
    dob : { type: Sequelize.DATE }
});

// Manager_video.sync();

module.exports = Manager_video;

