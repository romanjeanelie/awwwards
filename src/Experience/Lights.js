import * as THREE from "three";
import Experience from "./Experience";

export default class Lights {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.setPointLight();
  }

  setPointLight() {
    console.log("set point light");
    // Setup
    this.pointLight = {};
    this.pointLight.color = "#ffffff";

    // Instance
    this.pointLight.instance = new THREE.PointLight(0xffffff, 10, 50, 2);
    this.pointLight.instance.position.x = 1;
    this.pointLight.instance.position.y = 1;
    this.pointLight.instance.position.z = 4;
    this.pointLight.instance.castShadow = true;
    // this.pointLight.instance.shadow.mapSize.set(1024, 1024);
    this.scene.add(this.pointLight.instance);

    // Helper
    this.pointLight.helper = new THREE.PointLightHelper(this.pointLight.instance, 1);
    this.pointLight.helper.visible = true;
    this.scene.add(this.pointLight.helper);
  }
}
