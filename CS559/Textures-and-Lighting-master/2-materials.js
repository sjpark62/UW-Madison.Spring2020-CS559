/*jshint esversion: 6 */
// @ts-check

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

// get things we may need
import { GrWorld } from "./Framework/GrWorld.js";
import { GrObject } from "./Framework/GrObject.js";
import * as InputHelpers from "./Libs/inputHelpers.js";
import * as Helpers from "./Libs/helpers.js";

class GrMetalSphere extends GrObject
{
    constructor()
    {
        let geoSphere = new T.SphereGeometry(0.7, 30, 30);
        let texture = new T.TextureLoader().load("./Textures/metal.jpg")
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
    let metalSphere = new GrMetalSphere();
    metalSphere.objects[0].translateY(0.7);
    spin(metalSphere, 0.5);
    world.add(metalSphere);
    world.go();
}
Helpers.onWindowOnload(test);