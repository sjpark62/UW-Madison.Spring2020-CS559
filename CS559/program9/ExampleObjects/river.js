/**
 * Created by gleicher on 10/9/2015.
 */

/**
 the simplest possible object for the system

 look at this example first.
 be sure to read grobject.js to understand what this object is an "instance of"
 (even though there is no class definition)

 this object does the absolute minimum set of things.
 also, it defines everything itself - there is not prototype that we
 make lots of copies of.

 it will draw a pyramid at the origin. it's pretty useless - since it's in this fixed
 location
 but it's a start

 i am doing this without twgl - even though it makes my code kindof big.
 but it should be easier to see the GL calls
 the GL stuff is very much based on the "two transformed colored triangles" example from
 class (see the JSBin)
 **/

// this defines the global list of objects
    // if it exists already, this is a redundant definition
    // if it isn't create a new array
var grobjects = grobjects || [];

// now, I make a function that adds an object to that list
// there's a funky thing here where I have to not only define the function, but also
// run it - so it has to be put in parenthesis
(function() {
    "use strict";

    // I am keeping the shader code here so it doesn't "leak" out - it's ugly, but it will
    // keep this example simple. i do not recommend this for future objects
    var vertexSource = ""+
        "precision highp float;" +
        "attribute vec3 pos;" +
        "attribute vec3 inColor;" +
        "varying vec3 outColor;" +
        "uniform mat4 modl;" +
        "uniform mat4 view;" +
        "uniform mat4 proj;" +
        "attribute vec2 vTexCoord;" +
        "varying vec2 fTexCoord;" +
        "void main(void) {" +
        "  gl_Position = proj * view * modl * vec4(pos, 1.0);" +
        "  outColor = inColor;" +
        "  fTexCoord = vTexCoord;" +
        "}";

    var fragmentSource = "" +
        "precision highp float;" +
        "varying vec3 outColor;" +
        "varying vec2 fTexCoord;" +
        "uniform sampler2D texSampler;" +
        "void main(void) {" +
        "  vec4 texColor = texture2D(texSampler,fTexCoord);" +
        "  gl_FragColor = vec4(texColor.xyz, texColor.a);" +
        "}";

    // putting the arrays of object info here as well
    var vertexPos = [
        -0.5, 0.0, -0.5,    1.0, 0.0, -0.5,   -0.5, 0.0,  0.5,
        0.5, 0.0, 0.5,    1.0, 0.0, -0.5,   -0.5, 0.0,  0.5
    ];

    // make each triangle be a slightly different color - but each triangle is a solid color
    var vertexColors = [
        0.0, 0.0, 0.7,   0.0, 0.0, 0.7,   0.0, 0.0, 0.7,
        0.0, 0.0, 0.7,   0.0, 0.0, 0.7,   0.0, 0.0, 0.7
    ];

    /**var vertexTextureCoords = [
            0, 0,   1, 0,   1, 1,
            0, 0,   1, 1,   0, 1
    ];*/

    // define the pyramid object
    // note that we cannot do any of the initialization that requires a GL context here
    // we define the essential methods of the object - and then wait
    //
    // another stylistic choice: I have chosen to make many of my "private" variables
    // fields of this object, rather than local variables in this scope (so they
    // are easily available by closure).
    var river = {
        // first I will give this the required object stuff for it's interface
        // note that the init and draw functions can refer to the fields I define
        // below
        name : "River",
        // the two workhorse functions - init and draw
        // init will be called when there is a GL context
        // this code gets really bulky since I am doing it all in place
        init : function(drawingState) {
            // an abbreviation...
            var gl = drawingState.gl;

            // compile the vertex shader
            var vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader,vertexSource);
            gl.compileShader(vertexShader);
            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(vertexShader));
                return null;
            }
            // now compile the fragment shader
            var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader,fragmentSource);
            gl.compileShader(fragmentShader);
            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(fragmentShader));
                return null;
            }
            // OK, we have a pair of shaders, we need to put them together
            // into a "shader program" object
            // notice that I am assuming that I can use "this"
            this.shaderProgram = gl.createProgram();
            gl.attachShader(this.shaderProgram, vertexShader);
            gl.attachShader(this.shaderProgram, fragmentShader);
            gl.linkProgram(this.shaderProgram);
            if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
                alert("Could not initialize shaders");
            }
            // get the locations for each of the shader's variables
            // attributes and uniforms
            // notice we don't do much with them yet
            this.posLoc = gl.getAttribLocation(this.shaderProgram, "pos");
            this.colorLoc = gl.getAttribLocation(this.shaderProgram, "inColor");
            this.projLoc = gl.getUniformLocation(this.shaderProgram,"proj");
            this.viewLoc = gl.getUniformLocation(this.shaderProgram,"view");
            /**this.shaderProgram.texcoordAttribute = gl.getAttribLocation(this.shaderProgram, "vTexCoord");
            gl.enableVertexAttribArray(this.shaderProgram.texcoordAttribute);
            this.shaderProgram.texSampler = gl.getUniformLocation(this.shaderProgram, "texSampler");
            gl.uniform1i(this.shaderProgram.texSampler, 0);*/

            // now to make the buffers for the 4 triangles
            this.posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPos), gl.STATIC_DRAW);
            this.colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);
            /**this.textureBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(vertexTextureCoords), gl.STATIC_DRAW);*/

            this.shaderProgram.MVPmatrix = gl.getUniformLocation(this.shaderProgram,"modl");
            /**
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            this.image = new Image();*/

        },
        draw : function(drawingState) {
            var gl = drawingState.gl;

            /**
            this.image.onload = LoadTexture;
            this.image.src = LoadedImageFiles["water_river_normal_sharp.jpg"].src;
            function LoadTexture()
            {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

                // Option 1 : Use mipmap, select interpolation mode
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }*/

            var tScale = twgl.m4.scaling([1.5,0,10]);
            var tTranslation = twgl.m4.translation([0,0.01,0]);
            var tFinal = twgl.m4.multiply(tScale, tTranslation);

            // choose the shader program we have compiled
            gl.useProgram(this.shaderProgram);
            // enable the attributes we had set up
            gl.enableVertexAttribArray(this.posLoc);
            gl.enableVertexAttribArray(this.colorLoc);
            // set the uniforms
            gl.uniformMatrix4fv(this.shaderProgram.MVPmatrix,false,tFinal);
            gl.uniformMatrix4fv(this.viewLoc,false,drawingState.view);
            gl.uniformMatrix4fv(this.projLoc,false,drawingState.proj);
            // connect the attributes to the buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.vertexAttribPointer(this.colorLoc, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
            gl.vertexAttribPointer(this.posLoc, 3, gl.FLOAT, false, 0, 0);
            /**gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(this.shaderProgram.texcoordAttribute, 2,
                gl.FLOAT, false, 0, 0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);*/
            gl.drawArrays(gl.TRIANGLES, 0, 6);

        },
        center : function(drawingState) {
            return [1,1,1];
        },

        // these are the internal methods / fields of this specific object
        // we want to keep the shaders and buffers - rather than rebuild them
        // every draw. we can't initialize them now, but rather we need to wait
        // until there is a GL context (when we call init)
        // technically, these don't need to be defined here - init can just
        // add fields to the object - but I am putting them here  since it feels
        // more like a normal "class" declaration
        shaderProgram : undefined,
        posBuffer : undefined,
        colorBuffer : undefined,
        textureBuffer : undefined,
        indexBuffer : undefined,
        image : undefined,
        texture : undefined,
        posLoc : -1,
        colorLoc : -1,
        projLoc : -1,
        viewLoc : -1
    };

    // now that we've defined the object, add it to the global objects list
    grobjects.push(river);
})();