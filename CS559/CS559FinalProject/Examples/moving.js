/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "../Framework/GrObject.js";

let Colors = {
    red: 0xF25346,
    white: 0xD8D0D1,
    pink: 0xF5986E,
    gray: 0xD5D8DC,
    darkGray: 0x808B96,
    blue: 0x5499C7,
    gold: 0xFFECB3
};

let helipadCount=0;
let helipadMaterial;
let helipadGeometry;
export class GrHelipad extends GrObject
{
    constructor(x, y, z, r)
    {
        if (!helipadGeometry)
        {
            // make the helipad geometry as a global - if it's not there
            const q=0.25;
            const h=0.5;
            // make the normals point upwards - no matter what orientation the triangle has
            const up = new T.Vector3(0,-1,0);
            const padcoords = [
                -1,0,-1, -1,0,1, -h,0,1, -h,0,-1,
                1,0,-1, 1,0,1, h,0,1, h,0,-1,
                -h,0,-q, -h,0,q,h,0,q,h,0, -q
            ];
            const padidx = [2,1,0, 3,2,0, 4,5,6, 4,6,7, 10,9,8, 10,8,11,];
                helipadGeometry = new T.Geometry();
                for(let i=0; i<padcoords.length; i+=3) {
                    helipadGeometry.vertices.push(new T.Vector3( padcoords[i],  padcoords[i+1], padcoords[i+2]));
                }
                for (let i=0; i<padidx.length; i+=3) {
                    helipadGeometry.faces.push(new T.Face3( padidx[i], padidx[i+1], padidx[i+2], up ));
                }
        }
        if (!helipadMaterial) {
            helipadMaterial = new T.MeshLambertMaterial({color: Colors.pink, side:T.DoubleSide});
        }
        let helipad = new T.Mesh(helipadGeometry,helipadMaterial);
        super(`Helipad-${++helipadCount}`, helipad);
        helipad.position.x = x ? x : 0;
        helipad.position.y = y ? y : 0;
        helipad.position.z = z ? z : 0;
        let scale = r ? r : 1;
        helipad.scale.set(scale, scale, scale);
        this.mesh = helipad;
        this.objects.push(helipad);
    }
}

let GrAirplaneCount = 0;
export class GrAirplane1 extends GrObject
{
    constructor(parmas = {})
    {
        let airplane = Airplane();
        airplane.scale.set(.7, .7, .7);
        airplane.position.set(-25, 18, -35);
        super(`airplane-${++GrAirplaneCount}`, airplane);
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.advance = function(delta, timeOfDay)
        {
            airplane.children[8].rotateOnWorldAxis(new T.Vector3(1, 0, 0), 0.5);
            airplane.children[9].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);
            airplane.children[10].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);
            airplane.children[11].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);
            let theta = performance.now() / 3000;
            let x = 35 * Math.cos(theta);
            let z = 35 * Math.sin(theta);
            airplane.position.x = x;
            airplane.position.z = z;
            airplane.lookAt(0, 18, 0);
        }
    }
}

