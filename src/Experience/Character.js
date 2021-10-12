import * as THREE from "three";
import Experience from "./Experience";

export default class Character {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;

    this.setModel();
    this.setMaterial();
    // this.setDummy();
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  }

  setModel() {
    this.model = {};
    this.model.group = this.resources.items.character.scene;

    this.model.group.scale.set(0.002, 0.002, 0.002);
    this.scene.add(this.model.group);

    this.model.group.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.castShadow = true;
        // console.log(_child.material);
      }
    });
  }

  setDummy() {
    this.dummy = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
    this.dummy.castShadow = true;
    this.dummy.receiveShadow = true;
    this.scene.add(this.dummy);
  }
}
