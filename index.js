var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.index;
handlers["/index.html"] = requestHandlers.index;
handlers["/sobre.html"] = requestHandlers.sobre;

server.start(router, handlers);