export class GrAirplane2 extends GrObject
{
    constructor(params = {})
    {
        let airplane = Airplane();
        airplane.scale.set(.4, .4, .4);
        for (let i = 0; i < 4; i++)
        {
            if (i != 1)
                //@ts-ignore
                airplane.children[i].material.color.setHex(Colors.blue);
        }
        super(`airplane-${++GrAirplaneCount}`, airplane);
        this.helicopter = airplane;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;

        this.state = 0;
        this.delay = 0;
        this.pads = [];
        this.current = undefined;
        this.altitude = 25;
        
    }
    /**
     * This finds all of the landing places in the world, except that since
     * it doesn't know about the world, you need to pass it a list of objects
     * (usually world.objects)
     * @param {Array<GrObject>} grObjectList 
     */
    getPads(grObjectList) {
        let that=this;
        grObjectList.forEach(function(obj) {if (obj instanceof GrHelipad) that.pads.push(obj);});
        console.log(`${this.pads.length} Helipads found, go to the first...`);
        this.current = this.pads[0];
        this.helicopter.position.x = this.current.mesh.position.x;
        this.helicopter.position.y = this.current.mesh.position.y;
        this.helicopter.position.z = this.current.mesh.position.z;
    }
    /** - I don't know why the type declarations aren't inherited
    * @param {number} delta 
    * @param {number} timeOfDay
    * 
    * The helicopter has a state machine which tells what it's motion is. 
    * In each state, it moves to a goal, and when it gets there, picks the next state
    */
    advance(delta,timeOfDay) {
        // all the speeds are arbitrary, so we tune things here
        let deltaSlowed=delta/200;

        // spin the rotor around - even when the helicopter is landed
        this.helicopter.children[8].rotateOnWorldAxis(new T.Vector3(1, 0, 0), 0.5);
        this.helicopter.children[9].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);
        this.helicopter.children[10].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);
        this.helicopter.children[11].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);

        // state machine - depending on state, do the right thing
        if (this.pads.length) {
            switch(this.state) {
                case 0:         // initialization
                    this.state = 1;
                    this.delay = 0;
                    break;
                case 1:         // ascend to altitude
                    this.helicopter.position.y +=  deltaSlowed;
                    if (this.helicopter.position.y >= this.altitude) {
                        this.helicopter.position.y = this.altitude;
                        this.state = 4;
                        // pick a random helipad - must be different than where we are
                        let targets = this.pads.filter(obj => obj!=this.current);
                        let pick = Math.floor(Math.random() * targets.length);
                        this.current = targets[pick];
                        // compute the spin, before we start
                        let dx = this.current.mesh.position.x - this.helicopter.position.x;
                        let dz = this.current.mesh.position.z - this.helicopter.position.z;
                        let ds = Math.sqrt(dx*dx+dz*dz);
                        if (ds>0) {
                            // compute the goal angle
                            this.goalangle = Math.atan2(dx,dz);
                            // get the current angle
                            let quat = new T.Quaternion();
                            this.helicopter.getWorldQuaternion(quat);
                            let eu = new T.Euler();
                            eu.setFromQuaternion(quat);
                            this.currentangle = eu.y;
                            this.state = 4;  
                        } else {
                            this.state=5;       // don't bother spinning
                        }
                    }      
                    break;
                case 2:         // descend
                    this.helicopter.position.y -= deltaSlowed;
                    if (this.helicopter.position.y <= 0.5) {
                        this.helicopter.position.y = 0.5;
                        this.state = 3;
                        this.delay = 1+Math.random();
                    }      
                    break;
                case 3:         // wait before takeoff
                    this.delay -= deltaSlowed;
                    if (this.delay<0) {
                        this.state = 1;         // take off again
                    }
                    break;
                case 4:         // rotate to point towards destination
                    let ad = this.goalangle - this.currentangle;
                    if (ad>0.1) {
                        this.currentangle += 0.05;
                    } else if (ad<-0.1) {
                        this.currentangle -= 0.05;
                    } else {
                        this.state=5;
                        this.currentangle = this.goalangle;
                    }
                    this.helicopter.setRotationFromEuler(new T.Euler(0,this.currentangle,0));
                    break;
                case 5:         // fly to destination
                    let dx = this.current.mesh.position.x - this.helicopter.position.x;
                    let dz = this.current.mesh.position.z - this.helicopter.position.z;
                    let dst = Math.sqrt(dx*dx+dz*dz);
                    let ds = deltaSlowed*1.5;
                    if (dst > ds) {
                        this.helicopter.position.x += dx * ds / dst;
                        this.helicopter.position.z += dz * ds / dst;
                    } else {
                        this.helicopter.position.x = this.current.mesh.position.x;
                        this.helicopter.position.z = this.current.mesh.position.z;
                        this.state = 2;
                    }
                    break;
            }
        }
    }
}

