import React, { useRef, useEffect } from "react"
import * as d3Module from "d3"
import {event} from 'd3'


const d3 = {
    ...d3Module
}


export default function ScatterPlot1({data, feature}) {


    console.log("data scatter :", data)
    const svgRef = useRef()

    useEffect(async () => {

    var color= d3.scaleOrdinal(d3.schemeCategory10)

    var xdata = [];
    for (var i=0; i<data.length ; i++){
        if (  (data[i]['percentage_non_religious']==0 || (data[i]['percentage_non_religious'] == null ))){
            continue
        }
        else{
            xdata[i] = data[i]['percentage_non_religious']
        }
        
    }

    var ydata = [];
    for (var j=0; j<data.length ; j++){
        if ((data[j]['percentage_non_religious']==0 || (data[j]['percentage_non_religious'] == null ))){
            continue
        }
        else{
            if (feature == 'Population')
                ydata[j] = data[j][feature]/100000
            else{
                ydata[j] = data[j][feature]
            }
        }
    }

    var svg = d3.select(svgRef.current)
        .attr("id","scattersvg")
        .attr("class","scatter")

    svg.selectAll("*").remove();
    //    var margin = 200,
        var width = 220,
         height = 230;

     
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var g = svg.append("g")
    .attr("transform", "translate(" + 80 + "," + 5 + ")");

    var xmin = d3.min(xdata);
    var xmax = d3.max(xdata);
    // x.domain([0,width])
    x.domain([xmin-0.15, xmax]);

    var xAxis = g.append("g")
            .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        //   .attr("font-size","11px")

    g.append("g")
    .append("text")
    // .attr("transform", "translate(0, 0)")
     .attr("y", 275)
     .attr("x", width/2)
     .attr("text-anchor", "middle")
     .attr("fill", "black")
     .attr("font-family", "sans-serif")
     .attr("font-size", "12px")
     .text("Non-religious people(%)")
     .attr('font-weight','bold');


      var ymin = d3.min(ydata)
      var ymax = d3.max(ydata)
      y.domain([0, ymax]);

      g.append("g")
          .call(d3.axisLeft(y).tickFormat(function(d){
              return d;
          }).ticks(10))
          .attr("font-size","11px")

      g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("x", -150)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .text(feature)
        .attr('font-weight','bold');
        

     g.append("g")
         .call(d3.axisLeft(y).tickFormat("").ticks(10).tickSizeInner(-width))
         .attr("class", "grid");
      
    var clip = g.append("defs").append("svg:clipPath")
         .attr("id", "clip")
         .append("svg:rect")
         .attr("width", 230 )
         .attr("height", 500 )
         .attr("x", -1)
         .attr("y", -10);

        //  var scatter = g.append('g')
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart) 

      var scatter = g.append('g')
        .attr("clip-path", "url(#clip)")

    scatter
        .selectAll("circle")
        .data(xdata)
        .enter()
        .append("circle")
        .attr("cx", function (d,i) { return x(xdata[i]); } )
        .attr("cy", function (d,i) { return y(ydata[i]); } )
        .attr("r", 4)
        .style("fill", (d,i)=>{
            return color(data[i]['clusterId']);
        })
        .style("opacity", 0.7);

            // Add the brushing
    scatter
        .append("g")
          .attr("class", "brush")
          .call(brush);
  
    
    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }
  
    // A function that update the chart for given boundaries
    function updateChart() {

      var extent = event.selection
      
  
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([xmin-0.15, xmax]);
    }else{
        // console.log('extent',x.invert(extent[0]), x.invert(extent[1]) )
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }
  
      // Update axis and circle position
    xAxis
      .transition().duration(1000).call(d3.axisBottom(x))


      scatter
        .selectAll("circle")
        .transition().duration(1000)
        .attr("cx", function (d,i) { return x(xdata[i]); } )
        .attr("cy", function (d,i) { return y(ydata[i]); } )
  
      }


var keys = ["Cluster 0", "Cluster 1", "Cluster 2"]

        //   Add one dot in the legend for each name.
    g.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
        .attr("cx", -77)
        .attr("cy", function(d,i){ return 0 + i*16}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 3)
        .style("fill", function(d, i){ 
        const index = keys.findIndex(dim => dim === d);
        console.log('color log', index )
        return color(index)
    })
          
          // Add one dot in the legend for each name.
    g.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
        .attr("x", -74)
        .attr("y", function(d,i){ return 0 + i*16}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", "black")
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size","11px")
        .attr('font-weight','bold');


    },[data, feature])
    return(
        <svg style={{ height: "100%", width: "100%" }} className='scatter' id='scatterid' ref={svgRef}></svg>
    )
}