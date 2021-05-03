import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const CountryMap = ({ data })=> {
  const svgRef = useRef()

  useEffect(()=> {
    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d,name) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>"+ name +": </strong><span class='details'>" + format(d[name]) +"</span>";
      })
  
    const margin = {top: -40, right: 0, bottom: 0, left: 0}
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
  
    const color = d3.scaleThreshold()
      .domain([1,2,3,4,5,6,7,8,9,10])
      .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"])
  
  
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('class', 'map')
  
    const projection = d3.geoMercator()
      .scale(100)
      .translate( [width / 2, height / 2])
    
    const path = d3.geoPath()
      .projection(projection)
  
    svg.call(tip)
  
    const scoreByCountry = {}


    svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
        return color(scoreByCountry[d.properties.name]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
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

  }, [])

  return(
    <svg ref={svgRef}></svg>
  )
}
