import React from 'react'
import DonutChart from './DonutChart'


export default function Cpu(props) {
    return (
        <div>
            <h2>CPU</h2>
       
            <DonutChart cpuLoad= {props.cpuLoad} />
           
        </div>
    )
}