function Airplane()
{
    let airplane = new T.Group();
            
    let cockpitGeo = new T.BoxGeometry(6, 3, 3, 1, 1, 1);
    let cockpitMat = new T.MeshPhongMaterial({color: Colors.red});
    let cockpit = new T.Mesh(cockpitGeo, cockpitMat);
    airplane.add(cockpit);

    let engineGeo = new T.BoxGeometry(2, 3, 3, 1, 1, 1);
    let engineMat = new T.MeshPhongMaterial({color: Colors.white});
    let engine = new T.Mesh(engineGeo, engineMat);
    engine.position.x = 4;
    airplane.add(engine);

    let tailGeo = new T.BoxGeometry(1.5, 2, 1, 1, 1);
    let tailMat = new T.MeshPhongMaterial({color: Colors.red});
    let tail = new T.Mesh(tailGeo, tailMat);
    tail.position.set(-3.5, 2.5, 0);
    airplane.add(tail);

    let wingGeo = new T.BoxGeometry(1, 0.8, 10, 1, 1, 1);
    let wingMat = new T.MeshPhongMaterial({color: Colors.pink});
    let wing = new T.Mesh(wingGeo, wingMat);
    airplane.add(wing);

    let propellerGeo = new T.BoxGeometry(2, 1, 1, 1, 1, 1);
    let propellerMat = new T.MeshPhongMaterial({color: Colors.gray});
    let propeller1 = new T.Mesh(propellerGeo, propellerMat);
    propeller1.position.x = 5;
    airplane.add(propeller1);
    let propeller2 = new T.Mesh(propellerGeo, propellerMat);
    propeller2.position.set(-3.5, 3.5, 0);
    propeller2.rotateZ(Math.PI / 2);
    airplane.add(propeller2);
    let propeller3 = new T.Mesh(propellerGeo, propellerMat);
    propeller3.position.set(0, 0.7, 5);
    propeller3.rotateZ(Math.PI / 2);
    airplane.add(propeller3);
    let propeller4 = new T.Mesh(propellerGeo, propellerMat);
    propeller4.position.set(0, 0.7, -5);
    propeller4.rotateZ(Math.PI / 2);
    airplane.add(propeller4);

    let bladeGeo = new T.BoxGeometry(0.1, 7, 2, 1, 1, 1);
    let bladeMat = new T.MeshPhongMaterial({color: Colors.darkGray, specular: Colors.darkGray});
    let blade1 = new T.Mesh(bladeGeo, bladeMat);
    blade1.position.x = 5;
    blade1.scale.set(0.8, 0.8, 0.8);
    airplane.add(blade1);
    let blade2 = new T.Mesh(bladeGeo, bladeMat);
    blade2.position.set(-3.5, 3.5, 0);
    blade2.rotateZ(Math.PI / 2);
    blade2.scale.set(0.8, 0.8, 0.8);
    airplane.add(blade2);
    let blade3 = new T.Mesh(bladeGeo, bladeMat);
    blade3.position.set(0, .7, 5);
    blade3.rotateZ(Math.PI / 2);
    blade3.scale.set(.6, .6, .6);
    airplane.add(blade3);
    let blade4 = new T.Mesh(bladeGeo, bladeMat);
    blade4.position.set(0, .7, -5);
    blade4.rotateZ(Math.PI / 2);
    blade4.scale.set(.6, .6, .6);
    airplane.add(blade4);

    return airplane;
}

