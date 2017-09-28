function desenharTabuleiro(linha, coluna) {
	var css = '<style>' +
				'#tabuleiro tbody { text-align: center;}' +
	 			'#tabuleiro tbody tr:nth-child(2n+1) td:nth-child(2n+1):not(.row) {background:gray;}' +
	 			'#tabuleiro tbody tr:nth-child(2n+0) td:nth-child(2n+0):not(.row) {background:gray;}' +
	 			'#tabuleiro tbody td:not(.row) {border:1px solid gray; width: 40px; height: 40px; }' +
	 			'#tabuleiro {border-spacing:0px;}' +
	 			'.row {width: 20px; }' +
	 			'th {height: 20px}' +
	 			'#cavalo, .alcancavel { font-size: 28px; }' +
	 			'#cavalo:after {content: "\\2658";}' + 
	 			'.alcancavel:after {content: "X"; color: darkred; font-family: Arial;}' +
	 			'</style>';
	var tabuleiro = "<table id=tabuleiro >" +
	                   "<thead>" +
	                   "<th></th>" +
	                   "<th>A</th>" +
	                   "<th>B</th>" +
	                   "<th>C</th>" +
	                   "<th>D</th>" +
	                   "<th>E</th>" +
	                   "<th>F</th>" +
	                   "<th>G</th>" +
	                   "<th>H</th>" +
	                   "</tr></thead>" +
	                   "<tbody>";

	linha = (!linha ? -1 : linha);
	coluna = (!coluna ? -1 : coluna);

	var c = 1;
	for (var i = 0; i < 8; i++) {
	    tabuleiro += "<tr><td class=row  ><b>" + (8 - i) + "</b></td>";
		for (var j = 0; j < 8; j++) {
			tabuleiro += "<td";
			if (i === linha && j == coluna) {
				tabuleiro += " id=cavalo ";
			}
			if (linha >= 0 && coluna >= 0 && verificarAlcance({linha:linha, coluna:coluna}, i, j)) {
				tabuleiro += " class=alcancavel ";
			}
			tabuleiro+= "></td>";
			c++;
		}
		c++;
		tabuleiro += "</tr>";
	}
	tabuleiro += "</tbody></table>";
	return css + tabuleiro;
}
exports.desenharTabuleiro = desenharTabuleiro;

function verificarAlcance(cavalo, linha, coluna) {
	if (((linha === cavalo.linha - 1 || linha === cavalo.linha + 1) && coluna === cavalo.coluna - 2) ||
		((linha === cavalo.linha - 1 || linha === cavalo.linha + 1) && coluna === cavalo.coluna + 2) ||
		((coluna === cavalo.coluna - 1 || coluna === cavalo.coluna + 1) && linha === cavalo.linha - 2) ||
		((coluna === cavalo.coluna - 1 || coluna === cavalo.coluna + 1) && linha === cavalo.linha + 2)) {
		return true;
	}
	return false;
}

function getJsonResponse(linha, coluna) {
    var json = {};
    json.alcancaveis = [];
    var colunas = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var casa;
    
    casa = colunas[coluna] + (8 - linha);
    json.cavalo = casa;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (verificarAlcance({linha:linha, coluna:coluna}, i, j)) {
                casa = colunas[j] + (8 - i);
                json.alcancaveis.push(casa);
            }
        }
    }
    return json;
}
exports.getJsonResponse = getJsonResponse;