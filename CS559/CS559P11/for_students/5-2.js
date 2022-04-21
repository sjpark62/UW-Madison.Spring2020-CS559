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

  let shaderMat = shaderMaterial("./shaders/dots.vs", "./shaders/5-2.fs", {
    side: T.DoubleSide,
    uniforms: {
      radius: { value: 0.3 },
      dots: { value: 4.0 },
      light: { value: new T.Vector3(1, 1, 1) },
      dark: { value: new T.Vector3(0.2, 0.2, 0.7) },
    },
  });

  let s1 = new InputHelpers.LabelSlider("dots", {
    width: 400,
    min: 1,
    max: 20,
    step: 0.5,
    initial: 4,
    where: mydiv,
  });
  let s2 = new InputHelpers.LabelSlider("radius", {
    width: 400,
    min: 0.1,
    max: 0.5,
    step: 0.01,
    initial: 0.2,
    where: mydiv,
  });

  function onchange() {
    shaderMat.uniforms.dots.value = s1.value();
    shaderMat.uniforms.radius.value = s2.value();
  }
  s1.oninput = onchange;
  s2.oninput = onchange;
  onchange();

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go();
}
Helpers.onWindowOnload(test);
