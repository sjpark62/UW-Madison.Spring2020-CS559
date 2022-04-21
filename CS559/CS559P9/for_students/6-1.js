/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { PyramidHipHouse, OpenGableHouse, FlatHouse } from "./6-buildings.js";

// your buildings are defined in another file... you should import them
// here

function test() {
  let world = new GrWorld();

    // place your buildings and trees into the world here
    const pyramidHipHouse1 = new PyramidHipHouse({ x: 2, z: 2 });
    world.add(pyramidHipHouse1);
    const openGableHouse1 = new OpenGableHouse({ x: 2, z: -2 });
    world.add(openGableHouse1);
    const flatHouse1 = new FlatHouse({ x: -2, z: -2 });
    world.add(flatHouse1);


  world.go();
}
Helpers.onWindowOnload(test);
