/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

// define a class of Domino here - it should be a subclass of GrObject
class Domino1 extends GrObject{
    constructor() {
      let dicegeometry1 = new T.BoxGeometry(0.2, 2, 2);
      let dicegeometry2 = new T.BoxGeometry(0.2, 2, 2);
      //
      dicegeometry1.faceVertexUvs = [[]];
      dicegeometry2.faceVertexUvs = [[]];
      //6
      dicegeometry1.faceVertexUvs[0].push([new T.Vector2(1, 0), new T.Vector2(2/3, 0), new T.Vector2(1, 1/3)]);
      dicegeometry1.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(2/3, 1/3), new T.Vector2(1, 1/3)]);

      dicegeometry2.faceVertexUvs[0].push([new T.Vector2(1, 0), new T.Vector2(2/3, 0), new T.Vector2(1, 1/3)]);
      dicegeometry2.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(2/3, 1/3), new T.Vector2(1, 1/3)]);
  
  
      let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
      let dicematerial = [
        new T.MeshStandardMaterial({ map: dice_texture}),
        new T.MeshStandardMaterial({ map: dice_texture }),
        new T.MeshStandardMaterial({ map: dice_texture}),
        new T.MeshStandardMaterial({ map: dice_texture }),
        new T.MeshStandardMaterial({ map: dice_texture}),
        new T.MeshStandardMaterial({ map: dice_texture })
    ];
  
      let mesh1 = new T.Mesh(dicegeometry1, dicematerial);
      let mesh2 = new T.Mesh(dicegeometry2, dicematerial);

      mesh1.position.set(1,1,1);
      mesh2.position.set(1,3,1);

      let domino = new T.Group();

      domino.add(mesh1);
      domino.add(mesh2);

      domino.position.set(1,0,1);
      domino.scale.set(0.7,0.7,0.7);
      super("domino1", domino);
    }
}

class Domino2 extends GrObject{
  constructor() {
    let dicegeometry1 = new T.BoxGeometry(0.2, 2, 2);
    let dicegeometry2 = new T.BoxGeometry(0.2, 2, 2);
    //
    dicegeometry1.faceVertexUvs = [[]];
    dicegeometry2.faceVertexUvs = [[]];
    //6
 //3
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);

 //3
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);


    let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
    let dicematerial = [
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture })
  ];

    let mesh1 = new T.Mesh(dicegeometry1, dicematerial);
    let mesh2 = new T.Mesh(dicegeometry2, dicematerial);

    mesh1.position.set(0,1,1);
    mesh2.position.set(0,3,1);

    let domino = new T.Group();

    domino.add(mesh1);
    domino.add(mesh2);

    domino.position.set(1,0,1);
    domino.scale.set(0.7,0.7,0.7);
    super("domino2", domino);
  }
}

class Domino3 extends GrObject{
  constructor() {
    let dicegeometry1 = new T.BoxGeometry(0.2, 2, 2);
    let dicegeometry2 = new T.BoxGeometry(0.2, 2, 2);
    //
    dicegeometry1.faceVertexUvs = [[]];
    dicegeometry2.faceVertexUvs = [[]];
 //2
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(1/3, 1/3), new T.Vector2(0, 1/3), new T.Vector2(1/3, 2/3)]);
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(0, 1/3), new T.Vector2(0, 2/3), new T.Vector2(1/3, 2/3)]);

 //3
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);


    let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
    let dicematerial = [
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture })
  ];

    let mesh1 = new T.Mesh(dicegeometry1, dicematerial);
    let mesh2 = new T.Mesh(dicegeometry2, dicematerial);

    mesh1.position.set(-1,1,1);
    mesh2.position.set(-1,3,1);

    let domino = new T.Group();

    domino.add(mesh1);
    domino.add(mesh2);

    domino.position.set(1,0,1);
    domino.scale.set(0.7,0.7,0.7);
    super("domino3", domino);
  }
}

class Domino4 extends GrObject{
  constructor() {
    let dicegeometry1 = new T.BoxGeometry(0.2, 2, 2);
    let dicegeometry2 = new T.BoxGeometry(0.2, 2, 2);
    //
    dicegeometry1.faceVertexUvs = [[]];
    dicegeometry2.faceVertexUvs = [[]];
 //4
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(2/3, 2/3), new T.Vector2(1/3, 2/3), new T.Vector2(2/3, 1)]);
 dicegeometry1.faceVertexUvs[0].push([new T.Vector2(1/3, 2/3), new T.Vector2(1/3, 1), new T.Vector2(2/3, 1)]);

 //3
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
 dicegeometry2.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);


    let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
    let dicematerial = [
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture })
  ];

    let mesh1 = new T.Mesh(dicegeometry1, dicematerial);
    let mesh2 = new T.Mesh(dicegeometry2, dicematerial);

    mesh1.position.set(-2,1,1);
    mesh2.position.set(-2,3,1);

    let domino = new T.Group();

    domino.add(mesh1);
    domino.add(mesh2);

    domino.position.set(1,0,1);
    domino.scale.set(0.7,0.7,0.7);
    super("domino4", domino);
  }
}
function test() {
  let world = new GrWorld();

  // put the domino into the world Here
  // you can, of course, add more than 1
  let domino1 = new Domino1();
  world.add(domino1);

  let domino2 = new Domino2();
  world.add(domino2);

  let domino3 = new Domino3();
  world.add(domino3);

  let domino4 = new Domino4();
  world.add(domino4);
  
  world.go();
}
Helpers.onWindowOnload(test);
