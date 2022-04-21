/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program
export class Car extends GrObject{
    constructor(){
let car = new T.Group();

        let tire1 = Tire();
        let tire2 = Tire();
        let tire3 = Tire();
        let tire4 = Tire();

        let carBody = new T.Group();

        let exSettings = {
			steps: 2,
			depth: 0.6,
			bevelEnabled: true,
			bevelThickness: 0.2,
			bevelSize: 0.1,
			bevelSegments: 2
        };
        
        let base_curve = new T.Shape();
		base_curve.moveTo(-1, 0);
		base_curve.lineTo(-1.2, 0.1);
		base_curve.lineTo(-1.2, 0.4);
        base_curve.lineTo(-0.75, 0.55);
        base_curve.lineTo(-0.3, 1);
        base_curve.lineTo(0.9, 1);

		base_curve.lineTo(1, 0.7);
		base_curve.lineTo(1.2, 0.3);
		base_curve.lineTo(1.2, 0.1);
        base_curve.lineTo(1, 0);
        
		base_curve.lineTo(-1, 0);
		let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
		let car_mat = new T.MeshStandardMaterial({color:"grey", metalness:0.5, roughness:0.7});
		let base = new T.Mesh(base_geom, car_mat);

        base.position.set(1,0.3,0.07);
        carBody.add(base);

        let window1 = new T.Mesh(
            new T.PlaneGeometry(0.6,0.5),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window1.position.set(0.35,1.1,0.36);
        window1.lookAt(-0.5,1.9,0.36);
        carBody.add(window1);

        let window2 = new T.Mesh(
            new T.PlaneGeometry(0.4,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window2.position.set(1,1,0.872);
        carBody.add(window2);

        let window3 = new T.Mesh(
            new T.PlaneGeometry(0.5,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window3.position.set(1.55,1,0.872);
        carBody.add(window3);

        let window4 = new T.Mesh(
            new T.PlaneGeometry(0.4,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window4.position.set(1,1,-0.132);
        window4.rotation.set(0,Math.PI,0);
        carBody.add(window4);

        let window5 = new T.Mesh(
            new T.PlaneGeometry(0.5,0.48),
            new T.MeshStandardMaterial({color:"#d1f8ff", metalness:0.5, roughness:0.7})
        );
        window5.position.set(1.55,1,-0.132);
        window5.rotation.set(0,Math.PI,0);
        carBody.add(window5);

        carBody.position.set(-0.5,-1,1.2);
        tire1.position.set(-0.5,-1,-0.6);
        tire2.position.set(-0.5,-1,0.9);
        tire3.position.set(0.5,-1,-0.6);
        tire4.position.set(0.5,-1,0.9);

        carBody.rotation.set(0, Math.PI/2, 0);
        tire1.rotation.set(0, Math.PI/2, 0);
        tire2.rotation.set(0, Math.PI/2, 0);
        tire3.rotation.set(0, Math.PI/2, 0);
        tire4.rotation.set(0, Math.PI/2, 0);

        car.add(tire1);
        car.add(tire2);
        car.add(tire3);
        car.add(tire4);

        car.add(carBody);
        car.scale.set(1.5,1.5,1.5);
        car.position.set(1.5,1.5,1.5);
        super("Car_", car);

        function Tire(){
            let tl1 = new T.TextureLoader().load("../for_students/tire_texture.jpg");
            let tire_mat1 = new T.MeshStandardMaterial({map:tl1, roughness:0.75});
            let tl2 = new T.TextureLoader().load("../for_students/tire_texture2.png");
            let tire_mat2 = new T.MeshStandardMaterial({map:tl2, roughness:0.75});
    
            let tire = new T.Group();
    
            let tireSide1 = new T.Mesh(
                new T.CircleGeometry( 0.4, 32 ),
                tire_mat1
            );
            tireSide1.position.set(0,0.4,0);
    
            let tireSide2 = new T.Mesh(
                new T.CircleGeometry( 0.4, 32 ),
                tire_mat1
            );
            tireSide2.position.set(0,0.4,-0.252);
            tireSide2.rotation.set(0,Math.PI,0);
    
            let tireAround = new T.Mesh(
                new T.CylinderGeometry( 0.4, 0.4, 0.25, 32 ),
                tire_mat2
            )
            tireAround.position.set(0,0.4,-0.126);
            tireAround.rotation.set(Math.PI/2,0,0);
    
            tire.add(tireSide1);
            tire.add(tireSide2);
            tire.add(tireAround);
    
            return tire;
        }

        
}
}