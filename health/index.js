'use strict';
//TODO incomplete
var httpClient = require('../lib/http-client');

var status = {};
var settings = {};
var targets = [];


var healthCheck = (url) => {

};

var getStatus = () => {
    return status;
};

module.exports = (cfg) => {
    targets = cfg.targets;
    settings = cfg.health;
    return {
        getStatus: getStatus
    };
};
