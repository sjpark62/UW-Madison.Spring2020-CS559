/*jshint esversion: 6 */
// @ts-check

// get things we need
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import {
  GrSimpleSwing,
  GrColoredRoundabout,
  GrSimpleRoundabout,
  GrAdvancedSwing,
  GrCarousel,
  GrTeacups
} from "./8-parkobjects.js";
import { SimpleBouncer } from "./8-simplepark.js";

function test() {
  let parkDiv = document.getElementById("div1");
  let world = new GrWorld({ groundplanesize: 20, where: parkDiv });

  let swing = new GrAdvancedSwing({ x: 13 });
  world.add(swing);

  let teacups = new GrTeacups({x: 5, z: 10});
  world.add(teacups);

  let carousel = new GrCarousel(({x: -7, z: -7}));
  world.add(carousel);

  let roundabout = new GrSimpleRoundabout({ x: -2 });
  world.add(roundabout);

  let roundabout_2 = new GrColoredRoundabout({ x: 5 });
  world.add(roundabout_2);

  let swing_2 = new GrSimpleSwing({ x: 10 });
  world.add(swing_2);

  function loop() {
    world.animate();
    window.requestAnimationFrame(loop);
  }
  loop();
}
window.onload = test;
