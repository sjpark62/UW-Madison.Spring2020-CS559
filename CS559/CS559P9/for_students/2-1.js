/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

/*
 * Define your 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, you need to modify the world code below to make the
 * world bigger and space the objects out differently.
 */
const s2 = Math.sqrt(2) / 2;

class Object1 extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(1,1,1));
    geometry.vertices.push(new T.Vector3(0,0,1));

    //
    let f1 = new T.Face3(0, 1, 2);
    f1.vertexColors[0] = new T.Color("red"); // 0
    f1.vertexColors[1] = new T.Color("yellow"); // 1
    f1.vertexColors[2] = new T.Color("white"); // 2
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 3, 2);
    f2.vertexColors[0] = new T.Color("yellow"); // 1
    f2.vertexColors[1] = new T.Color("green"); // 3
    f2.vertexColors[2] = new T.Color("white"); // 2
    geometry.faces.push(f2);

    let f3 = new T.Face3(3,0,2);
    f3.vertexColors[0] = new T.Color("green");
    f3.vertexColors[1] = new T.Color("yellow");
    f3.vertexColors[2] = new T.Color("red");
    geometry.faces.push(f3);

    geometry.computeFaceNormals();
    //
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: T.VertexColors
    });
    let mesh = new T.Mesh(geometry, material);
    super("TwoTriangles3", mesh);
}
}

class Object2 extends GrObject {
  constructor() {
    let geometry = new T.Geometry();

    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));

    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));

    geometry.vertices.push(new T.Vector3(1,1,1));
    geometry.vertices.push(new T.Vector3(0,0,1));

    let f1 = new T.Face3(0, 1, 2);
    f1.color.setStyle("green");
    geometry.faces.push(f1);
    let f2 = new T.Face3(1, 3, 2);
    f2.color.setStyle("blue");
    geometry.faces.push(f2);
    let f3= new T.Face3(3,0,2);
    f3.color.setStyle("red");
    geometry.faces.push(f3);
    geometry.computeFaceNormals();
    //
    let material = new T.MeshStandardMaterial({
      roughness: 0.75,
      vertexColors: T.FaceColors
    });
    let mesh = new T.Mesh(geometry, material);
    super("triangle2", mesh);
  }
}
class Object3 extends GrObject {
  constructor() {
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(1,2,1));
    geometry.vertices.push(new T.Vector3(2,3,1));
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
    let f3= new T.Face3(3,0,2);
    f3.vertexNormals[0] = new T.Vector3(0, 0, 1);
    f3.vertexNormals[1] = new T.Vector3(0, 0, 1);
    f3.vertexNormals[2] = new T.Vector3(0, 0, 1);
    geometry.faces.push(f3);
    //
    let material = new T.MeshStandardMaterial({
      color: "yellow",
      roughness: 0.75
    });
    let mesh = new T.Mesh(geometry, material);
    super("Triangles3", mesh);
  }
}

// translate an object in the X direction
function shift(grobj, x) {
    grobj.objects.forEach(element => {
        element.translateX(x);
    });
  return grobj;
}

// Set the Object's Y rotate
function roty(grobj, ry) {
    grobj.objects.forEach(element => {
        element.rotation.y = ry;
    });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * If you don't follow this convention, you will need to modify
 * the code below.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
function test() {
  let mydiv = document.getElementById("div1");

  let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
  if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
  }
  InputHelpers.makeHead("Three Different Objects", box);

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
  let tt = shift(new Object1(), -3);
  world.add(tt);

  let t2 = shift(new Object2(), 0);
  world.add(t2);

  let t3 = shift(new Object3(), 3);
  world.add(t3);

  let div = InputHelpers.makeBoxDiv({}, box);

  let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

  InputHelpers.makeBreak(box);

  sl.oninput = function(evt) {
    let v = sl.value();
    roty(tt,v);
    roty(t2,v);
    roty(t3,v);
  };

  world.go();
}
Helpers.onWindowOnload(test);
