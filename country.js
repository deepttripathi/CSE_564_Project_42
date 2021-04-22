var format = d3.format(",");
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Score: </strong><span class='details'>" + format(d.Score) +"</span>";
            })


var margin = {top: -40, right: 0, bottom: 0, left: 0},
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([0,2,3,4,5,6,7,8,9,10])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

d3.queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.csv, "final.csv")
    .await(ready);



function ready(error, data, csvdata) {

    var options=["Rank","Score","GDP per capita","Social support", "Healthy life expectancy","Freedom to make life choices","Generosity",
    "Perceptions of corruption","Population","Percentage of internet users","percentage of non-religious people"]
    
    d3.select("#menu")
          .selectAll('myOptions')
             .data(options)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; })
    
    // d3.select("#menu").on("change", display )

    console.log(csvdata)
    console.log(data.features[0])
//   var populationById = {};


    // function displayMap(option){

    // }


    var scoreByCountry={};
    csvdata.forEach(function (d)  { scoreByCountry[d.country]=+d.Score; });
    data.features.forEach(function(d) { d.Score = scoreByCountry[d.properties.name] });

//   population.forEach(function(d) { populationById[d.id] = +d.population; });


  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { 
        // console.log("hiii")  
        return color(scoreByCountry[d.properties.name]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3)
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .data(topojson.mesh(data.features, function(a, b) { return a.properties.name !== b.properties.name; }))
      .attr("class", "names")
      .attr("d", path);


    //   function display(){
    //     var selected = d3.select("#menu").property("value");
    //     if (selected == "")

    // }
}


