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

class GrSingleBox extends GrObject
{
    constructor(color, texture)
    {
        let geoBox = new T.BoxGeometry(2, 2, 2);
        let matBox = new T.MeshStandardMaterial({color: color, map: texture});
        let box = new T.Mesh(geoBox, matBox);
        box.translateY(1);
        super("p7-tours", box);
        this.advance = function(delta, timeOfDay)
        {
            box.rotateY(0.0007 * delta);
        }
    }
}

function test() {
    let world = new GrWorld();
    // Another camera
    let myCamera = new T.PerspectiveCamera();
    // The another scene for off-screen rendering
    let rtScene = new T.Scene();
    // Store as texture
    let rt = new T.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    // Directional light for another scene
    let rtLight = new T.DirectionalLight("white");
    rtLight.position.set(1, 1, 1);
    rtScene.add(rtLight);
    // An object in the off-screen scene
    let texture = new T.TextureLoader().load("./Textures/beach_sphere.jpg");
    let matBeach = new T.MeshStandardMaterial({map: texture, normalMap: texture,
        emissive: "white", emissiveMap: texture});
    let geoSphere = new T.SphereGeometry(5, 30, 30);
    let beachSphere = new T.Mesh(geoSphere, matBeach);
    beachSphere.position.z = -10;
    beachSphere.scale.set(0.5, 0.5, 0.5);
    rtScene.add(beachSphere);
    // A spot light to make the sphere brighter
    let rtSpot = new T.SpotLight("white", 1);
    rtSpot.position.set(0, 6, 0);
    rtSpot.target = beachSphere;
    rtScene.add(rtSpot);
    // the background of another scene
    let matBlue = new T.MeshBasicMaterial({color: "#EC407A"});
    let geoPlane = new T.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
    let plane = new T.Mesh(geoPlane, matBlue);
    plane.position.z = -15;
    rtScene.add(plane);
    // Generate a cube in the world
    let box = new GrSingleBox(null, rt.texture);
    world.add(box);
    // Animation
    function loop()
    {
        world.animate();
        window.requestAnimationFrame(loop);
        // rotate the sphere in another scene
        beachSphere.rotation.y += 0.01;
        beachSphere.rotation.x += 0.01;
        // render-to-texture
        world.renderer.render(rtScene, myCamera, rt);
        // render
        world.draw();
    }
    loop();
}
Helpers.onWindowOnload(test);