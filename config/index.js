'use strict';

var fs = require('fs');
var config = {};
var path = require('path');
var fname = '';
var log = null;

var loadConfig = (fname) => {
    try {
        config = JSON.parse(fs.readFileSync(fname, 'utf8'));
        log.info(JSON.stringify(config, null, 4));
    } catch (e) {
        log.error(e);
    }
};

var watchConfig = (fname) => {
    fs.watchFile(fname, function (c, p) {
        log.info('reloading config file: ' + fname);
        loadConfig(config);
    });
};


module.exports = (env, logger) => {
    log = logger;
    fname = path.join(__dirname, env) + '.json';
    loadConfig(fname);
    watchConfig(fname);
    return {
        getCurrent: () => {
            return config;
        }
    };
};

