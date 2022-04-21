/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "../Framework/GrObject.js";

let Colors = {
    brown: 0x6D4C41,
    lightGreen: 0x9CCC65,
    darkGreen: 0x689F38,
    yellow: 0xFDD835
};

let GrTreeCount = 0;
export class GrTree extends GrObject
{
    constructor(params = {})
    {
        let tree = new T.Group();
        let treeGeo = new T.BoxGeometry(1, 1, 1);
        let leafTexture = new T.TextureLoader().load("./Textures/leaf.jpg");
        let leafMat = new T.MeshStandardMaterial({map: leafTexture, normalMap: leafTexture});
        let trunkMat = new T.MeshLambertMaterial({color: Colors.brown});
        
        let trunk = new T.Mesh(treeGeo, trunkMat);
        trunk.position.set(0, 0, 0);
        trunk.scale.set(0.8, 3, 0.8);
        tree.add(trunk);

        let leafL1 = new T.Mesh(treeGeo, leafMat);
        leafL1.position.set(0, 1.4, 0);
        leafL1.scale.set(4, .4, 2);
        tree.add(leafL1);

        let leafL2 = new T.Mesh(treeGeo, leafMat);
        leafL2.position.set(0, 1.8, 0);
        leafL2.scale.set(3.5, .4, 2);
        tree.add(leafL2);

        let leafL3 = new T.Mesh(treeGeo, leafMat);
        leafL3.position.set(0, 2.2, 0);
        leafL3.scale.set(3, .4, 2);
        tree.add(leafL3);

        let leafL4 = new T.Mesh(treeGeo, leafMat);
        leafL4.position.set(0, 2.6, 0);
        leafL4.scale.set(2.5, .4, 2);
        tree.add(leafL4);
        
        let leafL5 = new T.Mesh(treeGeo, leafMat);
        leafL5.position.set(0, 3, 0);
        leafL5.scale.set(2, .4, 2);
        tree.add(leafL5);

        let leafL6 = new T.Mesh(treeGeo, leafMat);
        leafL6.position.set(0, 3.4, 0);
        leafL6.scale.set(1.5, .4, 2);
        tree.add(leafL6);

        let leafL7 = new T.Mesh(treeGeo, leafMat);
        leafL7.position.set(0, 3.4, 0);
        leafL7.scale.set(1, .4, 2);
        tree.add(leafL7);

        let leafL8 = new T.Mesh(treeGeo, leafMat);
        leafL8.position.set(0, 3.8, 0);
        leafL8.scale.set(.5, .4, 2);
        tree.add(leafL8);

        tree.translateY(1.5);
        tree.rotateY(Math.PI / 2);
        tree.position.x = params.x || 0;
        tree.position.z = params.z || 0;
        let s = params.s || 1;
        tree.scale.set(s, s, s);
        tree.translateY(0.6);
        super(`tree-${++GrTreeCount}`, tree);
        this.tree = tree;
    }
}

let GrFlowerCount = 0;
export class GrFlower extends GrObject
{
    constructor(params = {})
    {
        let flower = new T.Group();
        let basicGeo = new T.BoxGeometry(1, 1, 1);
        let potMat = new T.MeshLambertMaterial({color: Colors.brown});
        let petalMat = new T.MeshLambertMaterial({color: Colors.yellow});
        let leafMat = new T.MeshLambertMaterial({color: Colors.lightGreen});
        
        let pot = new T.Mesh(basicGeo, potMat);
        pot.position.set(0, 0, 0);
        pot.scale.set(2, 1.2, 2);
        flower.add(pot);

        let leaf = new T.Group();
        flower.add(leaf);
        let l1 = new T.Mesh(basicGeo, leafMat);
        l1.position.set(0, 1, 0);
        l1.scale.set(.4, 1.2, .4);
        leaf.add(l1);
        let l2 = new T.Mesh(basicGeo, leafMat);
        l2.position.set(0, 1.6, 0);
        l2.scale.set(2, .4, .4);
        leaf.add(l2);
        let l3 = new T.Mesh(basicGeo, leafMat);
        l3.position.set(0, 1.6, 0);
        l3.scale.set(1.5, .4, .4);
        l3.rotateY(Math.PI / 4);
        leaf.add(l3);

        let petal = new T.Group();
        flower.add(petal);
        let p1 = new T.Mesh(basicGeo, petalMat);
        p1.position.set(0, 1.9, 0);
        p1.scale.set(.3, .3, .3);
        petal.add(p1);
        let p2 = new T.Mesh(basicGeo, petalMat);
        p2.position.set(0, 2.2, 0);
        p2.scale.set(.3, .3, .3);
        petal.add(p2);
        let p3 = new T.Mesh(basicGeo, petalMat);
        p3.position.set(0.2, 2.1, -0.2);
        p3.scale.set(.3, .3, .3);
        petal.add(p3);
        let p4 = new T.Mesh(basicGeo, petalMat);
        p4.position.set(-0.2, 2.1, 0.2);
        p4.scale.set(.3, .3, .3);
        petal.add(p4);
        let p5 = new T.Mesh(basicGeo, petalMat);
        p5.position.set(0.1, 2.3, 0.1);
        p5.scale.set(.3, .3, .3);
        petal.add(p5);
        let p6 = new T.Mesh(basicGeo, petalMat);
        p6.position.set(-0.1, 2.2, -0.15);
        p6.scale.set(.3, .3, .3);
        petal.add(p6);
        let p7 = new T.Mesh(basicGeo, petalMat);
        p7.position.set(0, 2.5, 0);
        p7.scale.set(.3, .3, .3);
        petal.add(p7);
        let p8 = new T.Mesh(basicGeo, petalMat);
        p8.position.set(0, 2.8, 0);
        p8.scale.set(.3, .3, .3);
        petal.add(p8);
        let p9 = new T.Mesh(basicGeo, petalMat);
        p9.position.set(0.2, 2.6, -0.2);
        p9.scale.set(.35, .35, .35);
        petal.add(p9);
        let p10 = new T.Mesh(basicGeo, petalMat);
        p10.position.set(-0.1, 2.7, -0.1);
        p10.scale.set(.35, .35, .35);
        petal.add(p10);

        flower.translateY(0.6);
        flower.position.x = params.x || 0;
        flower.position.z = params.z || 0;
        let s = params.s || 1;
        flower.scale.set(s, s, s);
        super(`flower-${++GrFlowerCount}`, flower);
    }
}

