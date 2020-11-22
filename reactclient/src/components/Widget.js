import React, { useState,useEffect } from 'react'
import Cpu from './Cpu';
import Memory from './Memory';
import Info from './Info';
import styled from 'styled-components'
const Button = styled.button``

export default function Widget(props) {
    const { freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad, macA, isActive } = props.data;
    const memory = {totalMem, usedMem, memUseage,freeMem}



    return (
        <div>
            <h2>Widget</h2>
            <Cpu cpuLoad = {props.data.cpuLoad||null}  />
            <Memory memory = {memory} memoryUsed = {props.data.usedMem||null}/>
            <Info />
        </div>
    )
}
