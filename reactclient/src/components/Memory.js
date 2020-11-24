import React from 'react'
import DonutChart from './DonutChart';
import Three3D from './Three3D'


export default function Memory(props) {
    const { freeMem, memUseage, totalMem, usedMem } = props.memory || null;
    const convertedToGB = (data) => {
        return ((Math.floor((data / (1024 * 1024 * 1024)) * 100) / 100));
    }
    return (
        <React.Fragment>
            <div>
                <h2>Memory</h2>
                <DonutChart memoryUsage={memUseage * 100} memoryUsed={props.memoryUsed * 100} />

                <div className="">
                    <p>Total Memory: {convertedToGB(totalMem)} GB</p>
                    <p>Free Memory : {convertedToGB(freeMem)} GB</p>
                </div>
            </div>
        </React.Fragment>
    )
}
