/**
 * 9-1.js - a simple JavaScript file that gets loaded with
 * page 9 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/THREE/examples/jsm/loaders/OBJLoader.js";
import { Mesh } from "../libs/THREE/build/three.module.js";

window.onload = function() {
  /** @type{T.Scene} */
  let scene = new T.Scene();
  /** @type{number} */
  let wid = 670; // window.innerWidth;
  /** @type{number} */
  let ht = 500; // window.innerHeight;
  /** @type{T.PerspectiveCamera} */
  let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  main_camera.position.set(0, 4, 6);
  main_camera.rotation.set(-0.5, 0, 0);
  let active_camera = main_camera;
  /** @type{T.WebGLRenderer} */
  let renderer = new T.WebGLRenderer();
  renderer.setSize(wid, ht);
  renderer.shadowMap.enabled = true;

  let controls = new OrbitControls(main_camera, renderer.domElement);

  document.getElementById("museum_area").appendChild(renderer.domElement);
  setupButtons();
  setupBasicScene();

  // Here, we add a basic, simple first object to the museum.
  /**@type{T.Material} */
  let material = new T.MeshPhongMaterial({
    color: "#00aa00",
    shininess: 15,
    specular: "#00ff00"
  });
  /**@type{T.Geometry} */
  let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);

  /**@type{T.Mesh} */
  let cube = new T.Mesh(geometry, material);
  cube.position.set(2, 1.5, 2);
  cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
  cube.castShadow = true;

  //astronaut
  
  let loader = new OBJLoader();
  let objects = new T.Group();


  let astronaut;
  loader.load("/for_students/objects/astronaut.obj", function(obj) {
    astronaut = obj;
    obj.position.set(- 2, 2.2, 2);
    obj.scale.set(0.2, 0.2, 0.2);
    obj.castShadow = true;
    objects.add(astronaut);
    renderer.render(scene, main_camera);
  });
  
    let teapot;
    loader.load("/for_students/objects/teapot.obj", function(obj) {
      teapot = obj;
      obj.position.set(-2, 2, -2);
      obj.scale.set(0.03, 0.03, 0.03);
      obj.castShadow = true;
      objects.add(teapot);
      renderer.render(scene, main_camera);
    });
  // @ts-ignore
  //let mesh = new T.Mesh(objects.children[0].geometry, material);
  

  let suzanne;
  loader.load("/for_students/objects/suzanne.obj", function(obj) {
    suzanne =obj;
    obj.position.set(2, 1.65, -2);
    obj.scale.set(0.05, 0.05, 0.05);
    obj.castShadow = true;
    objects.add(suzanne);
    // note that we have to render
     renderer.render(scene, main_camera);
  });

  scene.add(objects);

  /**@type{THREE.Mesh} */
  // @ts-ignore
  //objects.children[0].material = new T.MeshPhongMaterial({color : "white"});

  /**@type{T.SpotLight} */
  let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_1.angle = Math.PI / 16;
  spotlight_1.position.set(2, 5, 2);
  spotlight_1.target = cube;
  spotlight_1.castShadow = true;
  scene.add(spotlight_1);

  // TODO: You need to place the lights.
  let spotlight_2 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_2.angle = Math.PI / 25;
  spotlight_2.position.set(7, 5, 7);
  spotlight_2.castShadow = true;
  scene.add(spotlight_2);

  let spotlight_3 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_3.angle = Math.PI / 40;
  spotlight_3.castShadow = true;

  let spotlight_4 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_4.angle = Math.PI / 16;
  spotlight_4.castShadow = true;

  // TODO: You need to place these cameras.
  let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_1.lookAt(3,1,2);
  camera_1.position.set(0 ,1.1, 0.6);
  let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_2.lookAt(-5,1,4);
  camera_2.position.set(0 ,1.2, 0.6);
  let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_3.lookAt(1,0.7, -1.3);
  camera_3.position.set(0 ,0.5, 0.6);
  let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_4.lookAt(-5, 0.7, -5);
  camera_4.position.set(0 ,1, 0.7);
  scene.add(cube);

  // finally, draw the scene. Also, add animation.
  renderer.render(scene, main_camera);
  function animate() {
    cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
    //objects.children[0].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
    renderer.render(scene, active_camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Simple wrapper function for code to set up the basic scene
  // Specifically, sets up the stuff students don't need to use directly.
  function setupBasicScene() {
    // make a ground plane.
    let geometry1 = new T.BoxGeometry(10, 0.1, 10);
    let material1 = new T.MeshStandardMaterial({
      color: "#dddddd",
      metalness: 0.2,
      roughness: 0.8
    });
    /**@type{T.Mesh} */
    let ground = new T.Mesh(geometry1, material1);
    ground.position.set(0, -1, 0);
    scene.add(ground);

    let locs = [-2, 2];
    /**@type{T.Geometry} */
    let geometry2 = new T.CylinderGeometry(0.5, 0.75, 2, 16, 8);
    /**@type{T.Material} */
    let material2 = new T.MeshPhongMaterial({
      color: "#888888",
      shininess: 50
    });
    locs.forEach(function(x_loc) {
      locs.forEach(function(z_loc) {
        /**@type{T.Mesh} */
        let object = new T.Mesh(geometry2, material2);
        object.position.x = x_loc;
        object.position.z = z_loc;
        object.position.y = 0;
        object.receiveShadow = true;

        scene.add(object);
      });
    });

    /**@type{T.AmbientLight} */
    let amb_light = new T.AmbientLight(0xffffff, 0.2);
    scene.add(amb_light);
  }

  function setupButtons() {
    document.getElementById("main_cam").onclick = function() {
      active_camera = main_camera;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_1").onclick = function() {
      active_camera = camera_1;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_2").onclick = function() {
      active_camera = camera_2;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_3").onclick = function() {
      active_camera = camera_3;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_4").onclick = function() {
      active_camera = camera_4;
      renderer.render(scene, active_camera);
    };
  }
};
