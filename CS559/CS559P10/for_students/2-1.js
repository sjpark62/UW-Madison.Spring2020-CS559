/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

class GrSphere extends GrObject
{
    constructor()
    {
        let geoSphere = new T.SphereGeometry(0.7, 30, 30);
        let texture = new T.TextureLoader().load("../for_students/metal.jpg")
        let matSphere = new T.MeshStandardMaterial({map: texture, roughnessMap: texture, metalnessMap: texture});
        let sphere = new T.Mesh(geoSphere, matSphere);
        super("forestSphere", sphere);
    }
}
function spin(grObj, speed)
{
    grObj.advance = function (delta, timeOfDay)
    {
        grObj.objects[0].rotateY(speed * delta / 1000 * Math.PI);
    };
    return grObj;
}
function test() {
    let world = new GrWorld();
    let metalSphere = new GrSphere();
    metalSphere.objects[0].translateY(0.7);
    spin(metalSphere, 0.5);
    world.add(metalSphere);
    world.go();
}
Helpers.onWindowOnload(test);