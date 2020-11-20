import React, { Component } from 'react'
import socket from './lib/socket';

class App extends Component {
  constructor(){
    super();
      this.state = {
        data:{}
      };
  }

  componentDidMount(){
    socket.on('data',(data)=>{
      console.log('data',data);
    });
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default App;

