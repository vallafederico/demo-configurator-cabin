// import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { N8AOPass } from "n8ao";

import { Shader } from "./mat/post/base";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.createPasses();
  }

  createPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.addPass(this.renderPass);

    // this.createAO();

    // custom shader pass
    // this.addPass(new Shader());
  }

  createAO() {
    this.n8aopass = new N8AOPass(
      this.scene,
      this.camera,
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.n8aopass.configuration.gammaCorrection = false;
    // this.n8aopass.configuration.screenSpaceRadius = false;
    // this.n8aopass.configuration.halfRes = true;
    this.n8aopass.configuration.aoRadius = 0.5;
    this.n8aopass.configuration.distanceFalloff = 0.3;
    this.addPass(this.n8aopass);
  }

  resize() {
    this.n8aopass = new N8AOPass(
      this.scene,
      this.camera,
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.n8aopass.configuration.gammaCorrection = false;
  }

  renderPasses(t) {}
}

/*
if (this.post?.isOn) {
    this.post.renderPasses(this.time);
    this.post.render();
  } else {
    this.renderer.render(this.scene, this.camera);
  }
*/
