var http = require("http");
var url = require("url");
var port = process.env.PORT || 3000;
function start(router, handlers) {
	http.createServer(function (request, response) {
		var urlParsed = url.parse(request.url, true);		
		router.route(urlParsed.pathname, handlers, request, response);		
	}).listen(port);
	console.log("Servidor rodando em http://localhost:3000");
}

module.exports.start = start;