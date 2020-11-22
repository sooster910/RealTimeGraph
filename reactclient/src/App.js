import React, { Component } from 'react'
import socket from './lib/socket';
import Widget from './components/Widget';
import styled from 'styled-components'

const Button = styled.button``

class App extends Component {
  constructor() {
    super();
    this.state = {
      performData: null
    };
  }

  componentDidMount() {
    socket.on('tickData', (data) => {
     
      const dataObj = {};
      dataObj[data && data.macAddress] = data;
      this.setState({performData:dataObj});
    });
  }

  
  render() {
    const {performData} = this.state
    const widgets=[];
    Object.entries(performData||{}).forEach(([key,value])=>{
    
      widgets.push(<Widget key={key} data={value}/>)
    });
 
    return (
      <div>
      {widgets}
      </div>
    )
  }
}

export default App;