let GrCarouselCount = 0;
let carousel;
export class GrCarousel extends GrObject
{
    constructor(params = {})
    {
        if (!carousel)
        {
            let width = 3;
            carousel = new T.Group();
            let baseGeo = new T.CylinderGeometry(width, width, 1, 32);
            let baseMat = new T.MeshStandardMaterial({color: Colors.blue, metalness: 0.1, roughness: 0.7});
            let base = new T.Mesh(baseGeo, baseMat);
            base.translateY(0.5);
            carousel.add(base);

            let platformGroup = new T.Group();
            base.add(platformGroup);
            let platformGeo = new T.CylinderGeometry(0.95 * width, 0.95 * width, 0.2, 32);
            let platformMat = new T.MeshStandardMaterial({color: Colors.gold, metalness: 0.2, roughness: 0.7});
            let platform = new T.Mesh(platformGeo, platformMat);
            platformGroup.add(platform);

            let cpoleGeo = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
            let cpoleMat = new T.MeshStandardMaterial({color: Colors.gold, metalness: 0.8, roughness: 0.4});
            let cpole = new T.Mesh(cpoleGeo, cpoleMat);
            platformGroup.add(cpole);
            cpole.translateY(1.5);

            let top = new T.Mesh(platformGeo, platformMat);
            platformGroup.add(top);
            top.translateY(3);

            let opoleGeo = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
            let opoleMat = new T.MeshStandardMaterial({color: Colors.darkGray, metalness: 0.8, roughness: 0.6});
            let opole;
            let poles = [];
            for (let i = 0; i < 10; i++)
            {
                opole = new T.Mesh(opoleGeo, opoleMat);
                platformGroup.add(opole);
                opole.translateY(1.5);
                opole.rotateY(2 * i * Math.PI / 10);
                opole.translateX(0.8 * width);
                poles.push(opole);
            }

            let ohorse;
            let horse = [];
            for (let i = 0; i < 10; i++)
            {
                let ypos = Math.random() * (1.5 - 1) + 1;
                ohorse = Horse();
                ohorse.scale.set(-0.7, 0.7, -0.7);
                platformGroup.add(ohorse);
                ohorse.translateY(ypos);
                ohorse.rotateY(2 * i * Math.PI / 10);
                ohorse.translateX(0.8 * width);
                horse.push(ohorse);
            }

            let roofGeo = new T.ConeGeometry(width, 0.5 * width, 32, 4);
            let roof = new T.Mesh(roofGeo, baseMat);
            carousel.add(roof);
            roof.translateY(4.8);
        
            super(`carousel-${++GrCarouselCount}`, carousel);
            this.wholeObj = carousel;
            this.platform = platform;
            this.poles = poles;
            this.horse = horse;
            this.wholeObj.position.x = params.x ? Number(params.x) : 0;
            this.wholeObj.position.y = params.y ? Number(params.y) : 0;
            this.wholeObj.position.z = params.z ? Number(params.z) : 0;

            let scale = params.size ? Number(params.size) : 1;
            carousel.scale.set(scale, scale, scale);

            let hypos = [];
            for (let i = 13; i < platformGroup.children.length; i++)
            {
                hypos.push(platformGroup.children[i].position.y);
            }

            this.advance = function(delta, timeOfDay)
            {
                carousel.rotateY(0.001 * delta);
                let theta = performance.now() / 1000;
                let idx = 0;

                for (let i = 13; i < platformGroup.children.length; i++)
                {
                    idx = i - 13;
                    platformGroup.children[i].position.y = hypos[idx] - (0.5 * Math.sin(theta * (idx + 1) * 0.15));
                }
            }
        }

        function Horse()
        {
            let horse = new T.Group();
            let horseColor = ["#FFFF66", "#FF3366", "#FF6666", "#99FF66", "#33FF66"];
            let rc_idx = Math.floor(Math.random() * 5);
            let horseMat = new T.MeshPhongMaterial({color: horseColor[rc_idx]});

            let legGeo = new T.BoxGeometry(0.2, 0.7, 0.2);
            let leg1 = new T.Mesh(legGeo, horseMat);
            leg1.position.set(0.2, 0, 0.3);
            horse.add(leg1);
            let leg2 = new T.Mesh(legGeo, horseMat);
            leg2.position.set(-0.2, 0, 0.3);
            horse.add(leg2);
            let leg3 = new T.Mesh(legGeo, horseMat);
            leg3.position.set(0.2, 0, -0.3);
            horse.add(leg3);
            let leg4 = new T.Mesh(legGeo, horseMat);
            leg4.position.set(-0.2, 0, -0.3);
            horse.add(leg4);
            
            let bodyGeo = new T.BoxGeometry(0.7, 0.4, 1);
            let body = new T.Mesh(bodyGeo, horseMat);
            body.position.y = 0.5;
            horse.add(body);

            let neckGeo = new T.BoxGeometry(0.6, 0.4, 0.3);
            let neck = new T.Mesh(neckGeo, horseMat);
            neck.rotateY(Math.PI / 2);
            neck.rotateZ(-45 * Math.PI / 180);
            neck.position.set(0, 0.8, 0.5);
            horse.add(neck);

            let headGeo = new T.BoxGeometry(0.4, 0.2, 0.3);
            let head = new T.Mesh(headGeo, horseMat);
            head.rotateY(Math.PI / 2);
            head.rotateZ(45 * Math.PI / 180);
            head.position.set(0, 1, 0.7);
            horse.add(head);

            let noseGeo = new T.BoxGeometry(0.3, 0.25, 0.25);
            let nose = new T.Mesh(noseGeo, horseMat);
            nose.rotateX(45 * Math.PI / 180);
            nose.position.set(0, 0.8, 0.85);
            horse.add(nose);

            let tailGeo = new T.BoxGeometry(0.2, 0.5, 0.2);
            let tail = new T.Mesh(tailGeo, horseMat);
            tail.rotateX(45 * Math.PI / 180);
            tail.position.set(0, 0.4, -0.6);
            horse.add(tail);

            return horse;
        }
    }
}

