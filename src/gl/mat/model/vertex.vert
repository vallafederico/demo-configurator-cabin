#define MPI 3.1415926535897932384626433832795
// precision mediump float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv1;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;


uniform float u_time;

varying vec2 v_uv;
varying vec2 v_uv1;
varying vec3 v_normal;
varying vec4 v_coords;


void main() {
  vec3 pos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_coords = modelMatrix * vec4(pos, 1.0);
  v_uv = uv;
  v_uv1 = uv1;
  v_normal = normal;
}
