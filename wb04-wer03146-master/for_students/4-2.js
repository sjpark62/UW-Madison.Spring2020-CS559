/**
 * 4-2.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as utilities from "./4-utilities.js";

/**
 * TwoDots - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * You must write this function using transform.
 * There should not be any rotate, translate or scale function calls.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let scale = Math.sqrt(dx * dx + dy * dy) / 10.0;
    let angle = Math.atan2(dy, dx);
    let a = scale * Math.cos(angle);
    let b = scale * Math.sin(angle);
    let c = -scale * Math.sin(angle);
    let d = scale * Math.cos(angle);
    let e = x1;
    let f = y1;
    // please leave this line - you should CHANGE the 6 lines above
    context.transform(a,b,c,d,e,f);
}

window.onload = function () {
    utilities.setup("canvas1", twoDots);
}