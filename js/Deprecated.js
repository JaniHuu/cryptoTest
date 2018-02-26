/*
  Coinbase/GDAX https://api.gdax.com
  Bitstamp https://www.bitstamp.net/api/v2/ticker/{currency_pair}/
  Bitfinex https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tLTCUSD,fUSD
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
  
  var urls = ['https://api.coinmarketcap.com/v1/ticker/?limit=10',
            'https://poloniex.com/public?command=returnTicker',
            'https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tLTCUSD,tXRPUSD,tIOTUSD'];
            
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

// Parse data and update corresponding element in html, not valid for poloniex
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

// Fetch account data from ripple API, contains accounts information in ledger
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


// Random parser code

var cmcUrl = ['https://api.coinmarketcap.com/v1/ticker/?limit=0'];
var nameList = [];
var jsonList = [];

  for(var key in dataKeys){
    var tmp = String(dataKeys[key]);
    if(tmp.charAt(0) === "B"){
          for(var name in nameList){
            if(String(nameList[name].symbol) ===  tmp.slice(4,tmp.length)){
              jsonList.push(nameList[name]);
            }
          }
    }
  }
  
  function currencyParser(currencyNames){
  for (var cur in currencyNames){
    var temp = {name: currencyNames[cur].name, symbol: currencyNames[cur].symbol};
    nameList.push(temp);
  }
}

*/