'use strict';
var http = require('http'),
    httpProxy = require('http-proxy'),
    log = require('./lib/logger')(),
    util = require('./lib/util'),
//TODO: setup env
    config = require('./config')('dev', log),
    cfg = config.get(),
    PROXY_PORT = cfg.proxyPort,
//TODO: health checks incomplete
    health = require('./health')(cfg, log),
    strategy = require('./strategy')(cfg, log),
    proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
    var cfg = config.get();
    log.setLevel(cfg.logLevel);
    var target = strategy.selectTarget(cfg, health.getStatus(), req, log);
    proxy.web(req, res, {target: target}, (e) => {
        log.error(e);
        //TODO: properly format request object
        //TODO: dump config and health details to error log
        log.error('Request:' + util.formatRequest(req));
    });
}).listen(PROXY_PORT);


log.info('app-proxy: pid(%j) listening on port(%j)', process.pid, PROXY_PORT);