let GrBalloonCount = 0;
export class GrBalloon extends GrObject
{
    constructor(params = {})
    {
        let radius = params.r || 1.0;
        let texture = new T.TextureLoader().load("./Textures/balloon.jpg");
        let material = new T.MeshStandardMaterial({map: texture, morphTargets: true, morphNormals: true, side: T.DoubleSide});
        let initGeo = new T.SphereGeometry(radius);
        let morphVer = [];
        initGeo.vertices.forEach(ver => {
            morphVer.push(new T.Vector3(0, 0, 0));
        });
        for (let i = 0; i < initGeo.faces.length; i++)
        {
            let v = initGeo.faces[i].a;
            morphVer[initGeo.faces[i].a].x = initGeo.faceVertexUvs[0][i][0].x * radius * 3;
            morphVer[initGeo.faces[i].a].y = initGeo.faceVertexUvs[0][i][0].y * radius * 5;

            morphVer[initGeo.faces[i].b].x = initGeo.faceVertexUvs[0][i][1].x * radius * 1;
            morphVer[initGeo.faces[i].b].y = initGeo.faceVertexUvs[0][i][1].y * radius * 4;

            morphVer[initGeo.faces[i].c].x = initGeo.faceVertexUvs[0][i][2].x * radius * 3;
            morphVer[initGeo.faces[i].c].y = initGeo.faceVertexUvs[0][i][2].y * radius * 5;
        }
        initGeo.morphTargets.push({name: "flat", vertices: morphVer});
        initGeo.computeMorphNormals();
        let buffGeo = new T.BufferGeometry().fromGeometry(initGeo);
        let balloon = new T.Mesh(buffGeo, material);
        super(`balloon-${++GrBalloonCount}`, balloon);

        balloon.position.x = params.x || 0;
        balloon.position.y = params.y || 0;
        balloon.position.z = params.z || 0;
        this.balloon = balloon;

        this.balloon.updateMorphTargets();
        this.time = 0;
    }
    advance(delta, timeOfDay)
    {
        this.time += delta / 2000;
        this.balloon.morphTargetInfluences[0] = Math.cos(this.time) * Math.cos(this.time);
        
    }
}

export class GrTrack extends GrObject
{
    constructor(params = {})
    {
        let track = new T.Group();
        let curve1 = new T.CatmullRomCurve3([
            new T.Vector3(-10, 0, 10),
            new T.Vector3(10, 0, 10),
            new T.Vector3(10, 0, -10),
            new T.Vector3(-10, 0, -10),
        ], true);
        let points1 = curve1.getPoints(50);
        let tGeo = new T.BufferGeometry().setFromPoints(points1);
        let tMat = new T.LineBasicMaterial({color: Colors.gray, linecap: "round", linewidth: 1});
        let t = new T.Line(tGeo, tMat);
        let curve2 = new T.CatmullRomCurve3([
            new T.Vector3(-7, 0, 7),
            new T.Vector3(7, 0, 7),
            new T.Vector3(7, 0, -7),
            new T.Vector3(-7, 0, -7)
        ], true);
        let point2 = curve2.getPoints(50);
        let tGeo2 = new T.BufferGeometry().setFromPoints(point2);
        let t2 = new T.Line(tGeo2, tMat);
        track.add(t2);
        track.add(t);
        track.translateX(params.x || 0);
        track.translateY(params.y || 0.1);
        track.translateZ(params.z || 0);
        super("track", track);

        this.x = params.x || 0;
        this.y = params.y || 0.1;
        this.z = params.z || 0;
    }
    eval(u)
    {
        let p = u * 2 * Math.PI;
        return [this.x + 11 * Math.cos(p), this.y, this.z + 11 * Math.sin(p)];
    }
    tangent(u) {
        let p = u * 2 * Math.PI;
        // unit tangent vector - not the real derivative
        return [Math.sin(p), 0, -Math.cos(p)];
    }
}

