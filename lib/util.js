'use strict';

module.exports.formatRequest = (obj) => {
    var res = {};
    var keys = ['headers', 'httpVersion', 'method', 'statusCode', 'statusMessage', 'url'];
    var len = keys.length;
    var idx = -1;

    while (++idx < len) {
        var key = keys[idx];
        if (key in obj) {
            res[key] = obj[key];
        }
    }
    return JSON.stringify(res, null, 4);
};


