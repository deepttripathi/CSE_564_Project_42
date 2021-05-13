import React, { useEffect, useRef } from 'react'
import d3 from './d3-tip-example'

export default function Piechart({ pieData }) {
    const svgRef = useRef()

    const outerRadius = 100
    const innerRadius = 50

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50
    }

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateCool)
        .domain([0, pieData.length]);


    useEffect(() => {
        drawChart();
    }, [pieData])

    function drawChart() {
        d3.select('#svgcontainer')
            .remove()

        const svg = d3.select(svgRef.current)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)

        const arcGenerator = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        const pieGenerator = d3.pie()
            .padAngle(0)
            .value(d => d.value)

        const arc = svg.selectAll()
            .data(pieGenerator(pieData))
            .enter()

        arc.append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#ffffff')
            .style('stroke-width', 0)

        arc.append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.label)
            .style('fill', (_, i) => colorScale(pieData.length - i))
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            })
    }

    return (
        <svg style={{ height: "100%", width: "100%" }} id='svgcontainer' id='svg' ref={svgRef}>
        </svg>
    )
}