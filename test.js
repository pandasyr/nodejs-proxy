var http = require('http'),
    express = require('express'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  let app = express();

  app.use(function (req, res, next) {
    req.headers.host = target;
    proxy.web(req, res, { target: 'http://' + target});
    next();
  });
  app.use(function (req, res, next) {
    console.log(JSON.stringify(res));
    next();
  });
  app.listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
