'use strict';

var strategy = {};

module.exports = (cfg, log) => {
    if (cfg.strategy) {
        strategy = require('./' + cfg.strategy)(cfg, log)
    }
    return strategy;
};
