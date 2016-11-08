'use strict';

var counter = 0;
var config = null;

var selectTarget = (cfg, healthStatus, req, log) => {
    config = cfg;
    var targets = healthStatus;
    if (targets.length > 0) {
        if (counter >= targets.length) {
            counter = 0;
        }
        var target = targets[counter];
        counter += 1;
        return target;
    } else {
        throw new Error('Missing proxy targets');
    }
};

module.exports = (cfg, log) => {
    config = cfg;
    return {
        selectTarget: selectTarget
    }
};

