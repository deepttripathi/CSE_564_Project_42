import React, { useRef, useEffect } from "react"
// import * as d3Module from "d3"
import d3 from "./d3-tip-example"
import * as topojson from "topojson"
import data from './world_countries.json'
// import * as d3legend from "./d3-legend";
import {event, zoom as zoomM} from 'd3'
const format = d3.format(",")

// const d3 = {
//   ...d3Module,

// }
export default function CountryMap({ mapData, colorMap, feature, setRadialCountry }) {
  const svgRef = useRef()

  useEffect(async () => {
    console.log('Feature:', feature)

    displayMap(mapData, colorMap, feature)
  }, [mapData, colorMap,feature])



  // d3.select("#menu").on("change", function(){
  //     selected_feature=d3.select("#menu").property("value");
  //     // console.log(selected_feature)
  //     displayMap(selected_feature) })



  async function displayMap(mapData, colorMap, feature) {

    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d, name) {
        return `<strong>Country: </strong><span class='details'> ${d.properties.name} <br></span><strong>${name}: </strong><span class='details'> ${format(d[name])}</span>`;
      })

    const margin = { top: 0, right: 0, bottom: 0, left: 0 }
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const color = d3.scaleThreshold()
      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"])

    

    // var options = ["Score", "Overall rank", "GDP per capita", "Social support", "Healthy life expectancy", "Freedom to make life choices", "Generosity",
    //   "Perceptions of corruption", "Population", "Percentage", "percentage_non_religious"]
    const svg = d3.select(svgRef.current)


    svg.selectAll("*").remove();

    svg.attr('class', 'map')
      .attr('id', 'worldmap')
      .append('g')

      // const width = +svg.attr('width')
      // const height = +svg.attr('height')
    


    // d3.select('.list')
    //   .selectAll('myOptions')
    //   .data(options)
    //   .enter()
    //   .append('option')
    //   .text(function (d) { return d; }) // text showed in the menu
    //   .attr("value", function (d) { return d; })

    const projection = d3.geoMercator()
      .scale(82)
      .translate([width / 2.5, 230])

    const path = d3.geoPath()
      .projection(projection)

    svg.call(tip)

    var optionByCountry = {};
    var colorVal = {};

    console.log('percentage',mapData)
    
    mapData.forEach(function (d) {
      if (feature == 'Percentage'){
        optionByCountry[d.iso] = d[feature];
      }
      else
        optionByCountry[d.iso] = +d[feature];
    });

    // var max=0
    // function getMaxVal() {
    //   return mapData.reduce((max, p) => +p[feature] > max ? +p[feature]: max, mapData[0][feature]);
    // }
    // var maxVal=getMaxVal()

    // var min=-2
    // function getMinVal() {
    //   return mapData.reduce((min, p) => +p[feature] < min ? +p[feature]: min, mapData[0][feature]);
    // }
    // var minVal=getMinVal()

    // var range=(maxVal/10)

    // var i;
    // var label=[]
    // var xmin=minVal
    // range=range.toFixed(2)
    // for (i = 0; i < 10; i++) { 
    //   xmin=Number(xmin).toFixed(2)
    //   var newrange=(Number(xmin)+Number(range)).toFixed(2)
    //   label[i]=((xmin).toString())+"-"+(newrange.toString());
    //   xmin=newrange
    // }

    // if(document.getElementById("legend"))
    // document.getElementById("legend").remove();

    // //adding legend
    // var g = svg.append("g")
    // .attr("class", "legendThreshold")
    // .attr("transform", "translate(5,320)");
    // g.append("text")
    // .attr("class", "caption")
    // .attr("id","legend")
    // .attr("x", 0)
    // .attr("y", -10)
    // .text(function (d){
    //   return feature;
    // });

    // var legend = d3.legendColor()
    // .labels(function (d) { return label[d.i]; })
    // .shapePadding(4)
    // .scale(color);
    // svg.select(".legendThreshold")
    // .call(legend);

    colorMap.forEach(function (d) {
      colorVal[d.iso] = d[feature + "_scaled"];
    });

    // console.log(colorVal)
    data.features.forEach(function (d) { d[feature] = optionByCountry[d.id] });
     svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", function (d) {
        return color(colorVal[d.id]);
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity", 0.8)
      // tooltips
      .style("stroke", "white")
      .style('stroke-width', 0.3)
      .on('mouseover', function (d) {

        tip.show(d, feature);
        d3.select(this)
          .style("opacity", 1)
          .style("stroke", "white")
          .style("stroke-width", 3)
      })
      .on('mouseout', function (d) {
        tip.hide(d, feature);

        d3.select(this)
          .style("opacity", 0.8)
          .style("stroke", "white")
          .style("stroke-width", 0.3);
      })
      .on('click', function (d) {
        console.log(d.properties.name);
        var country = d.properties.name;
        setRadialCountry(country)
        // drawBarChart(d.properties.name)
        // drawRadarPlot(d.properties.name); //print selected country name
      });

   svg.append("path")
      .data(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

    let zoom = zoomM()
        .scaleExtent([1, 1.25])
        .translateExtent([[-220, -50], [880, 420]])
        .on('zoom', () => {
            console.log('hello dere',+svg.attr('height'));
            // var g= d3.select(this)
            // svg.selectAll('paths')
            // svg.selectAll('g')
              svg.attr('transform', event.transform)
        });
    svg.call(zoom);
  }
  return (
    <svg style={{ height: "100%", width: "100%" }} className='svgcontainer' id='svg' ref={svgRef}>
    </svg>
  )
}