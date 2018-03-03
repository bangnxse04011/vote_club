var env = require('node-env-file');
env(__dirname + '/.env');

/**
 * Export data file config
 */
module.exports = {

    /**
     * Export DB_HOST
     */
    _DB_HOST : () => {
        return process.env.DB_HOST
    },
    _DB_USER : () => {
        return process.env.DB_USER
    },
    _DB_PASS : () => {
        return process.env.DB_PASS
    },
    _DB_NAME : () => {
        return process.env.DB_NAME
    },
    _CLIENT_ID_FB : () => {
        return process.env.CLIENT_ID_FB
    },
    _CLIENT_SECREATE : () => {
        return process.env.CLIENT_SECREATE
    }
}
