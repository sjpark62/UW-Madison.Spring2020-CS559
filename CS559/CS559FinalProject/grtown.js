/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 * 
 * This is the main file - it creates the world, populates it with 
 * objects and behaviors, and starts things running
 * 
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 * 
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrWorld } from "./Framework/GrWorld.js";
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import { WorldUI } from "./Framework/WorldUI.js";
import { GrPyramidHipHouse, GrCrossHipped, GrSkyscraper } from "./Examples/myBuildings.js";
import { GrAirplane1, GrAirplane2, GrHelipad, GrCarousel, GrBalloon, GrCar, GrTrack, GrCar2, GrCar3 } from "./Examples/moving.js";
import { GrTree, GrFlower, GrSnow, GrBall } from "./Examples/myEvn.js";
/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "./Examples/house.js";
import {CircularTrack, TrackCube, TrackCar} from "./Examples/track.js";
import {Helicopter, Helipad} from "./Examples/helicopter.js";

/**
 * The Graphics Town Main - 
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1500, height:800,         // make the window reasonably large
        groundplanesize:30              // make the ground plane big enough for a world of stuff
    });

    // put stuff into it - you probably want to take the example stuff out first


    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/
    
    // Add house into the town
    for (let i = -23; i < 32; i += 7)
    {
        if (i === -9 || i === 12)
            world.add(new GrCrossHipped({x: i - 2, z: -17, size: 3}));
        else
            world.add(new GrPyramidHipHouse({x: i, z: -20, size: 3}));
        if (i === -23 || i === -2 || i === 19)
            world.add(new GrCrossHipped({x: i - 2, z: 20, size:3}));
        else
            world.add(new GrPyramidHipHouse({x: i, z: 17, size:3}));
    }

    // Add a skyscraper
    world.add(new GrSkyscraper({x: 0, z: -23,rotate: Math.PI / 2}));
    
    // Add helipads for one airplane' moving
    world.add(new GrHelipad(-25, 0.5, 27, 1));
    world.add(new GrHelipad(25, 0.5, 27, 1));
    world.add(new GrHelipad(0, 0.5, -27, 1));

    // Add an airplane moving around the town in the sky
    world.add(new GrAirplane1());

    // Add a merry-go-around
    world.add(new GrCarousel({x: 25, size: 1.5}));

    // Add a balloon
    world.add(new GrBalloon({x: 13, y: 10, r: 3}));

    // Add train track
    let track = new GrTrack();

    // Add a "train" made up by three car, the cars move along the track
    let car = new GrCar(track);
    let car2 = new GrCar2(track);
    let car3 = new GrCar3(track);
    car.u = 0.25;
    car2.u = 0.125;
    world.add(track);
    world.add(car);
    world.add(car2);
    world.add(car3);

    // Add another airplane, moving between helipads
    let airplane = new GrAirplane2();
    world.add(airplane);
    airplane.getPads(world.objects);

    // Add plants (trees and flowers)
    world.add(new GrTree({x: -25, z: 10, s: 1.5}));
    world.add(new GrTree({x: -25, z:-10, s: 1.5}));
    world.add(new GrFlower({x:-22, z: -7, s: 1.2}));
    world.add(new GrFlower({x: -22, z: 7, s: 1.2}));

    // Make the town snowing
    world.add(new GrSnow());

    // Add a sign at the center of the town
    world.add(new GrBall());
    
    /** EXAMPLES - end - things after this should stay                      */
    /********************************************************************** */

    // build and run the UI

    // only after all the objects exist can we build the UI
    // @ts-ignore       // we're sticking a new thing into the world
    world.ui = new WorldUI(world);
    // now make it go!
    world.go();
}
Helpers.onWindowOnload(grtown);