'use strict';

var http = require('http');

var processRequest = function(response, callback) {
    var str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        callback(null, str);
    });

    response.on('error', function (e) {
        callback(e, str);
    });

};

module.exports.call = (options, callback) => {
    http.request(options, (response) => {
        processRequest(response, callback)
    }).end();
};

