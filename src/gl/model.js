import { Group } from "three";
import { ModelMaterial } from "./mat/model/index.js";
import { BaseMaterial } from "./mat/model-base/index.js";

export class Model extends Group {
  position = { x: 0, y: -0.8, z: 0 };

  constructor() {
    super();

    this.mats = window.loaded.mats.map((m) => new ModelMaterial({ u_t1: m }));

    this.model = window.loaded.model;
    this.traverse();
    this.add(this.model);

    this.addEvents();
  }

  addEvents() {
    this.trigs = [...document.querySelector(".ctrl").children];
    this.trigs.forEach((t, i) => {
      t.addEventListener("click", () => {
        this.mats[i].nextTexture();
      });
    });
  }

  assignMaterial(child) {}

  traverse() {
    this.model.traverse((child) => {
      if (child.isMesh) {
        if (child.name.substr(1, 1) !== "-") {
          const ind = +child.name.substr(1, 1) - 1;
          child.material = this.mats[ind];
        } else {
          child.material = new BaseMaterial();
        }
      }
    });
  }

  render(t, { spin, velocity }) {
    this.model.rotation.y = spin.x;
    // this.rotation.x = 0.2 + velocity.y;
    // this.model.rotation.y = window.app.gl.m.ex;
    // this.model.rotation.z = window.app.gl.m.ey;
  }
}
