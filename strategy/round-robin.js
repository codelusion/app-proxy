'use strict';

var counter = 0;

var selectTarget = (cfg, health, req, log) => {
    var targets = cfg.targets;
    if (targets.length > 0) {
        if (counter >= targets.length) {
            counter = 0;
        }
        var target = targets[counter];
        counter += 1;
        return target;
    } else {
        return new Error('Missing proxy targets');
    }
};

module.exports = (cfg, log) => {
    return {
        selectTarget: selectTarget
    }
};

