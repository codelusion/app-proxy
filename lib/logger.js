'use strict';

var winston = require('winston');

module.exports = () => {
    return {
        setLevel: setLevel,
        debug: winston.debug,
        info: winston.info,
        error: winston.error
    }
};

var setLevel = (level) => {
    winston.level = level || 'error';
};

