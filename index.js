var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.index;
handlers["/index.html"] = requestHandlers.index;
handlers["/sobre.html"] = requestHandlers.sobre;
handlers["/aleatorios.html"] = requestHandlers.aleatorios;
handlers["/primos.html"] = requestHandlers.primos;
handlers["/equacao.html"] = requestHandlers.equacao;

server.start(router, handlers);