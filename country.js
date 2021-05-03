var format = d3.format(",");
var selected_feature;
var dataUrl;

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
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(100)
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
        displayMap(selected_feature)    
    } )

    async function displayMap(feature){

      dataUrl=url
      dataUrl+=feature
      colorUrl=colorScale+feature
      console.log(colorUrl)

      var csvdata=await getJson(dataUrl);  
      var colordata=await getJson(colorUrl);
      
        var optionByCountry={};
        var colorVal={};
        
        csvdata.forEach(function (d)  { 
          optionByCountry[d.iso]=+d[feature]; 
        });

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
        });

  svg.append("path")
      .data(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

        
    }
}