let GrCarCount = 0;
export class GrCar extends GrObject
{
    constructor(track)
    {
        let wheelSettings = {
            steps: 2,
            depth: 0.2,
            bevelEnabled: false
        };
        let car = new T.Group();

        let wheelGroup = new T.Group();
        car.add(wheelGroup);
        let wheelShape = new T.Shape();
        wheelShape.moveTo(-1, 0.3);
        wheelShape.arc(0, 0, 0.3, 0, Math.PI * 2, false);
        let wheelGeo = new T.ExtrudeGeometry(wheelShape, wheelSettings);
        let wheelMat = new T.MeshLambertMaterial({color: Colors.gray});
        let wheel1 = new T.Mesh(wheelGeo, wheelMat);
        wheelGroup.add(wheel1);
        let wheel2 = new T.Mesh(wheelGeo, wheelMat);
        wheel2.translateX(2.5);
        wheelGroup.add(wheel2);
        let wheel3 = new T.Mesh(wheelGeo, wheelMat);
        wheel3.translateZ(-2);
        wheelGroup.add(wheel3);
        let wheel4 = new T.Mesh(wheelGeo, wheelMat);
        wheel4.translateX(2.5);
        wheel4.translateZ(-2);
        wheelGroup.add(wheel4);
        wheelGroup.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 1.57);

        let bodyGroup = new T.Group();
        car.add(bodyGroup);
        let fenderSettings = {
            steps: 10,
            depth: 2,
            bevelEnabled: false
        };
        let fenderShape1 = new T.Shape();
        fenderShape1.moveTo(-1.4, 0.5);
        fenderShape1.bezierCurveTo(-1.4, 0.9, -0.6, 0.9, -0.6, 0.2);
        let fenderGeo1 = new T.ExtrudeGeometry(fenderShape1, fenderSettings);
        let fenderMat = new T.MeshStandardMaterial({color: Colors.white, metalness: 0.8, roughness: 0.3});
        let fender1 = new T.Mesh(fenderGeo1, fenderMat);
        fender1.translateZ(-1.9);
        bodyGroup.add(fender1);
        let fenderShape2 = new T.Shape();
        fenderShape2.moveTo(1.1, 0.2);
        fenderShape2.bezierCurveTo(1.1, 0.9, 1.9, 0.9, 1.9, 0.2);
        let fenderGeo2 = new T.ExtrudeGeometry(fenderShape2, fenderSettings);
        let fender2 = new T.Mesh(fenderGeo2, fenderMat);
        fender2.translateZ(-1.9);
        bodyGroup.add(fender2);

        let bodySettings = {
            steps: 10,
            depth: 1.7,
            bevelEnabled: false
        };
        let bodyShape = new T.Shape();
        bodyShape.moveTo(-1, 0.8);
        bodyShape.lineTo(-0.8, 0.2);
        bodyShape.lineTo(1.6, 0.2);
        bodyShape.lineTo(1.5, 0.8);
        let bodyGeo = new T.ExtrudeGeometry(bodyShape, bodySettings);
        let bodyMat = new T.MeshStandardMaterial({color: Colors.red, metalness: 0.8, roughness: 0.3});
        let body = new T.Mesh(bodyGeo, bodyMat);
        body.translateZ(-1.8);
        bodyGroup.add(body);

        let roomSettings = {
            steps: 10,
            depth: 0.2,
            bevelEnabled: false
        };
        let frontRoomShape = new T.Shape();
        frontRoomShape.moveTo(-0.4, 0.7);
        frontRoomShape.lineTo(-0.2, 0.7);
        frontRoomShape.lineTo(0, 1.6);
        frontRoomShape.lineTo(-0.2, 1.6);
        frontRoomShape.lineTo(-0.4, 0.7);
        let roomGeo1 = new T.ExtrudeGeometry(frontRoomShape, roomSettings);
        let room1= new T.Mesh(roomGeo1, bodyMat);
        room1.translateZ(-0.3);
        bodyGroup.add(room1);
        let room2 = new T.Mesh(roomGeo1, bodyMat);
        room2.translateZ(-1.8);
        bodyGroup.add(room2);

