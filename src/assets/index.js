import cabin from "./cabin.02.glb";
import light_map from "./light-bake-4k.png";

import m1 from "./material/m1.webp";
import m2 from "./material/m2.webp";
import m3 from "./material/m3.webp";
import m4 from "./material/m4.webp";
import m5 from "./material/m5.webp";
import m6 from "./material/m6.webp";
import m7 from "./material/m7.webp";
import m8 from "./material/m8.webp";
import m9 from "./material/m9.webp";

import px from "./env/px.webp";
import nx from "./env/nx.webp";
import py from "./env/py.webp";
import ny from "./env/ny.webp";
import pz from "./env/pz.webp";
import nz from "./env/nz.webp";

const cbmarr = [px, nx, py, ny, pz, nz];

export const ASSETS = {
  cabin,
  light_map,
  mats: [m1, m2, m3, m4, m5, m6, m7, m8, m9],
  cbmarr,
};
