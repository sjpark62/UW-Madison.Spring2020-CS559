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

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-THREE/src/Three.js";
import {GrObject } from "../libs/CS559-Framework/GrObject.js";  // only for typing
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import {shaderMaterial} from "../libs/CS559-Framework/shaderHelper.js";

/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "../examples/house.js";
import {CircularTrack, TrackCube, TrackCar} from "../examples/track.js";
import {Helicopter, Helipad} from "../examples/helicopter.js";

import { GrPyramidHipHouse, GrCrossHipped, GrSkyscraper } from "../Examples/myBuildings.js";
import { GrAirplane1, GrAirplane2, GrHelipad, GrCarousel, GrBalloon, GrCar, GrTrack, GrCar2, GrCar3 } from "../Examples/moving.js";
import { GrTree, GrFlower, GrSnow, GrBall } from "../Examples/myEvn.js";


/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1500, height:800,         // make the window reasonably large
        groundplane: null,
        groundplanesize:0           // make the ground plane big enough for a world of stuff
    });

    // put stuff into it - you probably want to take the example stuff out first


    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/
    
    //***** SKYBOX *****//
    let cubemap = new T.CubeTextureLoader()
    .setPath('./Examples/')
    .load([
        'skybox_front.jpg', 'skybox_back.jpg',
        'skybox_up.jpg', 'skybox_down.jpg',
        'skybox_right.jpg', 'skybox_left.jpg',
    ]);
    cubemap.format = T.RGBFormat;
    world.scene.background = cubemap;

        //***** TERRAIN *****//
	let bumpTexture = new T.TextureLoader().load( './Examples/heightmap.png' );
	bumpTexture.wrapS = bumpTexture.wrapT = T.RepeatWrapping; 
	let bumpScale   = 10.0;
	
	let oceanTexture = new T.TextureLoader().load( '../Examples/water.jpg' );
	oceanTexture.wrapS = oceanTexture.wrapT = T.RepeatWrapping; 
	
	let sandyTexture = new T.TextureLoader().load( '../Examples/sand.jpg' );
	sandyTexture.wrapS = sandyTexture.wrapT = T.RepeatWrapping; 
	
	let grassTexture = new T.TextureLoader().load( '../Examples/grass.jpg' );
	grassTexture.wrapS = grassTexture.wrapT = T.RepeatWrapping; 
	
	let rockyTexture = new T.TextureLoader().load( '../Examples/rock.jpg' );
	rockyTexture.wrapS = rockyTexture.wrapT = T.RepeatWrapping; 
	
	let snowyTexture = new T.TextureLoader().load( '../Examples/snow.jpg' );
	snowyTexture.wrapS = snowyTexture.wrapT = T.RepeatWrapping; 

	let customUniforms = {
		bumpTexture:	{ type: "t", value: bumpTexture },
		bumpScale:	    { type: "f", value: bumpScale },
		oceanTexture:	{ type: "t", value: oceanTexture },
		sandyTexture:	{ type: "t", value: sandyTexture },
		grassTexture:	{ type: "t", value: grassTexture },
		rockyTexture:	{ type: "t", value: rockyTexture },
		snowyTexture:	{ type: "t", value: snowyTexture },
    };
    
    var customMaterial = shaderMaterial("../examples/mountain.vs","../examples/mountain.fs",{
        uniforms: customUniforms,
        side: T.DoubleSide
    });

    let geometryPlane = new T.PlaneBufferGeometry(70, 70, 50, 50);
    let terrain = new GrObject("terrain", new T.Mesh( geometryPlane, customMaterial ));

    world.add(rotate(shift(terrain,0,-3.1,0),Math.PI/2,0,0));


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

function shift(grobj,x,y,z) {
    grobj.objects[0].translateX(x);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateZ(z);

    return grobj;
}

function rotate(grobj,x,y,z) {
    grobj.objects[0].rotateX(x);
    grobj.objects[0].rotateY(y);
    grobj.objects[0].rotateZ(z);

    return grobj;
}