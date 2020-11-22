export default function drawPiChairt(canvas,ratio){
   let ctx = canvas.getContext('2d');
   ctx.clearRect(0,0,500,500);
   ctx.fillStyle= "#ccc";
   ctx.beginPath();
   ctx.arc(100,100,90,Math.PI*0,Math.PI*2);
   ctx.closePath();
   ctx.fill();

    ctx.lineWidth = 10;
    switch(ratio){
        case ratio<20 :
        ctx.strokeStyle="#00ff00";
        break;

        case ratio<40:
        ctx.strokeStyle="#337ab7";
        break;

        case ratio<60:
        ctx.strokeStyle = "#f0ad4e";

        default :
        ctx.strokeStyle = "#d9534f"
    }

}