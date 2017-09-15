var exec = require("child_process").exec;
var qs = require("querystring");


function index(request, response) {
	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.write("<p><h4>Menu</h4></p>");
	response.write("<p>");
	response.write('<a href="/aleatorios.html">Aleatórios</a></br>');
	response.write('<a href="/sobre.html">Sobre</a>');
	response.write("</p>");
	response.end();
}
exports.index = index;

function sobre(request, response) {
	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.write("<p>");
	response.write("Gustavo Magalhaães Moura</br>");
	response.write("201235015</br>");
	response.write("gmmoura@ice.ufjf.br</br>");
	response.write("Ciência da Computação</br>");
	response.write("</p>");	
	response.write("<p>");
	response.write('<a href="/index.html">Voltar</a>');
	response.write("</p>");
	response.end();
}
exports.sobre = sobre;

function aleatorios(request, response) {
	var rnd, i;
	var even = "Lista de pares: ", odd = "Lista de ímpares: ";
	for (i = 0; i < 100; i++) {
		rnd = Math.floor((Math.random() * 1000) + 1);
		if (rnd % 2 === 0) {
			even += rnd + ", ";
		} else {
			odd += rnd + ", ";
		}
	}

	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.write("<p>");
	response.write(even.substring(0, even.length - 2) + "</br>");
	response.write(odd.substring(0, odd.length - 2) + "</br>");
	response.write("</p>");	
	response.write("<p>");
	response.write('<a href="/index.html">Voltar</a>');
	response.write("</p>");
	response.end();
}
exports.aleatorios = aleatorios;