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
class GrNormalWooBox extends GrObject
{
    constructor()
    {
        let geoBox = new T.BoxGeometry(3, 3, 0.1);
        let texture = new T.TextureLoader().load("./Textures/Painting.jpg");
        let matBox = new T.MeshStandardMaterial({map: texture, normalMap: texture});
        let normalWoodBox = new T.Mesh(geoBox, matBox);
        super("normalWoodBox", normalWoodBox);
    }
}
class GrBumpWoodBox extends GrObject
{
    constructor()
    {
        //let geoSphere = new T.SphereGeometry(0.7, 30, 30);
        let geoBox = new T.BoxGeometry(3, 3, 0.1);
        let texture = new T.TextureLoader().load("./Textures/dandelion.jpg");
        let matBox = new T.MeshStandardMaterial({map: texture, bumpMap: texture});
        let bumpWoodBox = new T.Mesh(geoBox, matBox);
        super("normalWoodBox", bumpWoodBox);
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
    let normalWoodBox = new GrNormalWooBox();
    normalWoodBox.objects[0].translateY(1.5);
    normalWoodBox.objects[0].translateX(-2);
    spin(normalWoodBox, 0.5);
    let bumpWoodBox = new GrBumpWoodBox();
    bumpWoodBox.objects[0].translateY(1.5);
    bumpWoodBox.objects[0].translateX(2);
    spin(bumpWoodBox, 0.5);
    world.add(bumpWoodBox);
    world.add(normalWoodBox);

    world.go();
}
Helpers.onWindowOnload(test);