/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as Simple from "../libs/CS559-Framework/SimpleObjects.js";

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 1) {
  obj.tick = function(delta, timeOfDay) {
    obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 1000) * Math.PI));
  };
  return obj;
}

function test() {

  let world = new GrWorld();
  /**
   * Some Stuff in the world to cast and receieve shadows
   */
  // a high object to cast shadows on lower objects
  let gr = new T.Group();
  let mat = new T.MeshStandardMaterial({color:"blue"});
  let geom = new T.TorusBufferGeometry();
  let tmesh = new T.Mesh(geom,mat);
  tmesh.rotateX(Math.PI/2);
  tmesh.scale.set(0.5,0.5,0.25);
  tmesh.translateX(-2);
  gr.add(tmesh);
  gr.translateY(3);
  let highobj = new GrObject("high obj",gr);
  spinY(highobj);
  world.add(highobj);

  // some low objects to be shadowed - although these
  // should cast shadows on the ground plane
  world.add(spinY(new Simple.GrCube({x:-3,y:1})));
  world.add(spinY(new Simple.GrTorusKnot({x:3,y:1,size:0.5})));

  /**
   * Turn on Shadows - this is the student's job in the assignment
   * Remember to:
   * - make a spotlight and turn on its shadows
   * - have objects (including the ground plane) cast / receieve shadows
   * - turn on shadows in the renderer
   * 
   * it's about 15 lines (with a recursive "loop" to enable shadows for all objects)
   * but you can also just turn things on as you make objects
    */
  world.renderer.shadowMapEnabled = true;
  world.groundplane.mesh.receiveShadow = true;
  tmesh.castShadow = true;
  world.objects[2].objects[0].castShadow = true;
  world.objects[2].objects[0].receiveShadow = true;
  world.objects[3].objects[0].castShadow = true;
  world.objects[3].objects[0].receiveShadow = true;
  let spot = new T.SpotLight("white", 1);
  spot.position.set(0, 10, 0);
  spot.castShadow = true;
  world.scene.add(spot);
  world.go();
}
Helpers.onWindowOnload(test);
