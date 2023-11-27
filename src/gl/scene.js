import { Scene } from "three";
import Loader from "./util/loader.js";
import { Model } from "./model.js";
import { Spinner } from "./util/spinner.js";

// import Quad from "./_quad.js";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;

    this.create();
  }

  async create() {
    this.spinner = new Spinner();
    await Loader.load();

    // this.quad = new Quad();
    // this.add(this.quad);

    this.model = new Model();
    this.add(this.model);
  }

  render(t) {
    this.spinner.render();
    // console.log(this.spinner.spin);

    if (this.quad) this.quad.render(t);
    if (this.model) this.model.render(t, this.spinner);
  }

  resize() {}
}
