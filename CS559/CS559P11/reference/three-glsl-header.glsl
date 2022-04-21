1: precision highp float;
2: precision highp int;
3: #define HIGH_PRECISION
4: #define SHADER_NAME ShaderMaterial
5: #define VERTEX_TEXTURES
6: #define GAMMA_FACTOR 2
7: #define MAX_BONES 0
8: #define BONE_TEXTURE
9: #define DOUBLE_SIDED
10: uniform mat4 modelMatrix;
11: uniform mat4 modelViewMatrix;
12: uniform mat4 projectionMatrix;
13: uniform mat4 viewMatrix;
14: uniform mat3 normalMatrix;
15: uniform vec3 cameraPosition;
16: uniform bool isOrthographic;
17: #ifdef USE_INSTANCING
18:  attribute mat4 instanceMatrix;
19: #endif
20: attribute vec3 position;
21: attribute vec3 normal;
22: attribute vec2 uv;
23: #ifdef USE_TANGENT
24: 	attribute vec4 tangent;
25: #endif
26: #ifdef USE_COLOR
27: 	attribute vec3 color;
28: #endif
29: #ifdef USE_MORPHTARGETS
30: 	attribute vec3 morphTarget0;
31: 	attribute vec3 morphTarget1;
32: 	attribute vec3 morphTarget2;
33: 	attribute vec3 morphTarget3;
34: 	#ifdef USE_MORPHNORMALS
35: 		attribute vec3 morphNormal0;
36: 		attribute vec3 morphNormal1;
37: 		attribute vec3 morphNormal2;
38: 		attribute vec3 morphNormal3;
39: 	#else
40: 		attribute vec3 morphTarget4;
41: 		attribute vec3 morphTarget5;
42: 		attribute vec3 morphTarget6;
43: 		attribute vec3 morphTarget7;
44: 	#endif
45: #endif
46: #ifdef USE_SKINNING
47: 	attribute vec4 skinIndex;
48: 	attribute vec4 skinWeight;
49: #endif
50: 