precision mediump float;

uniform float u_time;
uniform sampler2D u_light_map; 
uniform sampler2D u_t1; 
// uniform float u_tx_num;
// uniform float u_current;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec2 v_uv1;

const vec3 COL_NEUTRAL = vec3(0.8, 0.8, 0.8);

void main() {
  vec4 shadow = texture2D(u_light_map, v_uv1);
  // vec4 diff = texture2D(u_t1, vec2(
  //   (v_uv.x / u_tx_num) + u_current / u_tx_num, 
  //   v_uv.y)
  // );
  
  vec3 col = shadow.rgb ;
  // vec3 col = diff.rgb * shadow.rgb;



  gl_FragColor.rgb = col;
  // gl_FragColor.rgb = vec3(v_uv1, 1.);
  gl_FragColor.a = 1.;
}


//  hemi light
  // vec3 h_sky = vec3(1., 1., 1.);
  // vec3 h_ground = vec3(.1, .1, .1);
  // vec3 h_dir = normalize(vec3(1., 2., 2.));
  // vec3 hlight = mix(h_ground, h_sky, 1. - dot(h_dir, v_normal));

  //  point light
  // vec3 p_pos = vec3(2., 2., 1.);
  // vec3 p_col = vec3(1., 0., 0.);
  // vec3 p_dir = normalize(p_pos - v_normal);
  // vec3 plight = p_col * max(0., dot(p_dir, v_normal));

  // col *= (1. + plight * .5)
  // col *=  (1. - hlight * .1);