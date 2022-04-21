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
    let world = new GrWorld({groundplane: null});
    let loader = new T.CubeTextureLoader();
    loader.setPath('./Textures/');
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