// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw something.
 **/
window.onload = function() {
  /** @type {HTMLCanvasElement} */
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));

  let context = canvas.getContext("2d");

  // change this to draw a more complex shape that meets the requirement
  // drawing smile face
  function path() {
    context.moveTo(30, 90);
    context.lineTo(110, 20);
    context.lineTo(240, 130);
    context.lineTo(60, 130);
    context.lineTo(190, 20);
    context.lineTo(270, 90);
  }
  
  context.beginPath();
  path(); 
  context.fill("evenodd");           // change this to one rule

  context.beginPath();
  context.translate(100,120); 
  path(); 
  context.fill("nonzero");  
};