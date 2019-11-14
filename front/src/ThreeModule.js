import * as THREE from "three";

export default class ThreeModule {
  constructor(ref) {
    // In three.js, everything to be drawn must be added to the Scene object
    this.scene = new THREE.Scene();

    // Define a point light (i.e. a light bulb), shining with white color
    this.light = new THREE.PointLight(0xffffff);
    this.light.position.set(25, 50, 20);

    // Add the light to the scene
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
    this.camera.position.set(0, -20, 10);

    // Fix up the camera coordinate conventions - so that the
    // x and y coordinates run along the surface of our terrain
    // and z describes the height
    this.camera.rotateX(Math.PI / 2);
    this.camera.up = new THREE.Vector3(0, 0, 1);

    // Set up WebGL and attach a canvas element to the DOM
    this.renderer = new THREE.WebGLRenderer();

    // Set the canvas element to be full screen
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjust pixel size for retina screens
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add the canvas element Three.js renders to onto the DOM
    ref.current.appendChild(this.renderer.domElement);

    // Bind the resize handler function before using it
    this.resizeHandler = this.resizeHandler.bind(this);

    // Attach the function to the event
    window.addEventListener("resize", this.resizeHandler, false);

    //        window.addEventListener("keydown", keyboardHandler);

    // Uncomment this code to render three lines on the screen, each describing the x, y and z axes
    // const helper = new THREE.AxesHelper(1000);
    // this.scene.add(helper);

    // For now, add a ground plane 200 units long and 200 units wide
    // consisting of 256 grid segments in each direction
    const geometry = new THREE.PlaneBufferGeometry(200, 200, 256, 256);

    // Define a grey colored material, having smooth shading
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });

    // Define this to be a Mesh
    const ground = new THREE.Mesh(geometry, material);

    // Add the ground to the scene
    this.scene.add(ground);

    // Bind the animate function before using it
    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  resizeHandler() {
    // Adjust the camera aspect according to the window aspect
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Also adjust the canvas element size so it stays full screen
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
