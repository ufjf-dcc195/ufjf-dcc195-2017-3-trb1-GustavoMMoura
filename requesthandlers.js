function index(request, response) {
	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.write("<p><h4>Menu</h4></p>");
	response.write("<p>");
	response.write('<a href="/aleatorios.html">Aleatórios</a></br>');
	response.write('<a href="/primos.html">Primos</a></br>');
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

function primos(request, response) {
	var N1, N2;
	var url = require('url');
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	if (!query.N1 || !query.N2) {
		response.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		response.write("<p>");
		response.write("Parâmetros ausentes ou inválidos.");
		response.write("</p>");
	} else if (!Number.isInteger(parseInt(query.N1)) || !Number.isInteger(parseInt(query.N2))) {
		response.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		response.write("<p>");
		response.write("Parâmetros devem ser números inteiros, sendo N1 < N2 < 100.");
		response.write("</p>");
	} else if (!(parseInt(query.N1) < parseInt(query.N2) && parseInt(query.N2) < 100)) {
		response.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		response.write("<p>");
		response.write("Parâmetros devem ser números inteiros, sendo N1 < N2 < 100.");
		response.write("</p>");
	} else {
		N1 = parseInt(query.N1);
		N2 = parseInt(query.N2);
		var primes = [];
		var prime;
		for (i = N1; i <= N2; i++) {
			prime = true;
			for (j = 2; j <= i/2; j++) {
				if (i % j === 0) {
					prime = false;
					break;
				}
			}
			if (prime && i > 1) {
				primes.push(i);
			}
		}
		var reg = new RegExp(',', 'g');
		response.writeHead(202, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		response.write("<p>");
		if (primes.length === 0) {
			response.write("Não foram encontrados números primos entre " + N1 + " e " + N2 + ".");
		} else {
			response.write("Lista de números primos entre " + N1 + " e " + N2 + ", inclusive:</br>");
			response.write(primes.join().replace(reg, ", "));
		}
		response.write("</p>");
	}
	response.end();
}

exports.primos = primos;