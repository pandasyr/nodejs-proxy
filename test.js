var replace = require('stream-replace');

var http = require('http'),
    inspect = require('util').inspect,
    express = require('express'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  let app = express();

  app.use(function (req, res, next) {
    req.headers.host = target;
    proxy.web(req, res, { target: 'http://' + target, selfHandleResponse: true, followRedirects: true});
    proxy.on('proxyRes', function (proxyRes, req, res) {
        //var body = new Buffer('');
        //proxyRes.on('data', data => body = Buffer.concat([body, data]));
        //proxyRes.on('end', () => {
        //    body = body.toString('UTF-8');
        //    body.replace(new RegExp('http://' + target + '/', 'g'), '/');
        //    body.replace(new RegExp('https://' + target + '/', 'g'), '/');
        //    res.write(body);
        //})
        proxyRes
           // .pipe(replace(new RegExp('http://' + target + '/', 'g'), '/'))
           // .pipe(replace(new RegExp('https://' + target + '/', 'g'), '/'))
           .pipe(res);
    });
  });
  app.listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
create('www.backchina.com', 6052);
