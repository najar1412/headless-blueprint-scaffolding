uniform float u_intensity;
uniform float u_time;
uniform vec3 u_color_lime;
uniform vec3 u_color_gray;

varying vec2 vUv;
varying float vDisplacement;

varying vec3 vPositionW;
varying vec3 vNormalW;

void main() {
  float distort = 4.0 * vDisplacement * u_intensity;

  vec3 colorA = vec3(0.94,0.94,0.94);
  vec3 colorDisortion = vec3(abs(colorA.xy - 0.6) * 2.0 * (0.5 - distort), 1.0);

  float fresnelTerm = (dot(vPositionW, colorDisortion) ); 

  vec3 dcol = mix(u_color_lime, colorA, fresnelTerm * -0.7);

  gl_FragColor = vec4(dcol.x, dcol.y, dcol.z, 1.0);
}
