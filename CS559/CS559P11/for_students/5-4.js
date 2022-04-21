/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

function test() {
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

  let objs = [];
  let dx = -6;

  let shaderMat = shaderMaterial("./shaders/5-4.vs","./Shaders/5-4.fs",
  {
      side:T.DoubleSide,
      uniforms: {
          colorA: {type: 'vec3', value: new T.Color("yellow")},
          colorB: {type: 'vec3', value: new T.Color("white")},
          flowers: {value: 1.0}
      }
  });

let s1 = new InputHelpers.LabelSlider("Flowers", {width: 400, min: 1, max: 5, step: 0.5, initial: 1, where: mydiv});
function onchange()
{
  shaderMat.uniforms.flowers.value = s1.value();
}
s1.oninput = onchange;
onchange();
world.add(new SimpleObjects.GrSphere({x:-2,y:1, material:shaderMat}));
world.add(new SimpleObjects.GrSquareSign({x:2,y:1,size:1,material:shaderMat}));

world.go();
}
Helpers.onWindowOnload(test);
