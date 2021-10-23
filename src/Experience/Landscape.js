import * as THREE from "three";
import vertexShader from "./shaders/Landscape/vertex.glsl";
import fragmentShader from "./shaders/Landscape/fragment.glsl";
import Experience from "./Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Landscape {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.mixer = null;
    this.time = 0;

    this.gltfLoader = new GLTFLoader(this.loadingManager);

    // Debug
    this.debugFolder = this.debug.addFolder({
      title: "landscape",
      expanded: true,
    });

    // this.setGeometry();
    this.setMaterial();
    // this.setMesh();
    this.setModel();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(15, 15, 128, 128);
  }

  setMaterial() {
    this.color = "#666666";

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // this.debugFolder.addInput(this, "color", { view: "color" }).on("change", () => {
    //   this.material.color.set(this.color);
    // });

    // this.debugFolder.addInput(this.material, "roughness", { min: 0, max: 1 });

    // this.debugFolder.addInput(this.material, "metalness", { min: 0, max: 1 });

    // this.debugFolder.addInput(this.material, "wireframe");
  }

  setModel() {
    this.model = {};
    this.model.group = this.resources.items.landscape.scene;
    this.model.animations = this.resources.items.landscape.animations[0];

    console.log(this.model.animations);

    this.model.group.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        // _child.material = this.material;
        // Active shadow
        _child.receiveShadow = true;
      }
    });

    // Animations
    this.mixer = new THREE.AnimationMixer(this.model.group);

    const action = this.mixer.clipAction(this.model.animations);
    action.play();

    this.scene.add(this.model.group);
  }

  update() {
    this.mixer.update(this.time.delta);
  }
}
