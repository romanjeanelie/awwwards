import * as THREE from "three";
import Experience from "./Experience";

export default class Lights {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    this.debugFolder = this.debug.addFolder({
      title: "lights",
      expanded: true,
    });

    this.setPointLight();
  }

  setPointLight() {
    // Setup
    this.pointLight = {};
    this.pointLight.color = "#ffffff";

    // Instance
    this.pointLight.instance = new THREE.PointLight(0xffffff, 21.74, 50, 10);

    // Shadows
    this.pointLight.instance.castShadow = true;
    this.pointLight.instance.shadow.mapSize.set(1024, 1024);

    this.pointLight.instance.position.x = 2.61;
    this.pointLight.instance.position.y = 10;
    this.pointLight.instance.position.z = 3.48;

    this.scene.add(this.pointLight.instance);

    // Helper
    this.pointLight.helper = new THREE.PointLightHelper(this.pointLight.instance, 1);
    this.pointLight.helper.visible = true;
    this.scene.add(this.pointLight.helper);

    // Debug
    const debugFolder = this.debugFolder.addFolder({
      title: "pointLight",
      expanded: true,
    });

    debugFolder.addInput(this.pointLight, "color", { view: "color" }).on("change", () => {
      this.pointLight.instance.color.set(this.pointLight.color);
    });
    debugFolder.addInput(this.pointLight.instance, "intensity", { min: 0, max: 50 });
    debugFolder.addInput(this.pointLight.instance, "distance", { min: 0, max: 100 });
    debugFolder.addInput(this.pointLight.instance, "decay", { min: 0, max: 10 });

    debugFolder.addInput(this.pointLight.instance.position, "x", { min: -10, max: 10 });
    debugFolder.addInput(this.pointLight.instance.position, "y", { min: -10, max: 10 });
    debugFolder.addInput(this.pointLight.instance.position, "z", { min: -20, max: 20 });
  }

  update() {
    this.pointLight.instance.position.y = 5 + Math.sin(this.time.current * 0.0003) * 5;
    this.pointLight.instance.distance = 20 + Math.sin(this.time.current * 0.0003) * 20;
  }
}
