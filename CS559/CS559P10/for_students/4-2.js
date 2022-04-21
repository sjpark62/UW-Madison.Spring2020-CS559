/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";


class GrSingleSphere extends GrObject
{
    constructor()
    {
        let geoSphere = new T.SphereGeometry(0.7, 30, 30);
        let texture = new T.TextureLoader().load("../for_students/wood_sphere.jpg");
        let matSphere = new T.MeshStandardMaterial({map: texture, roughnessMap:texture,
            normalMap: texture});
        let sphere = new T.Mesh(geoSphere, matSphere);
        sphere.translateY(0.7);
        super("singleSphere", sphere);
    }
}
function test() {
 
    let parentOfCanvas = document.getElementById("div1");
    let world = new GrWorld({ where: parentOfCanvas });
    world.go();

    let singleSphere = new GrSingleSphere();
    world.add(singleSphere);
    
    let loader = new T.CubeTextureLoader();
    loader.setPath('../for_students/');
    world.scene.background = loader.load([
        "skyLeft.jpg", "skyRight.jpg",
        "skyTop.jpg", "skyBottom.jpg",
        "skyFront.jpg", "skyBack.jpg"
    ]);
    world.go();
}
Helpers.onWindowOnload(test);