export class GrSnow extends GrObject
{
    constructor()
    {
        let drops = 20000;
        let dropTex = new T.TextureLoader().load("./Textures/drop1.png");
        let dropMat = new T.PointCloudMaterial({
            color: "white",
            size: 1.0,
            map: dropTex,
            blending: T.AdditiveBlending,
            transparent: true,
        });
        let dropGeo = new T.Geometry();
        for (let i = 0; i < drops; i++)
        {
            let drx = Math.random() * 250 - 100,
                dry = Math.random() * 250 - 100,
                drz = Math.random() * 250 - 100,
                drop = new T.Vector3(drx, dry, drz);
            dropGeo.vertices.push(drop);
        }
        let rain = new T.PointCloud(dropGeo, dropMat);
        super(`rain`, rain);
        let speed = Math.random() * 0.1;
        this.advance = function(delta, timeOfDay)
        {
            rain.rotation.y += 0.00007 * delta;
            let drc = drops;
            while(drc--)
            {
                let drop = dropGeo.vertices[drc];
                if (drop.y < -100)
                {
                    drop.y = 200;
                }
                drop.y -= speed;
            }
            if (drc === 0) drc = drops;
            dropGeo.verticesNeedUpdate = true;
        }
        
    }
}
let DiscoColor = {
    red: 0xff0033,
    blue: 0x0066ff,
    green: 0x00ff66,
    orange: 0xffaa00,
    cyan: 0x99ffff,
    lime: 0xccff00,
    silver: 0x808080
};
export class GrBall extends GrObject
{
    constructor()
    {   
        let discoBall = new T.Group();
        super("ball", discoBall);
        let dot = new T.SphereGeometry(0.25, 16, 8);
        let l1 = new T.PointLight(DiscoColor.red, 3, 100, 2);
        l1.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.red})));
        discoBall.add(l1);

        let l2 = new T.PointLight(DiscoColor.blue, 3, 100, 2);
        l2.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.blue})));
        discoBall.add(l2);

        let l3 = new T.PointLight(DiscoColor.green, 3, 100, 2);
        l3.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.green})));
        discoBall.add(l3);

        let l4 = new T.PointLight(DiscoColor.orange, 3, 100, 2);
        l4.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.orange})));
        discoBall.add(l4);

        let l5 = new T.PointLight(DiscoColor.cyan, 3, 100, 2);
        l5.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.cyan})));
        discoBall.add(l5);

        let l6 = new T.PointLight(DiscoColor.lime, 3, 100, 2);
        l6.add(new T.Mesh(dot, new T.MeshBasicMaterial({color: DiscoColor.lime})));
        discoBall.add(l6);

        let ballGeo = new T.SphereGeometry(5, 30, 20);
        let ballMat = new T.MeshPhongMaterial({
            //emissive: "#FFCCCC",
            shininess: 60,
            reflectivity: 4.0,
            specular: DiscoColor.silver,
            color: DiscoColor.silver,
            side: T.DoubleSide,
            combine: T.AddOperation,
        });
        let ball = new T.Mesh(ballGeo, ballMat);
        discoBall.add(ball);
        discoBall.translateY(5);
        let time = 0;
        this.advance = function(delta, timeOfDay)
        {
            time += delta / 2000;
            ball.rotation.y += 0.005;
            ball.rotation.z += 0.003;
            ball.rotation.x += 0.007;
            
            l1.position.x = Math.cos(time * 0.3) * 80;
            l1.position.y = Math.cos(time * 0.1) * 80;
            l1.position.z = Math.cos(time * 0.7) * 80;

            l2.position.x = Math.cos(time * 0.6) * 80;
            l2.position.y = Math.cos(time * 0.2) * 80;
            l2.position.z = Math.cos(time * 0.9) * 80;

            l3.position.x = Math.cos(time * 0.4) * 80;
            l3.position.y = Math.cos(time * 0.1) * 80;
            l3.position.z = Math.cos(time * 0.6) * 80;

            l4.position.x = Math.cos(time * 0.2) * 80;
            l4.position.y = Math.cos(time * 0.1) * 80;
            l4.position.z = Math.cos(time * 0.7) * 80;

            l5.position.x = Math.cos(time * 0.7) * 80;
            l5.position.y = Math.cos(time * 0.4) * 80;
            l5.position.z = Math.cos(time * 0.6) * 80;

            l6.position.x = Math.cos(time * 0.3) * 80;
            l6.position.y = Math.cos(time * 0.1) * 80;
            l6.position.z = Math.cos(time * 0.8) * 80;

            ball.visible = true;
        }
    }
}