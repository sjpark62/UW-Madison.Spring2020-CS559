/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "../Framework/GrObject.js";

let GrPyramidHipHouseCount = 0;
let pyramidHipHouseGeo;
let pyramidHipHouseMat;
let pyramidHipHouseTexture;
export class GrPyramidHipHouse extends GrObject
{
    constructor(params = {})
    {
        if (!pyramidHipHouseGeo)
        {
            pyramidHipHouseGeo = new T.Geometry();
            pyramidHipHouseGeo.vertices.push(new T.Vector3(-1, 0, 1));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(-1, 1, 1));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(0, 1, 1));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(0, 0, 1));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(0, 0, 0));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(0, 1, 0));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(-1, 1, 0));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(-1, 0, 0));
            pyramidHipHouseGeo.vertices.push(new T.Vector3(-0.5, 1.5, 0.5));
            pyramidHipHouseGeo.faceVertexUvs = [ [] ];
            let r1 = new T.Vector2(0.75, 0.8),
                r2 = new T.Vector2(0.8, 0.85),
                r3 = new T.Vector2(0.8, 0.8),
                r4 = new T.Vector2(0.75, 0.85);
            // Front
            let f1 = new T.Face3(1, 0, 2);
            pyramidHipHouseGeo.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(0, 1), new T.Vector2(1, 0)]);
            pyramidHipHouseGeo.faces.push(f1);
            let f2 = new T.Face3(0, 3, 2);
            pyramidHipHouseGeo.faceVertexUvs[0].push([new T.Vector2(0, 1), new T.Vector2(1, 1), new T.Vector2(1, 0)]);
            pyramidHipHouseGeo.faces.push(f2);
            // Right
            let f3 = new T.Face3(3, 4, 2);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r1, r2, r3]);
            pyramidHipHouseGeo.faces.push(f3);
            let f4 = new T.Face3(4, 5, 2);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r2, r4, r3]);
            pyramidHipHouseGeo.faces.push(f4);
            // Left
            let f5 = new T.Face3(7, 0, 6);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r1, r2, r3]);
            pyramidHipHouseGeo.faces.push(f5);
            let f6 = new T.Face3(0, 1, 6);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r2, r4, r3]);
            pyramidHipHouseGeo.faces.push(f6);
            // Back face
            let f7 = new T.Face3(5, 4, 6);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r1, r2, r3]);
            pyramidHipHouseGeo.faces.push(f7);
            let f8 = new T.Face3(4, 7, 6);
            pyramidHipHouseGeo.faceVertexUvs[0].push([r2, r4, r3]);
            pyramidHipHouseGeo.faces.push(f8);
            // Bottom face
            let f9 = new T.Face3(0, 7, 3);
            pyramidHipHouseGeo.faces.push(f9);
            let f10 = new T.Face3(7, 4, 3);
            pyramidHipHouseGeo.faces.push(f10);
            // Top-front face
            let f11 = new T.Face3(8, 1, 2);
            pyramidHipHouseGeo.faces.push(f11);
            // Top-right face
            let f12 = new T.Face3(8, 2, 5);
            pyramidHipHouseGeo.faces.push(f12);
            // Top-back face
            let f13 = new T.Face3(8, 5, 6);
            pyramidHipHouseGeo.faces.push(f13);
            // Top-left face
            let f14 = new T.Face3(8, 6, 1);
            pyramidHipHouseGeo.faces.push(f14);
            pyramidHipHouseGeo.computeFaceNormals();
            pyramidHipHouseGeo.uvsNeedUpdate = true;
        }
        if (!pyramidHipHouseTexture)
        {
            pyramidHipHouseTexture = new T.TextureLoader().load("./Textures/door_and_windows.jpg");
            pyramidHipHouseTexture.flipY = false;
        }
        if (!pyramidHipHouseMat)
        {
            pyramidHipHouseMat = new T.MeshStandardMaterial({color: "white", 
                                                             map: pyramidHipHouseTexture, 
                                                             side: T.DoubleSide, 
                                                             roughness: 1});
        }
        let house = new T.Mesh(pyramidHipHouseGeo, pyramidHipHouseMat);
        house.translateX(params.x || 0);
        house.translateZ(params.z || 0);
        house.scale.set(params.size || 1, params.size || 1, params.size || 1);
        super(`pyramidHip-${++GrPyramidHipHouseCount}`, house);
    }
}

