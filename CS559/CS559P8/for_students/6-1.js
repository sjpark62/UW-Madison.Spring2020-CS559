/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { OrbitControls } from "../libs/CS559-THREE/examples/jsm/controls/OrbitControls.js";
import { onWindowOnload } from "../libs/CS559-Libs/helpers.js";
//import { OBJLoader } from "../libs/CS559-THREE/examples/jsm//loaders/OBJLoader.js";

function drawPropeller(T) {
  const root = new T.Group();
  // materials
  const mat = new T.MeshStandardMaterial({ color: 'darkgray' });

  // shaft
  const shaftGeo = new T.SphereBufferGeometry(0.1);
  shaftGeo.scale(1, 0.3, 0.3);
  const shaft = new T.Mesh(
    shaftGeo,
    new T.MeshStandardMaterial({ color: 'gray' })
  );
  shaft.castShadow = true;
  root.add(shaft);

  // propellers
  const propellers = new T.Group();
  root.add(propellers);
  root.propellers = propellers;
  const propellerGeo = new T.SphereBufferGeometry(0.1, 8, 16);
  propellerGeo.scale(0.1, 1, 0.2);

  const propeller1 = new T.Mesh(propellerGeo, mat);
  propeller1.castShadow = true;
  propeller1.translateX(0.05);
  propeller1.translateY(0.09);
  propellers.add(propeller1);

  const propeller2 = new T.Mesh(propellerGeo, mat);
  propeller2.castShadow = true;
  propeller2.rotateX((Math.PI * 2) / 3);
  propeller2.translateX(0.05);
  propeller2.translateY(0.09);
  propellers.add(propeller2);

  const propeller3 = new T.Mesh(propellerGeo, mat);
  propeller3.castShadow = true;
  propeller3.rotateX((Math.PI * 4) / 3);
  propeller3.translateX(0.05);
  propeller3.translateY(0.09);
  propellers.add(propeller3);

  return root;
}

function drawAirplane(T, bodyParam) {
  bodyParam = Object.assign(
    {
      color: '#fff',
    },
    bodyParam
  );
  const root = new T.Group();

  // body
  const bodyGeo = new T.SphereBufferGeometry(1, 16, 30);
  bodyGeo.scale(1, 0.2, 0.2);
  const bodyMat = new T.MeshStandardMaterial(bodyParam);
  const body = new T.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  root.add(body);

  // wing left
  const wingGeo = new T.CylinderBufferGeometry(0.1, 0.3, 1, 4);
  wingGeo.rotateY(Math.PI / 4);
  wingGeo.scale(1, 1, 0.3);
  const wingLeft = new T.Mesh(wingGeo, bodyMat);
  wingLeft.castShadow = true;
  wingLeft.rotateX(-Math.PI / 2 + 0.1);
  wingLeft.rotateZ(0.2);
  wingLeft.position.z = -0.6;
  root.add(wingLeft);
  // wing right
  const wingRight = new T.Mesh(wingGeo, bodyMat);
  wingRight.castShadow = true;
  wingRight.rotateX(Math.PI / 2 - 0.1);
  wingRight.rotateZ(0.2);
  wingRight.position.z = 0.6;
  root.add(wingRight);

  // tail left
  const tailGeo = new T.CylinderBufferGeometry(0.05, 0.15, 0.3, 4);
  tailGeo.rotateY(Math.PI / 4);
  tailGeo.scale(1, 1, 0.3);
  const tailLeft = new T.Mesh(tailGeo, bodyMat);
  tailLeft.castShadow = true;
  tailLeft.rotateX(-Math.PI / 2);
  tailLeft.rotateZ(0.3);
  tailLeft.position.x = -0.9;
  tailLeft.position.z = -0.2;
  root.add(tailLeft);
  // tail right
  const tailRight = new T.Mesh(tailGeo, bodyMat);
  tailRight.castShadow = true;
  tailRight.rotateX(Math.PI / 2);
  tailRight.rotateZ(0.3);
  tailRight.position.x = -0.9;
  tailRight.position.z = 0.2;
  root.add(tailRight);
  // tail top
  const tailTop = new T.Mesh(tailGeo, bodyMat);
  tailTop.castShadow = true;
  tailTop.rotateZ(0.3);
  tailTop.position.x = -0.9;
  tailTop.position.y = 0.2;
  root.add(tailTop);

  // propeller
  const propellerLeft = drawPropeller(T);
  propellerLeft.position.set(0.18, 0, -0.6);
  root.add(propellerLeft);
  const propellerRight = drawPropeller(T);
  propellerRight.position.set(0.18, 0, 0.6);
  root.add(propellerRight);

  // wheels
  const wheels = new T.Group();
  // wheels.visible = false;
  root.wheels = wheels;
  root.add(wheels);
  const wheelGeo = new T.CylinderBufferGeometry(0.05, 0.05, 0.05);
  wheelGeo.rotateX(Math.PI / 2);
  const wheelMat = new T.MeshStandardMaterial({ color: '#333', roughness: 1 });
  const wheelLeft = new T.Mesh(wheelGeo, wheelMat);
  wheelLeft.position.set(0.4, -0.15, -0.12);
  wheels.add(wheelLeft);
  const wheelRight = new T.Mesh(wheelGeo, wheelMat);
  wheelRight.position.set(0.4, -0.15, 0.12);
  wheels.add(wheelRight);
  const wheelRear = new T.Mesh(wheelGeo, wheelMat);
  wheelRear.position.set(-0.6, -0.15, 0);
  wheels.add(wheelRear);

  root.animate = (leftTheta = 0.3, rightTheta = 0.3) => {
    propellerLeft.propellers.rotation.x += leftTheta;
    propellerRight.propellers.rotation.x += rightTheta;
  };

  return root;
}

