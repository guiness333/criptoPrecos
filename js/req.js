var url = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=BRL','https://api.coinmarketcap.com/v1/ticker/nano/?convert=BRL'];
var index=0;
next(index);
function next(n){
	index += n;
	if(index > url.length){
		index = 0;
	}
	if(index < 0){
		index = url.length;
	}
	get(url[index]);
}


function get(url){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function () {
		var json = request.response;
		writeR(json);
	};
}
function writeR(jsonObj){
	var price = jsonObj[0]['price_usd'];
	var priceBRL = jsonObj[0]['price_brl'];
	var change = jsonObj[0]['percent_change_24h'];
	var name = jsonObj[0]['name'];
	document.getElementById("name").innerHTML = name;
	
	if(change <= 0.00){
		document.getElementById("price").innerHTML = 'Preço USD$: <span class="red">'+price+'</span><br>Preço BRL$: <span class="red">'+priceBRL+'</span>' ;
		document.getElementById("percent_change_24h").innerHTML =  'Mudança %: '+'<span 				class="red">'+change+'</span>' ;
	}else{
		document.getElementById("price").innerHTML = 'Preço USD$: <span class="green">'+price+'</span><br>Preço BRL$: <span class="green">'+priceBRL+'</span>' ;
		document.getElementById("percent_change_24h").innerHTML =  'Mudança %: '+'<span 				class="green"> +'+change+'</span>' ;
	}
}