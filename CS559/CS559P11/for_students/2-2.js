/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 0) {
  obj.tick = function (delta, timeOfDay) {
    obj.objects.forEach((obj) =>
      obj.rotateY(((speed * delta) / 1000) * Math.PI)
    );
  };
  return obj;
}

function test() {
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: 640, where: mydiv });

  // Shader 0 - solid color
  /* use the simplest shader pair */
  let mat0 = shaderMaterial("./shaders/2-1.vs", "./shaders/2-1.fs");
  world.add(new SimpleObjects.GrCube({ material: mat0, x: -3, y: 1 }));

  // Shader 1 - solid color, passed by uniform
  /* next up - shader pair that has a uniform */
  /* notice how we pass the uniform as a parameter to the shader constructor */
  let mat1 = shaderMaterial("./shaders/2-2.vs", "./shaders/2-2.fs", {
    uniforms: { color: { value: new T.Vector3(0.4, 0.8, 0.8) } },
  });
  world.add(new SimpleObjects.GrCube({ material: mat1, x: 0, y: 1 }));

  // Shader 1b - solid color, passed by uniform, animate uniform
  /* let's use that same thing, but to animate the parameter of the shader */
  let mat2 = shaderMaterial("./shaders/2-2.vs", "./shaders/2-2.fs", {
    uniforms: { color: { value: new T.Vector3(0.4, 0.5, 0.5) } },
  });
  let cube2 = new SimpleObjects.GrCube({ material: mat2, x: 3, y: 1 });

  // add an "advance" function to animate this cube
  let cubeTime = 0;
  cube2.tick = function (delta, timeofday) {
    cubeTime += delta;
    let newR = Math.sin(cubeTime / 200) / 2 + 0.5; // get a number between 0-1
    mat2.uniforms.color.value.x = newR;
  };
  world.add(cube2);

  world.go();
}
Helpers.onWindowOnload(test);