let GrCrossHippedCount = 0;
let crossHippedGeo;
let crossHippedMat;
let crossHippedTexture;
export class GrCrossHipped extends GrObject
{
    constructor(params = {})
    {
        if (!crossHippedGeo)
        {
            crossHippedGeo = new T.Geometry();
            crossHippedGeo.vertices.push(new T.Vector3(-1, 0, 1));
            crossHippedGeo.vertices.push(new T.Vector3(-1, 1, 1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 1, 1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 0, 1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 0, 0));
            crossHippedGeo.vertices.push(new T.Vector3(0, 1, 0));
            crossHippedGeo.vertices.push(new T.Vector3(1, 1, 0));
            crossHippedGeo.vertices.push(new T.Vector3(1, 0, 0));
            crossHippedGeo.vertices.push(new T.Vector3(1, 0, -1));
            crossHippedGeo.vertices.push(new T.Vector3(1, 1, -1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 1, -1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 0, -1));
            crossHippedGeo.vertices.push(new T.Vector3(0, 0, -2));
            crossHippedGeo.vertices.push(new T.Vector3(0, 1, -2));
            crossHippedGeo.vertices.push(new T.Vector3(-1, 1, -2));
            crossHippedGeo.vertices.push(new T.Vector3(-1, 0, -2));
            crossHippedGeo.vertices.push(new T.Vector3(-0.5, 1.5, 1));
            crossHippedGeo.vertices.push(new T.Vector3(-0.5, 1.5, -0.5));
            crossHippedGeo.vertices.push(new T.Vector3(-0.5, 1.5, -2));
            crossHippedGeo.vertices.push(new T.Vector3(1, 1.5, -0.5));
            crossHippedGeo.faceVertexUvs = [ [] ];
            let r1 = new T.Vector2(0.75, 0.8),
                r2 = new T.Vector2(0.8, 0.85),
                r3 = new T.Vector2(0.8, 0.8),
                r4 = new T.Vector2(0.75, 0.85);
            // Front face1
            let f1 = new T.Face3(1, 0, 2);
            crossHippedGeo.faceVertexUvs[0].push([new T.Vector2(0, 0), new T.Vector2(0, 1), new T.Vector2(1, 0)]);
            crossHippedGeo.faces.push(f1);
            let f2 = new T.Face3(0, 3, 2);
            crossHippedGeo.faceVertexUvs[0].push([new T.Vector2(0, 1), new T.Vector2(1, 1), new T.Vector2(1, 0)]);
            crossHippedGeo.faces.push(f2);
            // Right face2
            let f3 = new T.Face3(4, 5, 3);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f3);
            let f4 = new T.Face3(5, 2, 3);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f4);
            // Front face2
            let f5 = new T.Face3(5, 4, 6);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f5);
            let f6 = new T.Face3(4, 7, 6);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f6);
            // Right face2
            let f7 = new T.Face3(8, 9 , 7);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f7);
            let f8 = new T.Face3(9, 6, 7);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f8);
            // Back face2
            let f9 = new T.Face3(9, 8, 10);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f9);
            let f10 = new T.Face3(8, 11, 10);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f10);
            // Right face3
            let f11 = new T.Face3(11, 12, 10);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f11);
            let f12 = new T.Face3(12, 13, 10);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f12);
            // Back face1
            let f13 = new T.Face3(13, 12, 14);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f13);
            let f14 = new T.Face3(12, 15, 14);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f14);
            // Left face
            let f15 = new T.Face3(15, 0, 14);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f15);
            let f16 = new T.Face3(0, 1, 14);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f16);
            // Top-left face
            let f17 = new T.Face3(14, 1, 16);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f17);
            let f18 = new T.Face3(18, 14, 16);
            crossHippedGeo.faceVertexUvs[0].push([r4, r1, r3]);
            crossHippedGeo.faces.push(f18);
            // Top-right face1
            let f19 = new T.Face3(2, 13, 16);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f19);
            let f20 = new T.Face3(13, 18, 16);
            crossHippedGeo.faceVertexUvs[0].push([r2, r4, r3]);
            crossHippedGeo.faces.push(f20);
            // Top-front face2
            let f21 = new T.Face3(5, 6, 19);
            crossHippedGeo.faceVertexUvs[0].push([r1, r2, r3]);
            crossHippedGeo.faces.push(f21);
            let f22 = new T.Face3(17, 5, 19);
            crossHippedGeo.faceVertexUvs[0].push([r4, r1, r3]);
            crossHippedGeo.faces.push(f22);
            // Top-back face2
            let f23 = new T.Face3(17, 19, 9);
            crossHippedGeo.faceVertexUvs[0].push([r4, r3, r2]);
            crossHippedGeo.faces.push(f23);
            let f24 = new T.Face3(10, 17, 9);
            crossHippedGeo.faceVertexUvs[0].push([r1, r4, r2]);
            crossHippedGeo.faces.push(f24);
            // Top-front face1
            let f25 = new T.Face3(16, 1, 2);
            crossHippedGeo.faces.push(f25);
            // Top-back face1
            let f26 = new T.Face3(18, 13, 14);
            crossHippedGeo.faces.push(f26);
            // Top-right face2
            let f27 = new T.Face3(19, 6, 9);
            crossHippedGeo.faces.push(f27);
            // Bottom face1
            let f28 = new T.Face3(0, 15, 3);
            crossHippedGeo.faces.push(f28);
            let f29 = new T.Face3(15, 12, 3);
            crossHippedGeo.faces.push(f29);
            // Bottom face2
            let f30 = new T.Face3(4, 11, 7);
            crossHippedGeo.faces.push(f30);
            let f31 = new T.Face3(11, 8, 7);
            crossHippedGeo.faces.push(f31);
            crossHippedGeo.computeFaceNormals();
            crossHippedGeo.uvsNeedUpdate = true;
        }
        if (!crossHippedTexture)
        {
            crossHippedTexture = new T.TextureLoader().load("./Textures/door_and_windows.jpg");
            crossHippedTexture.flipY = false;
        }
        if (!crossHippedMat)
        {
            crossHippedMat = new T.MeshStandardMaterial({map: crossHippedTexture, roughness: 0.75});
        }
        let house = new T.Mesh(crossHippedGeo, crossHippedMat);
        house.translateX(params.x || 0);
        house.translateZ(params.z || 0);
        house.scale.set(params.size || 0, params.size || 0, params.size || 0);
        super(`crossHipped-${++GrCrossHippedCount}`, house);
    }
}

