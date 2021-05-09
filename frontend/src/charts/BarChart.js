// BarChart.js
// import * as d3 from 'd3';
import React, { useRef/*, useEffect*/ } from 'react';

function BarChart({ height, width, data }){
    const ref = useRef()

    return (
        <div className="chart">
            <svg height={height} width={width} ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;
