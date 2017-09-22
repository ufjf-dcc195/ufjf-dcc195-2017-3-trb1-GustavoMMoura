function desenharTabuleiro(linha, coluna) {
	var css = '<style>' +
				'#tabuleiro {border:1px solid #000}' +
	 			'#tabuleiro tr:nth-child(2n+1) td:nth-child(2n+0) {background:gray;}' +
	 			'#tabuleiro tr:nth-child(2n+0) td:nth-child(2n+1) {background:gray;}' +
	 			'#tabuleiro td {border:0; width: 40px; height: 40px; }' +
	 			'#tabuleiro {border-spacing:0px;}' +
	 			'#cavalo, .alcancavel { font-size: 28px; text-align: center; }' +
	 			'#cavalo:after {content: "\\2658";}' + 
	 			'.alcancavel:after {content: "X"; color: darkred; font-family: Arial;}' +
	 			'</style>';
	var tabuleiro = "<table id=tabuleiro >";

	linha = (!linha ? -1 : linha - 1);
	coluna = (!coluna ? -1 : coluna - 1);

	var c = 1;
	for (var i = 0; i < 8; i++) {
		tabuleiro += "<tr>";
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
		c++
		tabuleiro += "</tr>";
	}
	tabuleiro += "</table>";
	return css + tabuleiro;
}

function verificarAlcance(cavalo, linha, coluna) {
	if (((linha === cavalo.linha - 1 || linha === cavalo.linha + 1) && coluna === cavalo.coluna - 2) ||
		((linha === cavalo.linha - 1 || linha === cavalo.linha + 1) && coluna === cavalo.coluna + 2) ||
		((coluna === cavalo.coluna - 1 || coluna === cavalo.coluna + 1) && linha === cavalo.linha - 2) ||
		((coluna === cavalo.coluna - 1 || coluna === cavalo.coluna + 1) && linha === cavalo.linha + 2)) {
		return true;
	}
	return false;
}
exports.desenharTabuleiro = desenharTabuleiro;