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
            radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal().range(d3.schemeCategory10)


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
            .style('opacity', '0.6')
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
                    .attr("y", -141)
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