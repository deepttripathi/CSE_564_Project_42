// import { abc } from './d3-tip.js'
import './styles.css';
var format = d3.format(",");
var selected_feature;
var dataUrl;
var country;

var url="http://127.0.0.1:5000/get_map_data/"
var colorScale="http://127.0.0.1:5000/get_color_map/"

async function getJson(dataUrl){
    var response = await fetch(dataUrl,
      {
        method: "GET",
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
        }
    });
    return await response.json();
}

// var s = d3.tip
// console.log(s)

 var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d,name) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>"+ name +": </strong><span class='details'>" + format(d[name]) +"</span>";
            })

var margin = {top: -40, right: 0, bottom: 0, left: 0},
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([1,2,3,4,5,6,7,8,9,10])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);


var path = d3.geoPath();

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(290,20)")
            .append('g')
            .attr('class', 'map')
            .attr("transform", "translate(100,20)")
            ;

var projection = d3.geoMercator()
                   .scale(80)
                  .translate( [width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

d3.queue()
    .defer(d3.json, "world_countries.json")
    .await(ready);

async function ready(error, data) {

    var options=["Score","Overall rank","GDP per capita","Social support", "Healthy life expectancy","Freedom to make life choices","Generosity",
    "Perceptions of corruption","Population","Percentage","percentage_non_religious"]
    
    d3.select("#menu")
          .selectAll('myOptions')
            .data(options)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; })
    
        displayMap("Score")

    d3.select("#menu").on("change", function(){
        selected_feature=d3.select("#menu").property("value");
        // console.log(selected_feature)
        displayMap(selected_feature)    
    } )

    async function displayMap(feature){

      dataUrl=url
      dataUrl+=feature
      colorUrl=colorScale+feature
      // console.log(colorUrl)

      var csvdata=await getJson(dataUrl);  
      console.log(csvdata)
      var colordata=await getJson(colorUrl);
      
        var optionByCountry={};
        var colorVal={};
        
        csvdata.forEach(function (d)  { 
          optionByCountry[d.iso]=+d[feature]; 
        });

        max=0
        function getMaxVal() {
          return csvdata.reduce((max, p) => +p[feature] > max ? +p[feature]: max, csvdata[0][feature]);
        }
        maxVal=getMaxVal()

        min=-2
        function getMinVal() {
          return csvdata.reduce((min, p) => +p[feature] < min ? +p[feature]: min, csvdata[0][feature]);
        }
        minVal=getMinVal()

        range=(maxVal/10)
        
        var i;
        var label=[]
        xmin=minVal
        range=range.toFixed(2)
        for (i = 0; i < 10; i++) { 
          xmin=Number(xmin).toFixed(2)
          newrange=(Number(xmin)+Number(range)).toFixed(2)
          label[i]=((xmin).toString())+"-"+(newrange.toString());
          xmin=newrange
        }
        
        if(document.getElementById("legend"))
        document.getElementById("legend").remove();

        //adding legend
        var g = svg.append("g")
        .attr("class", "legendThreshold")
        .attr("transform", "translate(5,320)");
        g.append("text")
        .attr("class", "caption")
        .attr("id","legend")
        .attr("x", 0)
        .attr("y", -10)
        .text(function (d){
          return feature;
        });

        var legend = d3.legendColor()
        .labels(function (d) { return label[d.i]; })
        .shapePadding(4)
        .scale(color);
        svg.select(".legendThreshold")
        .call(legend);

        colordata.forEach(function (d)  { 
          colorVal[d.iso]=d[feature+"_scaled"]; 
        });

        console.log(colorVal)
        data.features.forEach(function(d) { d[feature] = optionByCountry[d.id] });
        svg.append("g")
          .attr("class", "countries")
        .selectAll("path")
          .data(data.features)
          .enter().append("path")
          .attr("d", path)
            .style("fill", function(d) { 
              return color(colorVal[d.id]); })
            .style('stroke', 'white')
            .style('stroke-width', 1.5)
            .style("opacity",0.8)
      // tooltips
            .style("stroke","white")
          .style('stroke-width', 0.3)
        .on('mouseover',function(d){

            tip.show(d,feature);
          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3)
        })
        .on('mouseout', function(d){
            tip.hide(d,feature);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        })
        .on('click', function(d){
          console.log(d.properties.name); 
          country= d.properties.name;
          // drawBarChart(d.properties.name)
          drawRadarPlot(d.properties.name); //print selected country name
        });

  svg.append("path")
      .data(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);  
    }


}