        let topRoomShape = new T.Shape();
        topRoomShape.moveTo(-0.2, 1.4);
        topRoomShape.lineTo(-0.1, 1.6);
        topRoomShape.lineTo(0.9, 1.6);
        topRoomShape.lineTo(0.7, 1.4);
        let roomGeo2 = new T.ExtrudeGeometry(topRoomShape, roomSettings);
        let room3 = new T.Mesh(roomGeo2, bodyMat);
        room3.translateZ(-0.3);
        bodyGroup.add(room3);
        let room4 = new T.Mesh(roomGeo2, bodyMat);
        room4.translateZ(-1.8);
        bodyGroup.add(room4);

        let backRoomShape = new T.Shape();
        backRoomShape.moveTo(0.7, 1.4);
        backRoomShape.lineTo(0.9, 0.7);
        backRoomShape.lineTo(1.1, 0.7);
        backRoomShape.lineTo(0.9, 1.6);
        let roomGeo3 = new T.ExtrudeGeometry(backRoomShape, roomSettings);
        let room5 = new T.Mesh(roomGeo3, bodyMat);
        room5.translateZ(-0.3);
        bodyGroup.add(room5);
        let room6 = new T.Mesh(roomGeo3, bodyMat);
        room6.translateZ(-1.8);
        bodyGroup.add(room6);

        let roofSettings = {
            steps: 10,
            depth: 1.7, 
            bevelEnabled: false
        };
        let topShape1 = new T.Shape();
        topShape1.moveTo(-1.1 / 4.5, 1.4);
        topShape1.lineTo(-0.2, 1.6);
        topShape1.lineTo(0, 1.6);
        topShape1.lineTo(-0.2 / 4.5, 1.4);
        let roomGeo4 = new T.ExtrudeGeometry(topShape1, roofSettings);
        let room7 = new T.Mesh(roomGeo4, bodyMat);
        room7.translateZ(-1.8);
        bodyGroup.add(room7);
        let topShape2 = new T.Shape();
        topShape2.moveTo(0.7, 1.4);
        topShape2.lineTo(0.7, 1.6);
        topShape2.lineTo(0.9, 1.6);
        topShape2.lineTo(4.25 / 4.5, 1.4);
        let roomGeo5 = new T.ExtrudeGeometry(topShape2, roofSettings);
        let room8 = new T.Mesh(roomGeo5, bodyMat);
        room8.translateZ(-1.8)
        bodyGroup.add(room8);

        let roofShape = new T.Shape();
        roofShape.moveTo(-0.2 / 4.5, 1.4);
        roofShape.lineTo(4.25 / 4.5, 1.4);
        roofShape.lineTo(0.7, 1.6);
        roofShape.lineTo(0, 1.6);
        let roomGeo6 = new T.ExtrudeGeometry(roofShape, roofSettings);
        let roof = new T.Mesh(roomGeo6, bodyMat);
        roof.translateZ(-1.8);
        bodyGroup.add(roof);

        let windowShape = new T.Shape();
        windowShape.moveTo(0.7, 1.4);
        windowShape.lineTo(0.9, 0.7);
        windowShape.lineTo(1.1, 0.7);
        windowShape.lineTo(0.9, 1.6);
        let winGeo = new T.ExtrudeGeometry(windowShape, roofSettings);
        let window = new T.Mesh(winGeo, bodyMat);
        window.translateZ(-1.8);
        bodyGroup.add(window);
        bodyGroup.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 1.57);

        car.translateY(0.5);
        car.scale.set(0.6, 0.6, 0.6);
        super(`car-${++GrCarCount}`, car);

        this.track = track;
        this.u = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.advance = function(delta, timeOfDay)
        {
            this.u += delta / 4000;
            let pos = this.track.eval(this.u);
            this.objects[0].position.set(pos[0],pos[1],pos[2]);
            let dir = this.track.tangent(this.u);
            let zAngle = Math.atan2(dir[2],dir[0]);
            this.objects[0].rotation.y = -zAngle - Math.PI/2;
        }
    }
}

export class GrCar2 extends GrObject
{
    constructor(track)
    {
        let loader = new T.FBXLoader();
        let car2 = new T.Group();
        loader.load("./Examples/Assets/teeny racecar.fbx", function(car) {
            car.scale.set(0.05, 0.05, 0.05);
            car.translateY(0.3);
            car2.add(car);
        });
        super(`car-${++GrCarCount}`, car2);
        this.track = track;
        this.u = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.advance = function(delta, timeOfDay)
        {
            this.u += delta / 4000;
            let pos = this.track.eval(this.u);
            this.objects[0].position.set(pos[0],pos[1],pos[2]);
            let dir = this.track.tangent(this.u);
            let zAngle = Math.atan2(dir[2],dir[0]);
            this.objects[0].rotation.y = -zAngle - Math.PI/2;
        }
    }
}

