var poloUrl = [
   'https://poloniex.com/public?command=returnOrderBook&currencyPair=ALL'
  ];

// Parsed data for plotting
var defData = [];
// Parsed keys from Poloniex order book
var dataKeys = [];
     

$(document).ready(function() {
  CallHandler(poloUrl);
});

// Fire async API call from list
function CallHandler(urlList){
  for(var i = 0; i < urlList.length; i++){
    APICall(urlList[i]).then(res =>parseOrderBook(res,"XRP"));
    //APICall(urlList[i]).then(res =>poloParser(res)); Uncomment for full poloniex orderbook
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
  dataKeys = Object.keys(poloniexData);
  for(var i = 0; i < dataKeys.length; i++){
    loggerData = (1+i)+". "+dataKeys[i]+": ";
    var altKeys = Object.keys(poloniexData[dataKeys[i]]);
    for(var j = 0; j < altKeys.length; j++){
      loggerData = loggerData + altKeys[j]+": " + poloniexData[dataKeys[i]][altKeys[j]]+", ";
    }
    var info = document.getElementById("first");
    var para = document.createElement("p");
    var textNode = document.createTextNode(loggerData);
    para.appendChild(textNode);
    info.appendChild(para);
    loggerData = null;
  }
}

// Parse order book to list and fire drawChart function
function parseOrderBook(book, pair){
  for(var k = 0; k < book.BTC_AMP.asks.length; k++){
    var addition = {price: book.BTC_+pair.asks[k][0], volume: book.BTC_AMP.asks[k][1]};
    defData.push(addition);
  }
  console.log(defData);

  drawChart();
}

// Draw current chart data
function drawChart(){
var chart = new tauCharts.Chart({
            data: defData,
            type: 'bar',
            x: 'price',
            y: 'volume'
        });
chart.renderTo('#bar');
}
