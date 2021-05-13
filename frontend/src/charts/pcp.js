import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { drag, event } from 'd3'
// const d3 = {
//     ...d3Module
// }

export default function ParallelChart({ data, setPieData }) {
    const svgRef = useRef()

    useEffect(async () => {
        if (data.length == 0)
            return
        var color = d3.scaleOrdinal(d3.schemeCategory10)

        var width = 640;
        var height = 250;

        var x = d3.scalePoint().range([1, width], 1),
            y = {},
            dragging = {};

        var line = d3.line(),
            axis = d3.axisLeft(),
            background,
            foreground;

        var svg = d3.select(svgRef.current).attr("class", "scatter")
            .attr("id", "scattersvg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + 25 + "," + 20 + ")");

        var dimensions = ['Score', "GDP per capita", "Social support", "Healthy life expectancy", "Freedom to make life choices", "Generosity",
            "Perceptions of corruption", "percentage_non_religious", "Percentage", 'Population']

        var updatedDimensions = ['Score', 'GDP', 'Social', 'Health', 'Freedom', 'Generosity', 'Corruption', 'Non-religious', 'Internet%', 'Population']

        var pieDimensions = ["Western Europe", "North America and ANZ", "Middle East and North Africa", "Central and Eastern Europe", "Latin America and Caribbean", "East Asia", "Southeast Asia", "Sub-Saharan Africa", "Commonwealth of Independent States", "South Asia"]

        x.domain(dimensions);




        dimensions.forEach(d => {
            y[d] = d3.scaleLinear()
                .domain(d3.extent(data, function (p) {
                    // console.log('ggg', +p[d])
                    return +p[d];
                }))
                .range([height, 0]);
            y[d].brush = d3.brushY().extent([[-8, y[d].range()[1]], [0, y[d].range()[0]]])
                .on("end", brush);
        });
        // Add grey background lines for context.
        background = svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path);

        // Add blue foreground lines for focus.
        foreground = svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .attr("stroke", function (d, i) {
                return color(data[i]['clusterId']);
            });

        // Add a group element for each dimension.
        var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function (d) {
                return "translate(" + x(d) + ")";
            })
            .call(d3.drag()
                .subject(function (d) { return { x: x(d) }; })
                .on("start", function (d) {
                    dragging[d] = x(d);
                    background.attr("visibility", "hidden");

                    // text.attr('visibility','hidden')
                    // text.attr('text','white' )
                })
                .on("drag", function (d) {
                    dragging[d] = Math.min(width, Math.max(0, event.x));
                    foreground.attr("d", path);
                    dimensions.sort(function (a, b) { return position(a) - position(b); });
                    x.domain(dimensions);
                    g.attr("transform", function (d) { return "translate(" + position(d) + ")"; });
                })
                .on("end", function (d) {
                    // console.log("Before dragging", dragging[d]);
                    delete dragging[d];
                    console.log("After dragging", dragging[d]);
                    transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                    transition(foreground).attr("d", path);
                    background
                        .attr("d", path)
                        .transition()
                        .delay(500)
                        .duration(0)
                        .attr("visibility", null);
                    // text.attr('visibility','visible')

                }));

        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function (d) { d3.select(this).call(axis.scale(y[d])); })
        g.append("text")
            .attr('class', 'axisPcp')
            // .attr('fill','black')
            .attr('font-size', '9px')
            .style("text-anchor", "middle")
            .attr("y", -5)
            .text(function (d) {
                const index = dimensions.findIndex(dim => dim === d);
                return updatedDimensions[index]
                // return d;
            })
            .style('cursor', 'move')
        // .attr('font-weight','bold');

        // s.attr("transform", function (d) { return "translate(" + position(d) + ")"; });


        // Add and store a brush for each axis.
        g.append("g")
            .attr("class", "brush")
            .each(function (d) {
                d3.select(this).call(y[d].brush);
            })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
        // });


        function position(d) {
            var v = dragging[d];
            return v == null ? x(d) : v;
        }

        function transition(g) {
            return g.transition().duration(500);
        }

        // Returns the path for a given data point.
        function path(d) {
            return line(dimensions.map(function (p) { return [position(p), y[p](d[p])]; }));
        }

        function brush() {
            const actives = [];
            // filter brushed extents
            svg.selectAll('.brush')
                .filter(function (d) {
                    return d3.brushSelection(this);
                })
                .each(function (d) {
                    actives.push({
                        dimension: d,
                        extent: d3.brushSelection(this)
                        // values: 
                    });
                });
            // set un-brushed foreground line disappear
            foreground.style('display', function (d) {
                return actives.every(function (active) {
                    const dim = active.dimension;
                    return active.extent[0] <= y[dim](d[dim]) && y[dim](d[dim]) <= active.extent[1];
                }) ? null : 'none';
            });
            console.log(actives)
            console.log(data)


            var pie = [...data]
            console.log("pie before:", pie)
            for (var i = 0; i < actives.length; i++) {
                pie = pie.filter((p, j) => {
                    return !(p[actives[i].dimension] > y[actives[i].dimension].invert(actives[i].extent[0]) || p[actives[i].dimension] < y[actives[i].dimension].invert(actives[i].extent[1]))
                    // {
                    //     console.log(p[actives[i].dimension])
                    //     console.log("min:", y[actives[i].dimension].invert(actives[i].extent[0]))
                    //     console.log("max:", y[actives[i].dimension].invert(actives[i].extent[1]))
                    //     pie.slice(j, 1)
                    // }
                })
                console.log("pie after 1 loop", pie)
                // for (var j = 0; j < pie.length; j++) {
                //     // console.log("dimension:", actives[i])
                //     // console.log("y extent 0:", y[actives[i].dimension].invert(actives[i].extent[0]))
                //     // console.log("active extent 1:", actives[i].extent[1])
                //     if ((pie[j][actives[i].dimension]) < y[actives[i].dimension].invert(actives[i].extent[0]) || y[actives[i].dimension](pie[j][actives[i].dimension] > y[actives[i].dimension].invert(actives[i].extent[1]))) {
                //         // console.log("pie dimension value:", pie[j][actives[i].dimension])

                //         j--
                //     }
                // }
            }

            console.log("pie after: ", pie)
            var count = new Array(10).fill(0)
            pie.forEach((p, k) => {
                const index = pieDimensions.findIndex(dim => dim === p['Regional indicator'])
                count[index]++
            })
            console.log("count", count)
            setPieData(count)
        }
    }, [data])
    return (
        <svg style={{ height: "100%", width: "100%" }} ref={svgRef}></svg>
    )

}