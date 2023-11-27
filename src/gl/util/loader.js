import { ASSETS } from "../../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";
import loadCube from "./cube-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  static async load() {
    console.time("::");
    let [cabin, light_map] = await Promise.all([
      loadModel(ASSETS.cabin),
      loadTexture(ASSETS.light_map),
    ]);

    const mats = await Promise.all(ASSETS.mats.map((m) => loadTexture(m)));
    const cbm = await loadCube(ASSETS.cbmarr);
    // console.log(cbm);

    cabin = cabin.model;
    light_map.flipY = false;

    window.loaded = {
      model: cabin,
      light_map,
      mats,
      cbm,
    };

    // console.log(">>>", window.loaded);
    console.timeEnd("::");
  }

  pipeload() {}
}
