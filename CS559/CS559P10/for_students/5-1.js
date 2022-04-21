/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

class GrSphereInEnv extends GrObject
{
    constructor(material)
    {
        let geoSphere = new T.SphereGeometry(4, 30, 30);
        let sphere = new T.Mesh(geoSphere, material);
        super("SphereInEnv", sphere);
    }
}
function test() {
    let parentOfCanvas = document.getElementById("div1");
    let world = new GrWorld({ groundplane: null, where: parentOfCanvas });
  
    let loader = new T.CubeTextureLoader();
    loader.setPath('../for_students/');
    let envTexture = loader.load([
        "skyLeft.jpg", "skyRight.jpg",
        "skyTop.jpg", "skyBottom.jpg",
        "skyFront.jpg", "skyBack.jpg"
    ]);
    world.scene.background = envTexture;
    let sphere = new GrSphereInEnv(new T.MeshLambertMaterial({envMap: envTexture}));
    world.add(sphere);
    world.go();
}
Helpers.onWindowOnload(test);

