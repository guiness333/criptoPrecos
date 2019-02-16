var coins = new Array();
var index = 0;
var url = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/nano/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=BRL'];
for(var i=0;i<url.length;i++){
	get(url[i]);
}



function get(url){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		var json = request.response;
		
		coins.push(json);
		putHTML(coins, index);
		index++;
	};
}

function putHTML(jsonObj, index){
	var row = document.createElement("div");
	row.className = "row";
	var row2 = document.createElement("div");
	row2.className = "row";
	var col4 = document.createElement("div");
	col4.className = "column column-4 format";
	var col4_1 = document.createElement("div");
	col4_1.className = "column column-4";
	var col4_2 = document.createElement("div");
	col4_2.className = "column column-4";
	var p1 = document.createElement("p");
	p1.id = "price";
	p1.innerHTML = "Preço: ";
	var p2 = document.createElement("p");
	p2.id = "percent_change_24h";
	p2.innerHTML = "Mudança: ";
	var nome = document.createElement("div");
	nome.className = "column column-12 format";
	
	var h1 = document.createElement("h1");
	var name = document.createTextNode(jsonObj[index][0]['name']);
	var preco = document.createTextNode(jsonObj[index][0]['price_usd']);
	var change = document.createTextNode(jsonObj[index][0]['percent_change_24h']);
	if(jsonObj[index][0]['percent_change_24h'] < 0.0){
		p1.className = "red";
		p2.className = "red";
	}else{
		p1.className = "green";
		p2.className = "green";
	}
	
	col4_1.innerHTML = "&nbsp";
	col4_2.innerHTML = "&nbsp";
	row.appendChild(nome);
	row2.appendChild(col4_1);
	row2.appendChild(col4);
	row2.appendChild(col4_2);
	col4.appendChild(p1);
	col4.appendChild(p2);
	nome.appendChild(h1);
	
	h1.appendChild(name);
	p1.appendChild(preco);
	p2.appendChild(change);
	document.getElementById("cryp").appendChild(row);
	document.getElementById("cryp").appendChild(row2);
	
	
	
	
	
	
	
	
}

