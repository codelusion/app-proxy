var http = require('http');
const os = require('os');
var process = require('process');
const PORT = process.env.PORT || 8080;

var server = http.createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        console.log('Request : ' + req.url + ' received.')
        res.end(
            JSON.stringify(
                {
                    time: new Date(),
                    from: 'Anduril',
                    url: req.url,
                    id: Math.random(),
                    // 'os.arch' : os.arch(),
                    // 'os.cpus': os.cpus(),
                    'os.freemem': os.freemem(),
                    'os.loadavg': os.loadavg(),
                    'port': PORT
                }
            )
        );
    }
).listen(PORT);

console.log("server listening on port: " + PORT);

