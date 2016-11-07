'use strict';

var status = {};
var targets = [];
var getStatus = () => {
    return status;
};

module.exports = (cfg) => {
    targets = cfg.strategy.targets;
    return {
        getStatus: getStatus
    };
};
