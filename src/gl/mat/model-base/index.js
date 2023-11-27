import { RawShaderMaterial, DoubleSide } from "three";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

export class BaseMaterial extends RawShaderMaterial {
  constructor(options) {
    super({
      vertexShader,
      fragmentShader,
    });

    this.current = 0;
    this.textureNumber = 0;
    if (options?.u_t1) this.textureNumber = options.u_t1.source.r;

    this.uniforms = {
      u_time: { value: options?.u_time || 0 },
      u_light_map: { value: window.loaded.light_map || null },
    };

    this.side = DoubleSide;
    // this.wireframe= true;
    // this.transparent= true;
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  nextTexture() {
    this.current++;
    if (this.current > this.textureNumber) this.current = 0;
    this.uniforms.u_current.value = this.current;
  }
}
