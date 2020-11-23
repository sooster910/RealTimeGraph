
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Three3D extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
          camera.position.set(0, 2, 10);
    const myCanvas = document.querySelector('#mycanvas')
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas: myCanvas});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    let pointCount = 11;
 

    //GridHelper(size, division, colorCenterLine,colorGrid)
    scene.add(new THREE.GridHelper(pointCount - 1, pointCount - 1, 0xffc85c));
    // scene.add(cube);

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
        <canvas id="mycanvas"></canvas>
      </div>
    //  <div ref={ref => (this.mount = ref)} />;
     )
  }
}

export default Three3D;