/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

// define a class of Dice here - it should be a subclass of GrObject

class Dice1 extends GrObject{
  constructor() {
    let dicegeometry = new T.BoxGeometry();
    //
    dicegeometry.faceVertexUvs = [[]];
    //6
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1, 0), new T.Vector2(2/3, 0), new T.Vector2(1, 1/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(2/3, 1/3), new T.Vector2(1, 1/3)]);
    //3
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);
    //1
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 1/3), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 1/3), new T.Vector2(1/3, 2/3), new T.Vector2(2/3, 2/3)]);
    //2
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 1/3), new T.Vector2(0, 1/3), new T.Vector2(1/3, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(0, 1/3), new T.Vector2(0, 2/3), new T.Vector2(1/3, 2/3)]);
    //4
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 2/3), new T.Vector2(1/3, 2/3), new T.Vector2(2/3, 1)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 2/3), new T.Vector2(1/3, 1), new T.Vector2(2/3, 1)]);
    //5
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1, 1/3), new T.Vector2(2/3, 1/3), new T.Vector2(1, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 1/3), new T.Vector2(2/3, 2/3), new T.Vector2(1, 2/3)]);


    let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
    let dicematerial = [
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture })
  ];

    let mesh = new T.Mesh(dicegeometry, dicematerial);

    mesh.position.set(1,1,1);
    super("dice1", mesh);
  }
}

class Dice2 extends GrObject{
  constructor() {
    let dicegeometry = new T.BoxGeometry();
    //
    dicegeometry.faceVertexUvs = [[]];
    //6
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1, 0), new T.Vector2(2/3, 0), new T.Vector2(1, 1/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(2/3, 1/3), new T.Vector2(1, 1/3)]);
    //1
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 1/3), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 1/3), new T.Vector2(1/3, 2/3), new T.Vector2(2/3, 2/3)]);
    //3
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 0), new T.Vector2(1/3, 0), new T.Vector2(2/3, 1/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 0), new T.Vector2(1/3, 1/3), new T.Vector2(2/3, 1/3)]);
    //4
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 2/3), new T.Vector2(1/3, 2/3), new T.Vector2(2/3, 1)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 2/3), new T.Vector2(1/3, 1), new T.Vector2(2/3, 1)]);
    //2
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1/3, 1/3), new T.Vector2(0, 1/3), new T.Vector2(1/3, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(0, 1/3), new T.Vector2(0, 2/3), new T.Vector2(1/3, 2/3)]);
    //5
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(1, 1/3), new T.Vector2(2/3, 1/3), new T.Vector2(1, 2/3)]);
    dicegeometry.faceVertexUvs[0].push([new T.Vector2(2/3, 1/3), new T.Vector2(2/3, 2/3), new T.Vector2(1, 2/3)]);


    let dice_texture = new T.TextureLoader().load('../images/dice_texture.png');
    let dicematerial = [
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture }),
      new T.MeshStandardMaterial({ map: dice_texture}),
      new T.MeshStandardMaterial({ map: dice_texture })
  ];

    let mesh = new T.Mesh(dicegeometry, dicematerial);

    mesh.position.set(3,1,1);
    super("dice2", mesh);
  }
}


function test() {
  let world = new GrWorld();
  
  let dice1 = new Dice1();
  world.add(dice1);

  let dice2 = new Dice2();
  world.add(dice2);
  
  world.go();
}
Helpers.onWindowOnload(test);
