var http = require('http'),
    connect = require('connect'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  let app = connect();

  app.use(function (req, res) {
    req.headers.host = target;
    proxy.web(req, res, { target: 'http://' + target});
  });
  app.use(function (req, res) {
    console.log(JSON.stringify(res));
  });
  http.createServer(app).listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
