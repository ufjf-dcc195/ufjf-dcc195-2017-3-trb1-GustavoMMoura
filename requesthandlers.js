var qs = require("querystring");
var tabuleiro = require("./tabuleiro");

function index(request, response) {
	response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
	response.write("<h2>DCC195 - Trabalho 1</h2>");
	response.write("<p><h4>Menu</h4></p>");
	response.write("<p>");
	response.write('<a href="/aleatorios.html">Aleatórios</a></br>');
	response.write('<a href="/primos.html">Primos</a></br>');
	response.write('<a href="/equacao.html">Equação</a></br>');
	response.write('<a href="/xadrez.html">Xadrez</a></br>');
	response.write('<a href="/xadrez.json">Xadrez Json</a></br>');
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
		response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
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
	response.write("<p>");
	response.write('<a href="/index.html">Voltar</a>');
	response.write("</p>");
	response.end();
}
exports.primos = primos;

function raizes(a, b, c) {
	var delta = b*b - 4*a*c;
	if (delta < 0) {
		return " não tem raízes reais";
	} else if (delta === 0) {
		return " possui uma única raiz real igual a " + -b/(2 * a);
	} else {
		var r1 = (-b + Math.sqrt(delta)) / (2 * a);
		var r2 = (-b - Math.sqrt(delta)) / (2 * a);
		return " com raízes reais " + r1 + " e " + r2 + ".";
	}
}

function equacao(request, response) {
	var body = '';
	request.on('data', function(data)  {
		body += data;
	});		
	request.on('end', function(data)  {
		var dados = qs.parse(body);			
		var a = parseInt(dados.a);
		var b = parseInt(dados.b);
		var c = parseInt(dados.c);
		var resp = "Equação: ";
		response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		if(request.method == "POST") {
			if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0) {
				response.write("<div>Termos inválidos.</div>");
			} else {
				resp += (a === 1 ? "" : a) + "x<sup>2</sup>";
				resp += (b === 0 ? "" : ((b < 0 ? " - " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x"));
				resp += (c === 0 ? "" : ((c < 0 ? " - " : " + ") + Math.abs(c))) + " = 0";
				response.write("<div>" + resp + raizes(a, b, c) + "</div>");
			}
		}
		response.write("<p>");
		response.write("Insira os termos da equação: ax<sup>2</sup> + bx + c = 0");
		response.write("<form method=post >");
		response.write("a: <input type=number name=a /></br>");
		response.write("b: <input type=number name=b /></br>");
		response.write("c: <input type=number name=c /></br>");
		response.write("<input type=submit />");
		response.write("</form>");
		response.write("</p>");
		response.write("<p>");
		response.write('<a href="/index.html">Voltar</a>');
		response.write("</p>");
		response.end();
	});
}
exports.equacao = equacao;

function xadrez(request, response) {
	var body = '';
	request.on('data', function(data)  {
		body += data;
	});		
	request.on('end', function(data)  {
		var dados = qs.parse(body);			
		var linha = parseInt(dados.linha);
		var coluna = parseInt(dados.coluna);
		
		response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
		response.write("<h2>DCC195 - Trabalho 1</h2>");
		response.write("<form method=post >");
		response.write("<table>");
		response.write("<tr><td>Coluna:</td><td><select type=number name=coluna  />");
		response.write("<option value=0 >A</option>");
		response.write("<option value=1 >B</option>");
		response.write("<option value=2 >C</option>");
		response.write("<option value=3 >D</option>");
		response.write("<option value=4 >E</option>");
		response.write("<option value=5 >F</option>");
		response.write("<option value=6 >G</option>");
		response.write("<option value=7 >H</option>");
		response.write("</select></td></tr>");
		response.write("<tr><td>Linha:</td><td><select type=number name=linha  />");
		response.write("<option value=0 >8</option>");
		response.write("<option value=1 >7</option>");
		response.write("<option value=2 >6</option>");
		response.write("<option value=3 >5</option>");
		response.write("<option value=4 >4</option>");
		response.write("<option value=5 >3</option>");
		response.write("<option value=6 >2</option>");
		response.write("<option value=7 >1</option>");
		response.write("</select></td></tr>");
		response.write("</table>");
		response.write("<input type=submit />");
		response.write("</form>");

		if(request.method == "POST" && (isNaN(linha) || isNaN(coluna))) {
			response.write("<p>Valores inválidos.</p>");
		}
		response.write(tabuleiro.desenharTabuleiro(linha, coluna));
		response.write("<p>");
		response.write('<a href="/index.html">Voltar</a>');
		response.write("</p>");
		response.end();
	});
}
exports.xadrez = xadrez;


function xadrezJason(request, response) {
    var body = '';
	request.on('data', function(data)  {
		body += data;
	});		
	request.on('end', function(data)  {
		var dados = qs.parse(body);			
		var linha = parseInt(dados.linha);
		var coluna = parseInt(dados.coluna);
		if(request.method == "GET" || (request.method == "POST" && isNaN(linha) || isNaN(coluna))) {
		    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
		    response.write("<h2>DCC195 - Trabalho 1</h2>");
			response.write("<form method=post >");
			response.write("<table>");
			response.write("<tr><td>Coluna:</td><td><select type=number name=coluna  />");
			response.write("<option value=0 >A</option>");
			response.write("<option value=1 >B</option>");
			response.write("<option value=2 >C</option>");
			response.write("<option value=3 >D</option>");
			response.write("<option value=4 >E</option>");
			response.write("<option value=5 >F</option>");
			response.write("<option value=6 >G</option>");
			response.write("<option value=7 >H</option>");
			response.write("</select></td></tr>");
			response.write("<tr><td>Linha:</td><td><select type=number name=linha  />");
			response.write("<option value=0 >8</option>");
			response.write("<option value=1 >7</option>");
			response.write("<option value=2 >6</option>");
			response.write("<option value=3 >5</option>");
			response.write("<option value=4 >4</option>");
			response.write("<option value=5 >3</option>");
			response.write("<option value=6 >2</option>");
			response.write("<option value=7 >1</option>");
			response.write("</select></td></tr>");
			response.write("</table>");
			response.write("<input type=submit />");
			response.write("</form>");
		    if(request.method == "POST" && (isNaN(linha) || isNaN(coluna))) {
    			response.write("<p>Valores inválidos.</p>");
		    }
			response.write(tabuleiro.desenharTabuleiro());
		    response.write("<p>");
		    response.write('<a href="/index.html">Voltar</a>');
		    response.write("</p>");
			response.end();
		} else {
		    response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(tabuleiro.getJsonResponse(linha, coluna)));
		}
	});
}
exports.xadrezJason = xadrezJason;