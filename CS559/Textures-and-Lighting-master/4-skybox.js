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

class GrSingleSphere extends GrObject
{
    constructor()
    {
        let geoSphere = new T.SphereGeometry(0.7, 30, 30);
        let texture = new T.TextureLoader().load("./Textures/wood_sphere.jpg");
        let matSphere = new T.MeshStandardMaterial({map: texture, roughnessMap:texture,
            normalMap: texture});
        let sphere = new T.Mesh(geoSphere, matSphere);
        sphere.translateY(0.7);
        super("singleSphere", sphere);
    }
}
function test() {
    let world = new GrWorld();
    let singleSphere = new GrSingleSphere();
    world.add(singleSphere);
    let loader = new T.CubeTextureLoader();
    loader.setPath('./Textures/');
    world.scene.background = loader.load([
        "skyLeft.jpg", "skyRight.jpg",
        "skyTop.jpg", "skyBottom.jpg",
        "skyFront.jpg", "skyBack.jpg"
    ]);
    world.go();
}
Helpers.onWindowOnload(test);