/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {GrCube} from "../libs/CS559-Framework/SimpleObjects.js"; 


function test() {
    let world = new GrWorld();
    let texture = new T.CubeTextureLoader().load([
        "skyLeft.jpg", "skyRight.jpg",
        "skyTop.jpg", "skyBottom.jpg",
        "skyFront.jpg", "skyBack.jpg"
    ]);

    let mat = new T.MeshStandardMaterial({ envMap: texture, metalness:.8, roughness:0.1 });

    world.scene.background = texture;
    // Another camera
    let cubecam = new T.CubeCamera(1,1000,128);
    cubecam.position.y = 2;
    mat.envMap = cubecam.renderTarget.texture;
    // The another scene for off-screen rendering
    let rtScene = new T.Scene();
    // Directional light for another scene
    let rtLight = new T.DirectionalLight("white");
    rtLight.position.set(1, 1, 1);
    rtScene.add(rtLight);
    // An object in the off-screen scene
   
    let geoSphere = new T.SphereGeometry(5, 30, 30);
    let Sphere = new T.Mesh(geoSphere, mat);
    Sphere.position.z = -10;
    Sphere.position.y = 1;
    Sphere.scale.set(0.5, 0.5, 0.5);
    rtScene.add(Sphere);
    // A spot light to make the sphere brighter
    let rtSpot = new T.SpotLight("white", 1);
    rtSpot.position.set(0, 6, 0);
    rtSpot.target = Sphere;
    rtScene.add(rtSpot);
    // a moving thing
    let cube2 = new GrCube({x:0, y:.5, z:1, color:"blue"});
    world.add(cube2);
    let t=0;
    cube2.tick = function(delta) { t+=delta; cube2.objects[0].position.x = 3*Math.sin(t/500);}

    world.scene.add(rtScene);

    // Animation
    function loop()
    {
        world.animate();
        window.requestAnimationFrame(loop);
        // rotate the sphere in another scene
        Sphere.rotation.y += 0.01;
        Sphere.rotation.x += 0.01;
        // render-to-texture
        cubecam.update(world.renderer,world.scene);
        // render
        world.draw();
    }
    loop();
}
Helpers.onWindowOnload(test);