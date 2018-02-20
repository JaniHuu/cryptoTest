var urls = ['https://api.coinmarketcap.com/v1/ticker/?limit=10',
            'https://poloniex.com/public?command=returnTicker',
            'https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tLTCUSD,tXRPUSD,tIOTUSD'];
var poloUrl = [
   //'https://poloniex.com/public?command=returnTicker',
   'https://poloniex.com/public?command=returnOrderBook&currencyPair=ALL'
  ];

var defData = [];
     
$(document).ready(function() {
    CallHandler(poloUrl);
    //ParseData(`https://api.coinmarketcap.com/v1/ticker/?limit=10`,'first',0);
    //ParseData(`https://api.gdax.com/products/BTC-USD/book`, 'second',1);

    // Eventlisteners
    document.getElementById("submitRippleId").addEventListener("click", function() {
    var id = document.getElementById("rippleId").value;
    GetRippleAccountInfo(id);
    document.getElementById("rippleId").value = "";
    }, false);
});

// Parse data and update corresponding element in html
async function ParseData(url, elementName, exchangeNum){
  var response = await APICall(url);
    var info = document.getElementById(elementName);
    for(var i = 0; i < response.length; i++){
          var para = document.createElement("p");
          if(exchangeNum === 0){
            var textNode = document.createTextNode(response[i].rank+". "+response[i].name+" "+response[i].symbol+" $"+response[i].price_usd);
          }
          else if(exchangeNum === 1){
            console.log(response[i]);
            textNode = document.createTextNode(response[i]);
          }
          para.appendChild(textNode);
          info.appendChild(para);
      }
}

function CallHandler(urlList){
  for(var i = 0; i < urlList.length; i++){
    APICall(urlList[i]).then(res =>parseOrderBook(res));
  }
}

// Asynchronous API call with fetch and await
async function APICall(url){
  var data = await fetch(url).then(function(res){
    return res.json();
  });
  return await data;
}

// Parse data from poloniex, iterate through keys and values
function poloParser(poloniexData){
  var loggerData;
  var keys = Object.keys(poloniexData);
  for(var i = 0; i < keys.length; i++){
    loggerData = (1+i)+". "+keys[i]+": ";
    var altKeys = Object.keys(poloniexData[keys[i]]);
    for(var j = 0; j < altKeys.length; j++){
      loggerData = loggerData + altKeys[j]+": " + poloniexData[keys[i]][altKeys[j]]+", ";
    }
    var info = document.getElementById("first");
    var para = document.createElement("p");
    var textNode = document.createTextNode(loggerData);
    para.appendChild(textNode);
    info.appendChild(para);
    loggerData = null;
  }
}

async function GetRippleAccountInfo(accountId){
    
    var rippleCall = await APICall(`https://data.ripple.com/v2/accounts/`+accountId);
    
    var showData = function(response) {
        console.log(response);
        var info = document.getElementById("third");
        info.innerHTML = "";
        var para = document.createElement("p");
        var textNode = document.createTextNode("\nAccount: "+response.account_data.account+" Balance: "+response.account_data.initial_balance+" xrp");
        para.appendChild(textNode);
        info.appendChild(para);
    };
    showData(rippleCall);
}

function parseOrderBook(book){
  for(var k = 0; k < book.BTC_AMP.asks.length; k++){
    var addition = {price: book.BTC_AMP.asks[k][0], volume: book.BTC_AMP.asks[k][1]};
    defData.push(addition);
  }
  console.log(defData);

  drawChart();
}

function drawChart(){
var chart = new tauCharts.Chart({
            data: defData,
            type: 'bar',
            x: 'price',
            y: 'volume'
        });
chart.renderTo('#bar');
}

  
/*
  Coinbase/GDAX https://api.gdax.com
  Bitstamp https://www.bitstamp.net/api/v2/ticker/{currency_pair}/
  Bitfinex https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tLTCUSD,fUSD
  Bittrex NOPE
  Poloniex https://poloniex.com/public?command=returnTicker
  Binance https://api.binance.com/api/v1/ticker/allPrices

  Bitfinex {
  // on trading pairs (ex. tBTCUSD)
  [
    SYMBOL,
    BID, 
    BID_SIZE, 
    ASK, 
    ASK_SIZE, 
    DAILY_CHANGE, 
    DAILY_CHANGE_PERC, 
    LAST_PRICE, 
    VOLUME, 
    HIGH, 
    LOW
  ]
  }
  
  Bitstamp{
    Supported values for currency_pair: btcusd, btceur, eurusd, xrpusd, xrpeur, xrpbtc, ltcusd, ltceur, ltcbtc, ethusd, etheur, ethbtc, bchusd, bcheur, bchbtc
  }
*/