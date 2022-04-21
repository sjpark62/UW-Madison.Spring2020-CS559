/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

const s2 = Math.sqrt(2) / 2;

class TwoTriangles extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new T.Face3(0, 1, 2);
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.computeFaceNormals();
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let mesh = new T.Mesh(geometry, material);
    super("TwoTriangles1", mesh);
  }
}

class TwoNormalTriangles extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new T.Face3(0, 1, 2);
    f1.vertexNormals[0] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[1] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[2] = new T.Vector3(-s2, 0, s2);
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 3, 2);
    f2.vertexNormals[0] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[1] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[2] = new T.Vector3(s2, 0, s2);
    geometry.faces.push(f2);
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let mesh = new T.Mesh(geometry, material);
    super("TwoTriangles2", mesh);
  }
}

class TwoSmoothTriangles extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    //
    let f1 = new T.Face3(0, 1, 2);
    f1.vertexNormals[0] = new T.Vector3(-s2, 0, s2);
    f1.vertexNormals[1] = new T.Vector3(0, 0, 1);
    f1.vertexNormals[2] = new T.Vector3(0, 0, 1);
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 3, 2);
    f2.vertexNormals[0] = new T.Vector3(0, 0, 1);
    f2.vertexNormals[1] = new T.Vector3(s2, 0, s2);
    f2.vertexNormals[2] = new T.Vector3(0, 0, 1);
    geometry.faces.push(f2);
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let mesh = new T.Mesh(geometry, material);
    super("TwoTriangles3", mesh);
  }
}

function shift(grobj, x) {
  grobj.objects[0].translateX(x);
  return grobj;
}

function test() {
  let mydiv = document.getElementById("div1");

  let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
  if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
  }

  InputHelpers.makeHead(
    "Three Different Normals (computed, face, vertex)",
    box
  );

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });

  let tt = shift(new TwoTriangles(), -3);
  world.add(tt);
  // new AutoUI(tt);

  let t2 = shift(new TwoNormalTriangles(), 0);
  world.add(t2);
  // new AutoUI(t2);

  let t3 = shift(new TwoSmoothTriangles(), 3);
  world.add(t3);
  // new AutoUI(t3);

  let div = InputHelpers.makeBoxDiv({}, box);

  let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });
  sl.oninput = function(evt) {
    let v = sl.value();
    tt.objects[0].rotation.y = v;
    t2.objects[0].rotation.y = v;
    t3.objects[0].rotation.y = v;
  };

  InputHelpers.makeBreak(box);

  world.go();
}
Helpers.onWindowOnload(test);
