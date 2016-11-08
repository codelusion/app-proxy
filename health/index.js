'use strict';
//TODO incomplete
var httpClient = require('./http-client');
var Daemon = require('./Daemon').Daemon;

var status = {};
var targets = [];
var daemons = {};


var getStatus = () => {
    return status;
};

module.exports = (cfg, log) => {
    targets = cfg.targets;
    targets.forEach((target) => {
        daemons[target.name] = new Daemon(()=>{
            client.call(target.getOptions, (err, resp) => {
                    status[target.name] = {err: err, status: resp, time: Date.now() };
            })
        }, target.interval);
    });
    return {
        getStatus: getStatus
    };
};
