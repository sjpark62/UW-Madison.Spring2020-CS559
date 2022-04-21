// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 2
 * 
 * draw a picture using curves!
 **/
window.onload = function() {
  let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
  let context = theCanvas.getContext("2d");
  // Generate random coordinates and color components
  function rand_x() {return Math.random() * theCanvas.width;}
  function rand_y() {return Math.random() * theCanvas.height;}
  function rand_c() {return Math.random() * 255;}

  let px = 0;
  let py = 0;

  for (let i = 0; i < 60; i ++) 
  {
    context.beginPath();
    context.strokeStyle = `rgb(${rand_c()}, ${rand_c()}, ${rand_c()})`;
    context.moveTo(px, py);
    px = rand_x();
    py = rand_y();
    context.bezierCurveTo(rand_x(), rand_y(), rand_x(), rand_y(), px, py);
    context.stroke();
  }
  
  context.beginPath();
  context.strokeStyle = `rgb(${rand_c()}, ${rand_c()}, ${rand_c()})`;
  context.moveTo(px, py);
  context.lineTo(theCanvas.width, theCanvas.height);
  context.stroke();
};
