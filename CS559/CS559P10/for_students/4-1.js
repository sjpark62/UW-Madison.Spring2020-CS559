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
    let world = new GrWorld({ where: parentOfCanvas, groundplane:false });
    
    let singleSphere = new GrSingleSphere();
    world.add(singleSphere);

    let ctl = new T.CubeTextureLoader().load([
        "skyLeft.jpg", "skyRight.jpg",
        "skyTop.jpg", "skyBottom.jpg",
        "skyFront.jpg", "skyBack.jpg"
    ]);


    let boxGeom = new T.BoxGeometry(100,100,100);
    let material = new T.MeshBasicMaterial({envMap: ctl, side: T.DoubleSide});

    
    let sky = new T.Mesh(boxGeom, material);
   // let skyBox = new GrObject("default:", sky);

    singleSphere.objects.forEach(element => {
        element.translateY(1);
      });
    world.scene.add(sky);

    world.go();
}
Helpers.onWindowOnload(test);