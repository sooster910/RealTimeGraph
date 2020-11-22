import React, { useEffect, useState, useRef } from 'react'



export default function DonutChart(props) {
    let ref = useRef();
    let titleRef = useRef();
    const [ratio, setRatio] = useState(0);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setRatio(Object.values(props)[0]);
        drawPieChart(ratio)
        //    return () => {
        //             cancelAnimationFrame(requestId);
        //         };
    }, [Object.values(props)[0]]);

    useEffect(() => {
        setTitleFunc();
    }, []);

    const setTitleFunc = () => {
        let title = Object.keys(props)[0];
        setTitle(title);
    }

    const drawPieChart = (ratio) => {

        let canvas = ref.current;

        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        ctx.fillStyle = "#ccc";
        ctx.beginPath();
        ctx.arc(100, 100, 90, Math.PI * 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.lineWidth = 20;

        switch (ratio) {

            case ratio < 20:
                ctx.strokeStyle = "#00ff00";
                break;

            case ratio < 40:
                ctx.strokeStyle = "#337ab7";
                break;

            case ratio < 60:
                ctx.strokeStyle = "#f0ad4e";

            default:
                ctx.strokeStyle = "#d9534f"
        }
        ctx.beginPath();
        ctx.arc(100, 100, 95, Math.PI * 1.5, (Math.PI * 2 * ratio / 100) + Math.PI * 1.5);
        ctx.stroke();
        
        ctx.font = '20pt Calibri';
        ctx.fillStyle = "black";
        ctx.fillText(title,50,50);
        ctx.fillText(`${ratio}%`, 95,95)

     
    } 


    return (
        <canvas id="donut_chart" ref={ref}  width="200" height="200">
                <h4 ref = {titleRef}>{title}</h4>
                <p> {ratio}</p>
        </canvas>
    )
}

