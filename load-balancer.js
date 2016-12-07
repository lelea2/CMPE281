'use strict';

var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

var monkey = require('node-monkey')();
// console.log(monkey);
monkey.attachConsole();

http.createServer(function(req, res) {
  var hostname = req.headers.host.split(':')[0];
  var pathname = url.parse(req.url).pathname;

  // console.log(hostname);
  // console.log(pathname);
  var rand = Math.floor(Math.random() * 3) + 1;

  switch(rand) {
    case 1:
      console.log('Listing to port 8001');
      proxy.web(req, res, { target: 'http://localhost:8001' });
      break;
    case 2:
      console.log('Listing to port 8002');
      proxy.web(req, res, { target: 'http://localhost:8002' });
      break;
    default:
      console.log('Listing to port 8003');
      proxy.web(req, res, { target: 'http://localhost:8003' });
      break;
  }
}).listen(8000, function() {
  console.log('proxy listening on port 8000');
});
