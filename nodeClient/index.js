const os  = require('os');
const io = require('socket.io-client') // use client library

const socket = io('http://127.0.0.1:8181');

socket.on('connect',()=>{

    console.log('connected socket server ')

}) 