var http = require('http'),
    inspect = require('util').inspect,
    express = require('express'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  let app = express();

  app.use(function (req, res, next) {
    req.headers.host = target;
    res._send_ = res.send;
    res.send = function(body) {
      body = body.replace(new RegExp('http://' + target + '/',"g"), '/');
      body = body.replace(new RegExp('https://' + target + '/',"g"), '/');
      res._send_(body);
    }
    proxy.web(req, res, { target: 'http://' + target, selfHandleResponse: false, followRedirects: true});
    proxy.on('proxyRes', function (proxyRes, req, res) {
      console.log('RAW Response from the target', inspect(proxyRes));
    });
  });
  app.listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
create('www.backchina.com', 6052);