function quadcopter() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(600, 400);
  document.body.appendChild(renderer.domElement);

  let scene = new T.Scene();
  scene.background = new T.Color("skyblue");
  let camera = new T.PerspectiveCamera(
    40,
    renderer.domElement.width / renderer.domElement.height,
    1,
    1000
  );

  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 0, 0);

  let axis = new T.AxesHelper();
  scene.add(axis);
  // since we're animating, add OrbitControls
  let controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new T.AmbientLight("white", 0.2));

  // two lights - both a little off white to give some contrast
  let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
  dirLight1.position.set(10, 10, 0);
  scene.add(dirLight1);

  let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
  dirLight2.position.set(-1, 1, -0.2);
  scene.add(dirLight2);

  // make a ground plane
  let groundBox = new T.BoxGeometry(10, 0.1, 10);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  let _airplane1 = drawAirplane(T, { color: "pink" });
  _airplane1.rotateY(-Math.PI / 2);
  _airplane1.rotateX(0.3);
  const airplane1 = new T.Group();
  airplane1.add(_airplane1);
  airplane1.position.x = 3;
  airplane1.position.y = 3;
  scene.add(airplane1);

  const runway = new T.Mesh(
    new T.BoxBufferGeometry(8, 0.001, 1),
    new T.MeshStandardMaterial({ color: "#888", roughness: 1 })
  );
  runway.receiveShadow = true;
  runway.position.set(0, 0, 3);
  scene.add(runway);
  const runwayLineGeo = new T.BoxBufferGeometry(0.5, 0.001, 0.05);
  const runwayLineMat = new T.MeshStandardMaterial({
    color: "#fff",
    roughness: 1
  });

  for (let i = 0; i < 8; ++i) {
    const line = new T.Mesh(runwayLineGeo, runwayLineMat);
    line.receiveShadow = true;
    line.position.set(-3.5 + i, 0.0001, 3);
    scene.add(line);
  }


  let _airplane2 = drawAirplane(T, { color: "aqua" });
  _airplane2.rotateY(-Math.PI / 2);
  _airplane2.position.y = 0.2;
  const airplane2 = new T.Group();
  airplane2.add(_airplane2);
  airplane2.position.set(-3, 0, 3);
  airplane2.rotation.y = Math.PI / 2;
  scene.add(airplane2);

    // Radio Dish
    function makeDish(baseMat = new T.MeshStandardMaterial, dishMat = new T.MeshStandardMaterial){
        let dishGeo = new T.ConeGeometry(1,1,8,1,true);
        let dishBaseGeo = new T.CylinderGeometry(0.5,0.5);
        let dishMesh = new T.Mesh(dishGeo, dishMat);
        let dishBaseMesh = new T.Mesh(dishBaseGeo, baseMat);
        let dish = new T.Group();
        let dishPivot = new T.Group();

        
        dishBaseMesh.position.y = 0.5;
        
        dishMesh.position.y = .5;
        dishMesh.position.z = 1;
        dishMesh.rotation.x = -Math.PI/2;
        
        dishPivot.add(dishMesh);
        dishPivot.position.y = 0.5;

        dish.add(dishPivot);
        dish.add(dishBaseMesh);
        scene.add(dish);
        return dish;
    }

    let dish1 = makeDish(new T.MeshStandardMaterial({color:"darkgrey"}),
                         new T.MeshStandardMaterial({color:"grey", side:T.DoubleSide}))
    let dish2 = makeDish(new T.MeshStandardMaterial({color:"red"}),
                         new T.MeshStandardMaterial({color:"gold", side:T.DoubleSide}))
    dish2.position.set(3,0,3);
    dish2.scale.set(.5,.5,.5);

  function animateLoop() {
    let theta = performance.now() / 1000;
    let x = 3 * Math.cos(theta);
    let z = 3 * Math.sin(theta);
    airplane1.position.x = x;
    airplane1.position.z = z;
    airplane1.rotation.y = -theta;

    _airplane1.animate();
    
    _airplane2.animate();

    dish1.children[0].lookAt(airplane1.position);
    dish2.children[0].lookAt(airplane2.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
  animateLoop();
  }
onWindowOnload(quadcopter);
