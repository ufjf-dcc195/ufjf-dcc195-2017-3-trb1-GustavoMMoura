function route(pathname, handlers, request, response) {
	if (handlers[pathname]) {
		handlers[pathname](request, response);
	}
}

exports.route = route;
