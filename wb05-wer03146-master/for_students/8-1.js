// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/dragPoints.js";

window.onload = function() {
  let theCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
  let thePoints = [ [100,100], [200,100], [200,200], [100,200]];
  
  let context = theCanvas.getContext("2d");
  // Hexagon
  let r = Math.min(theCanvas.width + theCanvas.height) / 8;
  for (let i = 0; i < 6; i ++) 
  {
    let theta = i / 6 * 2 * Math.PI;
    thePoints[i] = [theCanvas.width / 2 + r * Math.cos(theta), theCanvas.height / 2 + r * Math.sin(theta)];
  }

  function draw() {
 
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    let r = 5;
    // Draw a circle for each point
    thePoints.forEach(function(pt)
    {
      context.save();
      context.translate(pt[0], pt[1]);
      context.beginPath();
      context.arc(0, 0, r, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    });
    // Draw a line connecting the points
    context.save();
    let n = thePoints.length - 1;
    context.beginPath();
    context.moveTo(thePoints[n][0], thePoints[n][1]);
    context.lineWidth = r / 2;
    thePoints.forEach(function(pt)
    {
      context.lineTo(pt[0], pt[1]);
    });
    context.stroke();
    context.restore();
  }

  draggablePoints(theCanvas, thePoints, draw);
  draw();
};