let GrSkyscraperCount = 0;
let skyscraperMat;
let skyscraperTexture;
let skyscraper;
let level1Geo, level2Geo, level3Geo, level4Geo;
export class GrSkyscraper extends GrObject
{
    constructor(params = {})
    {
        if (!skyscraper)
        {
            skyscraper = new T.Group();
            if (!skyscraperTexture)
                skyscraperTexture = new T.TextureLoader().load("./Textures/Skyscraper.jpg");
            if (!skyscraperMat)
                skyscraperMat = new T.MeshStandardMaterial({color: "white", map: skyscraperTexture, 
                                                  roughness: 1.0, roughnessMap: skyscraperTexture,
                                                  metalnessMap: skyscraperTexture});
            if (!level1Geo)
            {
                level1Geo = new T.BoxGeometry(3, 8, 2);                                
                let l1c = new T.Mesh(level1Geo, skyscraperMat);
                l1c.translateY(4);
                skyscraper.add(l1c);
                let l1r = new T.Mesh(level1Geo, skyscraperMat);
                l1r.position.set(3, 4, -2);
                skyscraper.add(l1r);
                let l1l = new T.Mesh(level1Geo, skyscraperMat);
                l1l.position.set(-3, 4, -2);
                skyscraper.add(l1l);
                let l1 = new T.Mesh(level1Geo, skyscraperMat);
                l1.position.set(0, 4, -2);
                skyscraper.add(l1);
                let l1b = new T.Mesh(level1Geo, skyscraperMat);
                l1b.position.set(0, 4, -4);
                skyscraper.add(l1b);
            }
            if (!level2Geo)
            {
                level2Geo = new T.BoxGeometry(2.5, 8, 1.5);
                let l2c = new T.Mesh(level2Geo, skyscraperMat);
                l2c.position.set(0, 12, -0.5);
                skyscraper.add(l2c);
                let l2r = new T.Mesh(level2Geo, skyscraperMat);
                l2r.position.set(2.5, 12, -2);
                skyscraper.add(l2r);
                let l2l = new T.Mesh(level2Geo, skyscraperMat);
                l2l.position.set(-2.5, 12, -2);
                skyscraper.add(l2l);
                let l2 = new T.Mesh(level2Geo, skyscraperMat);
                l2.position.set(0, 12, -2);
                skyscraper.add(l2);
                let l2b = new T.Mesh(level2Geo, skyscraperMat);
                l2b.position.set(0, 12, -3.5);
                skyscraper.add(l2b);
            }
            if (!level3Geo)
            {
                level3Geo = new T.BoxGeometry(2, 8, 1);
                let l3c = new T.Mesh(level3Geo, skyscraperMat);
                l3c.position.set(0, 20, -1);
                skyscraper.add(l3c);
                let l3r = new T.Mesh(level3Geo, skyscraperMat);
                l3r.position.set(2, 20, -2);
                skyscraper.add(l3r);
                let l3l = new T.Mesh(level3Geo, skyscraperMat);
                l3l.position.set(-2, 20, -2);
                skyscraper.add(l3l);
                let l3 = new T.Mesh(level3Geo, skyscraperMat);
                l3.position.set(0, 20, -2);
                skyscraper.add(l3);
                let l3b = new T.Mesh(level3Geo, skyscraperMat);
                l3b.position.set(0, 20, -3);
                skyscraper.add(l3b);
            }
            if (!level4Geo)
            {
                level4Geo = new T.BoxGeometry(1, 6, 0.7);
                let l4c = new T.Mesh(level4Geo, skyscraperMat);
                l4c.position.set(0, 25, -1.3);
                skyscraper.add(l4c);
                let l4r = new T.Mesh(level4Geo, skyscraperMat);
                l4r.position.set(1, 25, -2);
                skyscraper.add(l4r);
                let l4l = new T.Mesh(level4Geo, skyscraperMat);
                l4l.position.set(-1, 25, -2);
                skyscraper.add(l4l);
                let l4 = new T.Mesh(level4Geo, skyscraperMat);
                l4.position.set(0, 25, -2);
                skyscraper.add(l4);
                let l4b = new T.Mesh(level4Geo, skyscraperMat);
                l4b.position.set(0, 25, -2.7);
                skyscraper.add(l4b);
                let top = new T.Mesh(level4Geo, skyscraperMat);
                top.position.set(0, 28, -2);
                skyscraper.add(top);
            }
            skyscraper.rotateY(params.rotate || 0);
            skyscraper.translateX(params.x || 0);
            skyscraper.translateZ(params.z || 0);
        }
        super(`skyscraper-${++GrSkyscraperCount}`, skyscraper);
    }
}