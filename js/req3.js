var coins = new Array();
var index = 0;
var url = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/nano/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/cardano/?convert=BRL'];

for(var i =0;i<url.length;i++){
	get(url[i]);
}



function get(url){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		var json = request.response;
		if(json['error'] != 'id not found'){
			coins.push(json);
			putHTML(coins, index);
			index++;
		}else{
			console.log("Moeda nao existe, ou vc escreveu errado!!!");
		}
	};
}
function rnd(){
	return (Math.random()*100)+	'110';
}

function putHTML(jsonObj, index){
	var row = document.createElement("div");
	row.className = "column column-4 format color";
	row.style.backgroundColor = 'rgb(' + [rnd(),rnd(),rnd()].join(',') + ')';
	var p1 = document.createElement("p");
	p1.id = "price";
	p1.innerHTML = "Preço: ";
	var p2 = document.createElement("p");
	p2.id = "percent_change_24h";
	
	
	var h1 = document.createElement("h1");
	var name = document.createTextNode(jsonObj[index][0]['name']);
	var price = parseFloat(jsonObj[index][0]['price_brl']);
	var preco = document.createTextNode(price.toFixed(2));
	var change = document.createTextNode(jsonObj[index][0]['percent_change_24h']+'%');
	if(jsonObj[index][0]['percent_change_24h'] < 0.0){
		p1.className = "red";
		p2.className = "red";
		p2.innerHTML = "Mudança: "
	}else{
		p1.className = "green";
		p2.className = "green";
		p2.innerHTML = "Mudança: +";
	}
	row.appendChild(h1);
	row.appendChild(h1);
	row.appendChild(p1);
	row.appendChild(p2);
	h1.appendChild(name);
	p1.appendChild(preco);
	p2.appendChild(change);
	document.getElementById("cryp").appendChild(row);	
}

function exist(arr,str){
	for(var i =0;i<arr.length;i++){
		if(arr[i]==str){
			return true;
		}
	}
	return false;
}

function add(){
	var valor = document.getElementById("find").value;
	valor = valor.replace(' ','-');
	if(valor == "" || exist(url,"https://api.coinmarketcap.com/v1/ticker/"+valor+"/?convert=BRL")){
		console.log("escreva alguma coisa ou o valor já existe!!!");
	}else{
		url.push("https://api.coinmarketcap.com/v1/ticker/"+valor+"/?convert=BRL");
		get(url[url.length-1]);
	}
}