/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

let image = new T.TextureLoader().load("../textures/islands.png");

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 1) {
  obj.tick = function (delta, timeOfDay) {
    obj.objects.forEach((obj) =>
      obj.rotateY(((speed * delta) / 1000) * Math.PI)
    );
  };
  return obj;
}

function test() {
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({
    width: mydiv ? 600 : 800,
    where: mydiv,
    lightColoring: "white",
  });

  let shaderMat = shaderMaterial("./shaders/7-2.vs", "./shaders/7-2.fs", {
    side: T.DoubleSide,
    uniforms: {
      colormap: { value: image },
    },
  });

  console.log(shaderMat.uniforms.colormap);

  world.add(
    spinY(
      new SimpleObjects.GrSphere({
        x: -2,
        y: 1,
        widthSegments: 100,
        heightSegments: 100,
        material: shaderMat,
      })
    )
  );
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.ambient.intensity = 1;

  world.go();
}
Helpers.onWindowOnload(test);
