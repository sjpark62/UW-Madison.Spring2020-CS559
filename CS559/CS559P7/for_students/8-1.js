/**
 * 8-1.js - a simple JavaScript file that gets loaded with
 * page 8 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { onWindowOnload } from "../libs/helpers.js";

window.onload = function() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(500, 500);
  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera();
  camera.position.set(5,13,5);
  camera.rotateZ(100);
  

  scene.add(new T.AmbientLight("white", 0.2));
  let point = new T.PointLight("white", 1, 0, 0);
  point.position.set(20, 10, 15);
  scene.add(point);

  let controls = new OrbitControls(camera, renderer.domElement);

  // make a ground plane
  let groundBox = new T.BoxGeometry(5, 0.1, 5);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshLambertMaterial({ color: 0x888888 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  // make 5 boxes of different sizes - all cubes
  let body2 = new T.Mesh(
    new T.SphereGeometry(2, 0.5, 0.5),
    new T.MeshStandardMaterial({ color: "white" })
  );


  let body = new T.Mesh(
    new T.SphereGeometry(1.5, 0.5, 0.5),
    new T.MeshStandardMaterial({ color: "white" })
  );
  let head = new T.Mesh(
    new T.SphereGeometry(1, 0.5, 0.5),
    new T.MeshStandardMaterial({ color: "white" })
  );

  let nose = new T.Mesh(
    new T.ConeGeometry(0.2, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "orange" })
  );
  
  let leftEye = new T.Mesh(
    new T.SphereGeometry(0.15, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "black" })
  );

  let rightEye = new T.Mesh(
    new T.SphereGeometry(0.15, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "black" })
  );

  let hat = new T.Mesh(
    new T.CylinderGeometry(1, 1, 1),
    new T.MeshStandardMaterial({ color: "red" })
  );
  
  let mouse1 = new T.Mesh(
    new T.SphereGeometry(0.1, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "black" })
  );
  let mouse2 = new T.Mesh(
    new T.SphereGeometry(0.1, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "black" })
  );
  let mouse3 = new T.Mesh(
    new T.SphereGeometry(0.1, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "black" })
  );

  let button = new T.Mesh(
    new T.SphereGeometry(0.15, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "blue" })
  );
  let button2 = new T.Mesh(
    new T.SphereGeometry(0.15, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "blue" })
  );
  let button3 = new T.Mesh(
    new T.SphereGeometry(0.15, 0.3, 0.5),
    new T.MeshStandardMaterial({ color: "blue" })
  );
  
  let leftArm = new T.Mesh(
     new T.CylinderBufferGeometry(0.2, 0.1, 2, 20),
     new T.MeshStandardMaterial({ color: 0x5E4E4A })
  );   

  let rightArm = new T.Mesh(
    new T.CylinderBufferGeometry(0.2, 0.1, 2, 20),
    new T.MeshStandardMaterial({ color: 0x5E4E4A })
 );   

    //positions
    body2.position.set(0,1,0);
    body.position.set(0,2.75,0);
    head.position.set(0, 5 , 0);
    hat.position.set(0,6.2,0);
   
    nose.position.set(1,5,2);
    //nose.rotateY(50);

    mouse1.position.set(1, 4.6, 1.5);
    mouse2.position.set(0.8,4.5, 1.5);
    mouse3.position.set(0.6,4.6, 1.5);

    leftEye.position.set(1.3, 5.3 , 1.75);
    rightEye.position.set(0.5, 5.3, 1.75);
   
    button.position.set(1,3,2);
    button2.position.set(1,3.3,2);
    button3.position.set(1,3.6,2);

    leftArm.position.set(-1, 4 , 2);
    leftArm.rotateX(10);
    leftArm.rotateZ(100);

    rightArm.position.set(1.9 ,4, 0.3);
    rightArm.rotateZ(100);
    rightArm.rotateX(110);

  // add the boxes to the scene
  scene.add(body);
  scene.add(body2);
  scene.add(head);
  scene.add(nose);
  scene.add(leftEye);
  scene.add(rightEye);
  scene.add(hat);
  scene.add(mouse1);
  scene.add(mouse2);
  scene.add(mouse3);
  scene.add(button);
  scene.add(button2);
  scene.add(button3);
  scene.add(leftArm);
  scene.add(rightArm);

  document.getElementById("div1").appendChild(renderer.domElement);
  renderer.render(scene, camera);
};
