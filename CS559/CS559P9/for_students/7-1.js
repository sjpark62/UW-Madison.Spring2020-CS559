/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {Car} from "../for_students/7-car.js";

// your vehicles are defined in another file... you should import them
// here

function test() {
  let world = new GrWorld();

  let car = new Car();
  
  world.add(car);
  

  world.go();
}
Helpers.onWindowOnload(test);
