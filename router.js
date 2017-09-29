function route(pathname, handlers, request, response) {
	if (handlers[pathname]) {
		handlers[pathname](request, response);
	} else {
		response.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h1>Página não encontrada</h1>");
		response.end();
	}
}

exports.route = route;
