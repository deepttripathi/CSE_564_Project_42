import React, { useEffect, useRef } from 'react'
import d3 from './d3-tip-example'

export default function Piechart({ data }) {
    const svgRef = useRef()

    // console.log('pieData', pieData)

    useEffect(() => {

        if (data.length == 0)
            return

        var pieDimensions = ["Western Europe", "North America and ANZ", "Middle East and North Africa", "Central and Eastern Europe", "Latin America and Caribbean", "East Asia", "Southeast Asia", "Sub-Saharan Africa", "Commonwealth of Independent States", "South Asia"]


        var modifiedData = []
        var modifiedDimension = []
        for (var i = 0; i < 10; i++) {
            if (data[i] != 0) {
                modifiedData.push(data[i])
                modifiedDimension.push(pieDimensions[i])
            }
        }

        console.log('modified data:', modifiedData)
        console.log('modified dimension', modifiedDimension)


        var width = 400,
            height = 300,
            radius = Math.min(width, height) / 2 - 10;

        const color = d3.scaleOrdinal()
            .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(51,123,189)", "rgb(33,113,181)", "rgb(25,98,166)", "rgb(8,81,156)"])


        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.pie()
            .sort(null)
            .value(function (d) { return d; });

        var svg = d3.select(svgRef.current)
            .append("g")
            .attr("transform", "translate(" + 165 + "," + height / 2 + ")");

        svg.append('text')
            .attr("x", 0)
            .attr("y", -138)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
            .style("text-decoration", "underline")
            .style("font-weight", "bold")
            .text("Regional Data")

        var g = svg.selectAll(".arc")
            .data(pie(modifiedData))
            .enter().append("g")
            .attr("class", "arc");

        var div = g.append('div').attr('class', 'tool').style('opacity', 0)


        var focusText = g.append('g').append('text').style('opacity', 0)
            .attr('font-size', '13px')


        g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) { return color(i); })
            .style('opacity', '1')
            .attr("stroke", "black")
            .style("stroke-width", "1px")
            .on('mouseover', (d, i) => {

                focusText.style('opacity', 1)
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                focusText
                    .html(modifiedDimension[i])
                    .attr("x", -70)
                    .attr("y", 141)
                    .style("text-align", "middle")
            })
            .on("mouseout", function (d) {

                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                focusText.style('opacity', 0)
            })

        d3.select(this)
            .append('text', modifiedDimension[i])

        g.append("text")
            .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function (d, i) {
                console.log(d.modifiedData)
                return modifiedData[i];
            });
    }, [data])

    return (
        <svg style={{ height: "100%", width: "100%" }} id='svgcontainer' id='svg' ref={svgRef}>
        </svg>
    )
}