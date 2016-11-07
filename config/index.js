'use strict';

var fs = require('fs');
var config = {};
var path = require('path');
var fname = '';
var log = null;

var loadConfig = (fname) => {
    try {
        config = JSON.parse(fs.readFileSync(fname, 'utf8'))
    } catch (e) {
        log.error(e);
    }
};

var watchConfig = (fname) => {
    fs.watchFile(fname, function (c, p) {
        log.info('reloading config file: ' + fname);
        applyChanges(config);
        log.info(JSON.stringify(config, null, 4));
    });
};


module.exports = (env, logger) => {
    log = logger;
    fname = path.join(__dirname, env) + '.json';
    loadConfig(fname);
    watchConfig(fname);
    return {
        get: () => {
            return config;
        }
    };
};

