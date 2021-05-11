// BarChart.js
// import * as d3 from 'd3';
import React, { useRef/*, useEffect*/ } from 'react';

function BarChart({ height, width, data }) {
    const ref = useRef()

    return (
        <svg ref={ref} style={{ height: "100%", width: "100%" }}>
        </svg>

    )

}

export default BarChart;
