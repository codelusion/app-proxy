'use strict';

var strategy = {};

module.exports = (cfg, log) => {
    if (cfg.strategy.name) {
        strategy = require('./' + cfg.strategy.name)(cfg, log)
    }
    return strategy;
};
