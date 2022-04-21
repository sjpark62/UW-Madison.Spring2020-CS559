/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

class GrNormalWooBox extends GrObject
{
    constructor()
    {
        let geoBox = new T.BoxGeometry(3, 3, 0.1);
        let texture = new T.TextureLoader().load("../for_students/Painting.jpg");
        let matBox = new T.MeshStandardMaterial({map: texture, normalMap: texture});
        let normalWoodBox = new T.Mesh(geoBox, matBox);
        super("normalWoodBox", normalWoodBox);
    }
}
class GrBumpWoodBox extends GrObject
{
    constructor()
    {
        let geoBox = new T.BoxGeometry(3, 3, 0.1);
        let texture = new T.TextureLoader().load("../for_students/dandelion.jpg");
        let matBox = new T.MeshStandardMaterial({map: texture, bumpMap: texture});
        let bumpWoodBox = new T.Mesh(geoBox, matBox);
        super("normalWoodBox", bumpWoodBox);
    }
}
function spin(grObj, speed)
{
    grObj.tick = function (delta, timeOfDay)
    {
        grObj.objects[0].rotateY(speed * delta / 1000 * Math.PI);
    };
    return grObj;
}
function test() {
    let world = new GrWorld();
    //left box
    let normalWoodBox = new GrNormalWooBox();
    normalWoodBox.objects[0].translateY(1.5);
    normalWoodBox.objects[0].translateX(-2);
    spin(normalWoodBox, 0.5);
    //right box
    let bumpWoodBox = new GrBumpWoodBox();
    bumpWoodBox.objects[0].translateY(1.5);
    bumpWoodBox.objects[0].translateX(2);
    spin(bumpWoodBox, 0.5);
    world.add(bumpWoodBox);
    world.add(normalWoodBox);

    world.go();
}
Helpers.onWindowOnload(test);