export class GrCar3 extends GrObject
{
    constructor(track)
    {
        let car3 = new T.Group();

        let grWheel = new T.Group();
        grWheel.translateY(0.9);
        grWheel.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 1.57);
        car3.add(grWheel);
        let wheelGeo = new T.TorusGeometry(0.6, 0.3, 16, 70);
        let wheelText = new T.TextureLoader().load("./Textures/tyre.jpg");
        let wheelMat = new T.MeshLambertMaterial({map: wheelText});
        let wheel1 = new T.Mesh(wheelGeo, wheelMat);
        grWheel.add(wheel1);
        let wheel2 = new T.Mesh(wheelGeo, wheelMat);
        wheel2.translateZ(-3.0);
        grWheel.add(wheel2);
        let wheel3 = new T.Mesh(wheelGeo, wheelMat);
        wheel3.translateX(5.0);
        grWheel.add(wheel3);
        let wheel4 = new T.Mesh(wheelGeo, wheelMat);
        wheel4.translateZ(-3.0);
        wheel4.translateX(5.0);
        grWheel.add(wheel4);

        let fenderSettings = {
            steps: 2, 
            depth: 4,
            bevelEnabled: false
        };
        let grFender = new T.Group();
        grFender.translateY(0.8);
        grFender.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 1.57);
        car3.add(grFender);
        let fenderMat = new T.MeshPhongMaterial({color: Colors.white});
        let sFender = new T.Shape();
        sFender.moveTo(-1.5, 0.3);
        sFender.lineTo(-1.0, 0.3);
        sFender.lineTo(-1.0, 0.5);
        sFender.lineTo(-0.7, 1.0);
        sFender.lineTo(6.0, 1.0);
        sFender.lineTo(6.3, 0.5);
        sFender.lineTo(6.3, 0.3);
        sFender.lineTo(6.8, 0.3);
        sFender.lineTo(6.8, 0.5);
        sFender.lineTo(6.3, 0.5);
        sFender.lineTo(5.8, 1.2);
        sFender.lineTo(-0.8, 1.2);
        sFender.lineTo(-1.2, 0.5);
        sFender.lineTo(-1.5, 0.5);
        sFender.lineTo(-1.5, 0.3);
        let fenderGeo = new T.ExtrudeGeometry(sFender, fenderSettings);
        let fender = new T.Mesh(fenderGeo, fenderMat);
        fender.translateZ(-3.5);
        grFender.add(fender);

        let bodySettings = {
            steps: 2,
            depth: 3.8,
            bevelEnabled: false
        };
        let grBody = new T.Group();
        grBody.translateY(0.8);
        grBody.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 1.57);
        car3.add(grBody);
        let bodytext = new T.TextureLoader().load("./Textures/car.jpg");
        let bodyMat = new T.MeshPhongMaterial({map: bodytext});
        let sBody = new T.Shape();
        sBody.moveTo(-1.3, 0.5);
        sBody.lineTo(-1.3, 2.5);
        sBody.lineTo(1.7, 2.5);
        sBody.lineTo(1.7, 4.8);
        sBody.lineTo(5.5, 4.8);
        sBody.lineTo(5.5, 1.2);
        sBody.lineTo(-0.8, 1.2);
        let bodyGeo = new T.ExtrudeGeometry(sBody, bodySettings);
        let body = new T.Mesh(bodyGeo, bodyMat);
        body.translateZ(-3.5);
        grBody.add(body);
        
        car3.scale.set(0.2, 0.2, 0.2);
        super(`car-${++GrCarCount}`, car3);
        this.track = track;
        this.u = 0;
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(2);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
        this.advance = function(delta, timeOfDay)
        {
            this.u += delta / 4000;
            let pos = this.track.eval(this.u);
            this.objects[0].position.set(pos[0],pos[1],pos[2]);
            let dir = this.track.tangent(this.u);
            let zAngle = Math.atan2(dir[2],dir[0]);
            this.objects[0].rotation.y = -zAngle - Math.PI/2;
        }
    }
}
