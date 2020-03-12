import stringReplaceStream from 'string-replace-stream';

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
        proxyRes
            .pipe(stringReplaceStream('http://' + target + '/', '/'))
            .pipe(stringReplaceStream('https://' + target + '/', '/'))
            .pip(res);
    });
  });
  app.listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
create('www.backchina.com', 6052);
