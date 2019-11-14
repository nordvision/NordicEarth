import * as THREE from "three";

export default class ThreeModule {
  constructor() {
    // In three.js, everything to be drawn must be added to the Scene object
    this.scene = new THREE.Scene();

    // Define a light, shining with white color
    // and being located at x, y, z coordinate (100, 100, 200)
    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(100, 100, 200);

    this.scene.add(this.light);

    // Define the camera - having a 45 degree field of view
    // and an aspect ratio matching the aspect of the browser window
    // and with a near and far limit of 1 and 2000
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );

    // Define the camera position (x, y, z)
    this.camera.position.set(10, 10, 20);

    // Fix up the camera coordinate conventions - so that the
    // x and y coordinates run along the surface of our terrain
    // and z describes the height
    this.camera.rotateX(Math.PI / 2);
    this.camera.up = new THREE.Vector3(0, 0, 1);

    // Set up WebGL and attach a canvas element to the DOM
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    //        window.addEventListener("keydown", keyboardHandler);
    //        window.addEventListener("resize", resizeHandler, false);

    // For now, lets render three lines describing the x, y and z axes
    const helper = new THREE.AxesHelper(1000);
    this.scene.add(helper);

    // For now, add a ground plane 1000 long and 1000 units wide
    const geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const ground = new THREE.Mesh(geometry, material);

    this.scene.add(ground);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}
