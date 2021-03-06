var defData = [{
  type:'us', count:0, date:'12-2013'
},{
  type:'us', count:10, date:'01-2014'
},{
  type:'us', count:15, date:'02-2014'
},{
  type:'us', count:12, date:'03-2014'
},{
  type:'us', count:16, date:'04-2014'
},{
  type:'us', count:13, date:'05-2014'
},{
  type:'bug', count:21, date:'01-2014'
},{
  type:'bug', count:19, date:'02-2014'
},{
  type:'bug', count:23, date:'03-2014'
},{
  type:'bug', count:26, date:'04-2014'
},{
  type:'bug', count:23, date:'05-2014'
}];
var chart = new tauCharts.Chart({
            guide:{
              padding:{l:70, t:10, b:70,r:10},
              showGridLines:'xy',
              color:{
                brewer:{
                  us:'color-us',
                  bug:'color-bug'
                }
              },
              y:{
                label:'Count'
              },
              x:{
                label:'Month'
              }
            },
            data: defData,
            type: 'line',           
            x: 'date',
            y: 'count',
            color: 'type'
        });

  chart.renderTo('#line');
