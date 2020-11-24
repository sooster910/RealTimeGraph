
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from 'styled-components';

const Canvas = styled.canvas`
    display:flex;
    margin:0 auto;
    border-radius:1rem; 
`
class Three3D extends Component {
    constructor(props){
        super();
        this.maxHeight = 5;
        this.state={
            cpuLoad:0,

        }
    
    }
componentDidUpdate(prevProps, prevState){
    if(prevProps.cpuLoad !==this.props.cpuLoad){
        const canvas = this.state &&this.state.ctx;
        this.setState({cpuLoad: this.props.cpuLoad},()=>{
            this.state.dataBar.scale.y = (this.maxHeight/100)*this.state.cpuLoad;
            // debugger
        });
    }

}

  componentDidMount() {
    
      if(this.props){
            this.setState({cpuLoad:this.props.cpuLoad})
      }
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
            camera.position.set(0, 2, 10);
      const myCanvas = document.querySelector('#mycanvas')
      const renderer = new THREE.WebGLRenderer({antialias: true, canvas: myCanvas});
      renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);
      document.body.appendChild(renderer.domElement);
      const controls = new OrbitControls(camera, renderer.domElement);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      let pointCount = 11;
      let plane, line;
  
      //GridHelper(size, division, colorCenterLine,colorGrid)
      scene.add(new THREE.GridHelper(pointCount - 1, pointCount - 1, 0xffc85c));
      // scene.add(cube);
  
      //Add maxHeight bar 
      const geometry1 = new THREE.BoxGeometry(2, 2, 2);
       
      const geometry_material1 = new THREE.MeshBasicMaterial({
              color: "#f9dc48",
              wireframe: false,
              vertexColors: THREE.FaceColors,
              transparent: true,
              opacity: 0.5
          });
        
      const new_mesh1 = new THREE.Mesh(geometry1,geometry_material1);
      geometry1.translate( 1, 1, 1);
      new_mesh1.scale.y = this.maxHeight;
      scene.add(new_mesh1);
  
      //Add bar with data 
      var geometry2 = new THREE.BoxGeometry(2, 2, 2);
  
      var geometry_material2 = new THREE.MeshBasicMaterial({
              color: "#f9dc48",
              wireframe: false,
              vertexColors: THREE.FaceColors,
              transparent: false,
              opacity: 1,
          });

       var new_mesh2=  new THREE.Mesh(geometry2,geometry_material2);
       geometry2.translate( 1, 1, 1);
          this.setState({dataBar:new_mesh2})
    
    //   console.log('new_mesh2.scale.y',new_mesh2.scale.y)
      //create another canvas for a label
      var canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      var ctx = canvas.getContext("2d"); 
       
      //add text 
      ctx.font = "40pt Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "right";
      this.setState({ctx:ctx});
      ctx.fillText(`cpu`, 100, 50);
    // this.state.context.fillText(`cpu ${this.state.cpuLoad}`, 100, 50); //not working
      var tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;    
      var spriteMat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
  
        });
        var sprite = new THREE.Sprite(spriteMat);
        new_mesh2.add(sprite);
      //   sprite.position.set(100,100,100);
       sprite.scale.set(5,5,1);
        
        scene.add(new_mesh2);  
  
      camera.position.z = 5;
  
      const animate = function() {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
  
      animate();
  }
  render() {
    return(
      <div>
        <Canvas id="mycanvas"></Canvas>
      </div>
    //  <div ref={ref => (this.mount = ref)} />;
     )
  }
}

export default Three3D;