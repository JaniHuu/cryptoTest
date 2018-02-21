var poloUrl = [
   'https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1483228800&end=9999999999&period=900'
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
    APICall(urlList[i]).then(res =>poloParser(res));
  }
}

// Asynchronous API call with fetch and await
async function APICall(url){
  var data = await fetch(url).then(function(res){
    return res.json();
  });
  return await data;
}

// Parse chart data to list and fire drawChart function
function parseOrderBook(chartData){
  for(var k = 0; k < chartData.length; k++){
    var addition = {time: chartData[k].date, price: chartData[k].close};
    defData.push(addition);
    console.log('O');
  }
  console.log(defData);

  drawChart();
}

// Draw current chart data
function drawChart(){
var chart = new tauCharts.Chart({
            data: defData,
            type: 'bar',
            x: 'time',
            y: 'price'
        });
chart.renderTo('#bar');
}