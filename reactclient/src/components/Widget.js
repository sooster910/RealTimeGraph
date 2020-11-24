import React, { useState, useEffect } from 'react'
import Cpu from './Cpu';
import Memory from './Memory';
import Info from './Info';
import styled from 'styled-components';
import Three3D from './Three3D';

const WidgetContainer = styled.article`
    background-color:#E4EBF5;
    box-shadow: 0.8rem 0.8rem 1.4rem #c8d0e7, -0.2rem -0.2rem 1.8rem #ffffff;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 1rem;
`

export default function Widget(props) {
    const { freeMem, totalMem, usedMem, memUseage, osType, upTime, cpuModel, numCores, cpuSpeed, cpuLoad, macA, isActive } = props.data;
    const memory = { totalMem, usedMem, memUseage, freeMem }

    return (

        <WidgetContainer>
            <Cpu cpuLoad={props.data.cpuLoad || null} />
            <Memory memory={memory} memoryUsed={props.data.usedMem || null} />
            <Info />

            <Three3D cpuLoad={props.data.cpuLoad || null} memory={memory} memoryUsed={props.data.usedMem || null}/>
        </WidgetContainer>
    )
}
