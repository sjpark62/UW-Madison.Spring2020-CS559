/**
 * 4-2.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";
import { OBJLoader } from "../libs/THREE/examples/jsm/loaders/OBJLoader.js";
import { Material } from "../libs/THREE/build/three.module.js";

window.onload = function() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(400, 400);

  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera();
  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 3, 0);

  scene.add(new T.AmbientLight("white", 0.2));
  let point = new T.PointLight("white", 1, 0, 0);
  point.position.set(20, 10, 15);
  scene.add(point);

  // make a ground plane
  let groundBox = new T.BoxGeometry(5, 0.1, 5);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshLambertMaterial({ color: 0x888888 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  //@@Snippet:objload
  let loader = new OBJLoader();
  loader.load("/for_students/objects/astronaut.obj", function(astronaut) {
    astronaut.position.set(1.5, 4, 0);
    astronaut.scale.set(0.5, 0.5, 0.5);
    scene.add(astronaut);
    // note that we have to render
    renderer.render(scene, camera);
  });
  //@@Snippet:objload

  document.getElementById("div1").appendChild(renderer.domElement);
  // renderer.render(scene,camera);
};
