import * as THREE from "three";
import Experience from "./Experience.js";
import Landscape from "./Landscape";
import Character from "./Character";
import Lights from "./Lights";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setLight();
        this.setLandscape();
        this.setCharacter();
      }
    });
  }

  setCamera() {
    this.camera.modes.default.instance.position.set(0, 3, -16);
    this.camera.modes.default.this.camera.instance.lookAt(new THREE.Vector3(0, 2, 0));
  }

  setLight() {
    this.lights = new Lights();
    console.log(this.lights);
  }

  setLandscape() {
    this.landscape = new Landscape();
  }

  setCharacter() {
    this.character = new Character();
  }

  resize() {}

  update() {}

  destroy() {}
}
