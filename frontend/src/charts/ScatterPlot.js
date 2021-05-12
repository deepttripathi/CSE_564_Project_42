import React, { useEffect, useRef } from "react"
import d3 from "./d3-tip-example"

function RandomData() {
    const data = [...Array(100)].map((e, i) => {
        return {
            x: Math.random() * 40,
            y: Math.random() * 40,
            temparature: Math.random() * 500
        };
    });
    return data;
}

export default function Scatter() {

    const ref = useRef()
    const margin = {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
    }

    const xValue = d => d.x
    const yValue = d => d.y

    const data = RandomData()

    useEffect(() => {
        const svg = d3.select(ref.current)
        const width = +svg.attr('width')
        const height = +svg.attr('height')
        const circleRadius = 5

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x))
            .range([0, innerWidth])

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y))
            .range([innerHeight, 0])

        const g = svg.append('g')
            .attr('transform', `transform(${margin.left}, ${margin.top})`)

        const xAxis = d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickPadding(15)

        const yAxis = d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(10);

        const yAxisG = g.append('text').call(yAxis)
        yAxisG.selectAll('.domain').remove()

        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', -30)
            .attr('x', -innerHeight / 2)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`)

        xAxisG.select('.domain').remove()

        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 55)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')

        g.selectAll('circle').data(data)
            .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius);

        g.selectAll(".circles")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 3)
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("fill", "black")


    }, [data])

    return (
        <svg style={{ height: "100%", width: "100%" }} className='svgcontainer' id='svg' ref={ref}>
        </svg>
    )

}