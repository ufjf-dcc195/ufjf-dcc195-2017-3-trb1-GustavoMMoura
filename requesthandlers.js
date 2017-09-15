var exec = require("child_process").exec;
var qs = require("querystring");


function index(request, response) {
	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.end();
}

exports.index = index;