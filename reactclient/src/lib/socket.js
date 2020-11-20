import { io } from 'socket.io-client';

 const socket = io('http://127.0.0.1:9000');
    // socket.emit('clientAuth','randomId');
    socket.emit('clientAuth','staticId');
    
    socket.on('tickData',(data)=>{
        console.log('react Client',data);
    })
export default socket;