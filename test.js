var replace = require('stream-replace');
var web_o = Object.values(require('http-proxy/lib/http-proxy/passes/web-outgoing'));

var http = require('http'),
    inspect = require('util').inspect,
    express = require('express'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({followRedirects: true});

function create(target, port) {
  let app = express();

  app.use(function (req, res, next) {
    req.headers.host = target;
    const options = { target: 'http://' + target, selfHandleResponse: true, followRedirects: true};
    proxy.web(req, res, options);
    proxy.on('proxyRes', function (proxyRes, req, res) {
        // https://github.com/http-party/node-http-proxy/issues/1263
        for(var i=0; i < web_o.length; i++) {
          if(web_o[i](req, res, proxyRes, options)) { break; }
        }
        //var body = new Buffer('');
        //proxyRes.on('data', data => body = Buffer.concat([body, data]));
        //proxyRes.on('end', () => {
            //body = body.toString();
            //body.replace(new RegExp('http://' + target + '/', 'g'), '/');
            //body.replace(new RegExp('https://' + target + '/', 'g'), '/');
            //res.send(body);
        //})
        proxyRes
        //   .pipe(replace('1234543', '1234543'))
           //.pipe(replace(new RegExp('http://' + target + '/', 'g'), '/'))
           //.pipe(replace(new RegExp('https://' + target + '/', 'g'), 'https://' + target + '/'))
           .pipe(res);
    });
  });
  app.listen(port);
}

create('www.google.com', 6050);
create('forums.huaren.us', 6051);
create('www.backchina.com', 6052);
