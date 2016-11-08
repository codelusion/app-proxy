'use strict';
var http = require('http'),
    httpProxy = require('http-proxy'),
    log = require('./lib/logger')(),
    util = require('./lib/util'),

//TODO: setup env
    config = require('./config')('dev', log),

//TODO: validate config (jsonSchema)?
    cfg = config.getCurrent(),
    PROXY_PORT = cfg.proxyPort,

//TODO: health checks incomplete
    health = require('./health')(cfg, log),

//TODO: DESIGN - Create base class for Strategy objects to extend?
//TODO: Strategy should validate config
    strategy = require('./strategy')(cfg, log);

//TODO: perform initial setup checks and fail hard on errors

var proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
    var cfg = config.getCurrent();
    log.setLevel(cfg.logLevel);
    log.info(cfg);
    var target = strategy.selectTarget(cfg, health.getStatus(), req, log);
    if (!target) {
        //TODO Error processing or log and continue
    }
    proxy.web(req, res, {target: target}, (e) => {
        log.error(e);
        //TODO: properly format request object
        //TODO: dump config and health details to error log
        log.error('Request:' + util.formatRequest(req));
    });
}).listen(PROXY_PORT);


log.info('app-proxy: pid(%j) listening on port(%j)', process.pid, PROXY_PORT);
