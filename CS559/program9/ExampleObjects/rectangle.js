/**
 * Created by gleicher on 10/9/15.
 */
/*
 a second example object for graphics town
 check out "simplest" first

 the cube is more complicated since it is designed to allow making many cubes

 we make a constructor function that will make instances of cubes - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
    (load time)
 2) there are things that are defined to be shared by all cubes - these need to be defined
    by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var Rectangle = undefined;
var SpinningCube = undefined;
var Cube = undefined;
var Rectangle1 = undefined;
var Rectangle2 = undefined;
var Rectangle3 = undefined;
var Rectangle4 = undefined;
var Rectangle5 = undefined;
var Rectangle6 = undefined;
var Rectangle7 = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    Rectangle = function Rectangle(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle.prototype.init = function(drawingState) {
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                    -.5,-.5,-.5,  .5,-.5,-.5,  .5, .5,-.5,        -.5,-.5,-.5,  .5, .5,-.5, -.5, .5,-.5,    // z = 0
                    -.5,-.5, .5,  .5,-.5, .5,  .5, .5, .5,        -.5,-.5, .5,  .5, .5, .5, -.5, .5, .5,    // z = 1
                    -.5,-.5,-.5,  .5,-.5,-.5,  .5,-.5, .5,        -.5,-.5,-.5,  .5,-.5, .5, -.5,-.5, .5,    // y = 0
                    -.5, .5,-.5,  .5, .5,-.5,  .5, .5, .5,        -.5, .5,-.5,  .5, .5, .5, -.5, .5, .5,    // y = 1
                    -.5,-.5,-.5, -.5, .5,-.5, -.5, .5, .5,        -.5,-.5,-.5, -.5, .5, .5, -.5,-.5, .5,    // x = 0
                     .5,-.5,-.5,  .5, .5,-.5,  .5, .5, .5,         .5,-.5,-.5,  .5, .5, .5,  .5,-.5, .5     // x = 1
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }

    };
    Rectangle.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size/1.5]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle1 = function Rectangle1(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle1.prototype = Object.create(Rectangle.prototype);
    Rectangle1.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size/1.5,this.size,this.size/2.75]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle1.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle2 = function Rectangle2(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle2.prototype = Object.create(Rectangle.prototype);
    Rectangle2.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size/1.5,this.size/1.5,this.size/1.5]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle2.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle3 = function Rectangle3(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle3.prototype = Object.create(Rectangle.prototype);
    Rectangle3.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size/15,this.size/2,this.size/15]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle3.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle4 = function Rectangle4(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle4.prototype = Object.create(Rectangle.prototype);
    Rectangle4.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size*1.25,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle4.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle5 = function Rectangle4(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle5.prototype = Object.create(Rectangle.prototype);
    Rectangle5.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size*1.5,this.size*1.75,this.size*1.5]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle5.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle6 = function Rectangle6(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle6.prototype = Object.create(Rectangle.prototype);
    Rectangle6.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size/20,this.size/4,this.size*2]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle6.prototype.center = function(drawingState) {
        return this.position;
    }

    Rectangle7 = function Rectangle7(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Rectangle7.prototype = Object.create(Rectangle.prototype);
    Rectangle7.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size*2,this.size/4,this.size/20]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Rectangle7.prototype.center = function(drawingState) {
        return this.position;
    }

    // constructor for SpinningRectangle
    SpinningCube = function SpinningCube(name, position, size, color, axis) {
        Rectangle.apply(this,arguments);
        this.axis = axis || 'X';
    }
    SpinningCube.prototype = Object.create(Rectangle.prototype);
    SpinningCube.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var theta = Number(drawingState.realtime)/200.0;
        if (this.axis == 'X') {
            twgl.m4.rotateX(modelM, theta, modelM);
        } else if (this.axis == 'Z') {
            twgl.m4.rotateZ(modelM, theta, modelM);
        } else {
            twgl.m4.rotateY(modelM, theta, modelM);
        }
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    SpinningCube.prototype.center = function(drawingState) {
        return this.position;
    }

    Cube = function Cube(name, position, size, color) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [.7,.8,.9];
    }
    Cube.prototype = Object.create(Rectangle.prototype);
    Cube.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Cube.prototype.center = function(drawingState) {
        return this.position;
    }


})();

grobjects.push(new Cube("Bottom of Taller Skyscraper",[3,1,0], 2, [.7,.7,.7]));
grobjects.push(new Rectangle("Middle of Taller Skyscraper",[3,3,-.34], 2, [.7,.7,.7]));
grobjects.push(new Rectangle1("Middle of Taller Skyscraper",[2.66,3,.65], 2, [.7,.7,.7]));
grobjects.push(new Rectangle2("Top of Taller Skyscraper",[2.66,4.65,-.35], 2, [.7,.7,.7]));
grobjects.push(new Rectangle3("Pole at Top of Taller Skyscraper",[2.66,5.75,-.35], 2, [1,0,0]));
//grobjects.push(new Cube("Light at Top of Taller Skyscraper",[2.66,6.25,-.35], .1, [1,1,0]));

grobjects.push(new Rectangle4("Bottom of Shorter Skyscraper",[4,1.25,3], 2, [.9,.9,.9]));
grobjects.push(new Rectangle5("Top of Shorter Skyscraper",[4.25,3,2.75], 1, [.9,.9,.9]));
grobjects.push(new Rectangle6("Railing of Shorter Skyscraper",[3,2.6,3], 1, [0,0,1]));
grobjects.push(new Rectangle7("Railing of Shorter Skyscraper",[4,2.6,4], 1, [0,0,1]));
grobjects.push(new Rectangle3("Pole at Top of Shorter Skyscraper",[4.25,4.25,2.75], 2, [1,0,0]));
//grobjects.push(new Cube("Light at Top of Shorter Skyscraper",[4.25,4.75,2.75], .1, [1,1,0]));

grobjects.push(new Cube("Brick Red House",[-3,.75,-3.25], 1.5, [.7,.1,.1]));

grobjects.push(new SpinningCube("Spinning Cube 1",[-5,.25,-2], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 2",[-5,.25,-2.75], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 3",[-5,.25,-3.5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 4",[-5,.25,-4.25], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 5",[-5,.25,-5], .5, [1,0,0], 'Y'));

grobjects.push(new SpinningCube("Spinning Cube 6",[-4.25,.25,-5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 7",[-3.5,.25,-5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 8",[-2.75,.25,-5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 9",[-2,.25,-5], .5, [1,0,0], 'Y'));

grobjects.push(new SpinningCube("Spinning Cube 10",[-1.25,.25,-5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 11",[-1.25,.25,-4.25], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 12",[-1.25,.25,-3.5], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 13",[-1.25,.25,-2.75], .5, [1,0,0], 'Y'));
grobjects.push(new SpinningCube("Spinning Cube 13",[-1.25,.25,-2], .5, [1,0,0], 'Y'));
