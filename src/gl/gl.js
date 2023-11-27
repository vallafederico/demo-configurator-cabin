import { WebGLRenderer } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Tween from "gsap";
import { Post } from "./post.js";

import Viewport from "./util/viewport.js";
import Scene from "./scene.js";
import Camera from "./_camera.js";

export class Gl {
  m = {
    x: 0,
    y: 0,
    ex: 0,
    ey: 0,
  };

  constructor(sel) {
    this.vp = new Viewport();
    this.renderer = new WebGLRenderer({
      antialias: true,
    });

    this.renderer.setPixelRatio(this.vp.dpr);
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(0x000000, 1);
    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = this.vp.camera = new Camera();

    this.camera.position.set(0, 0, 8);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;
    // this.controls.enableZoom = false;
    // // this.controls.maxZoom = 1.5;
    // this.controls.enablePan = false;
    // this.controls.maxPolarAngle = Math.PI / 2;
    // this.controls.minPolarAngle = Math.PI / 4;
    // // this.controls.autoRotate = true;

    this.paused = false;
    this.time = 0;

    this.init();
  }

  async init() {
    // this.loader = new Loader();
    // this.assets = await this.loader.load();

    this.create();
    this.initEvents();

    this.post = new Post({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    });

    this.render();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(this.vp.container);

    document.addEventListener("mousemove", (e) => {
      this.m.x = e.clientX / this.vp.w;
      this.m.y = e.clientY / this.vp.h;

      Tween.to(this.m, {
        ex: this.m.x,
        ey: this.m.y,
        duration: 0.5,
      });

      // console.log(this.m.ex, this.m.ey);
    });
  }

  create() {
    this.scene = new Scene();
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;

    this.controls?.update();

    if (this.scene && this.scene.render) this.scene.render(this.time);

    requestAnimationFrame(this.render.bind(this));
    // this.renderer.render(this.scene, this.camera);

    if (this.post?.isOn) {
      this.post.renderPasses(this.time);
      this.post.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    this.vp.resize();
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();

    this.post?.resize();

    if (this.scene) this.scene.resize();
  }

  /* Utils
   */

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }
}
