import io from 'socket.io-client';

let socket = io.connect('http://localhost:8181');
 
console.log('socket',socket)

export default socket;