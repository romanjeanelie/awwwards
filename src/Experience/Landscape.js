import * as THREE from "three";
import Experience from "./Experience";

export default class Landscape {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    console.log(this.experience);

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(15, 15, 128, 128);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A09E96"),
      side: THREE.DoubleSide,
      //   metalness: 2,
      roughness: 0,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Active shadow
    this.mesh.receiveShadow = true;

    this.mesh.rotation.x = Math.PI * 0.5;
    this.scene.add(this.mesh);
  }
}
