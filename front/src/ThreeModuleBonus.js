import * as THREE from "three";


// rotation rate, in radians per frame
const ROTATION_SPEED = 0.05;

// amount to increase/decrease speed per key press (q / a)
// measured in meters/second
const ACCELERATION = 50;

export default class ThreeModule {

  constructor(props) {

    // Set initial speed to zero
    this.speed = -100;

    // Store a time stamp when a new rendering starts
    this.frametime = 0;

    // Store a time stamp from the previous rendering
    this.previousFrameTime = 0;

    // In three.js, everything to be drawn must be added to the Scene object
    this.scene = new THREE.Scene();

    // Define a general white light covering the entire scene
    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);

    // Define the camera - having a 45 degree field of view
    // and an aspect ratio matching the aspect of the browser window
    // and with a near limit of 10 and and far limit of 20000
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      10,
      20000
    );

    // Define the initial camera position (x, y, z)
    this.camera.position.set(6000, 6500, 1200);

    // Fix up the camera coordinate conventions - so that the
    // x and y coordinates run along the surface of our terrain
    // and z describes the height
    this.camera.rotateX(Math.PI / 4);
    this.camera.up = new THREE.Vector3(0, 0, 1);

    // Set up WebGL and attach a canvas element to the DOM
    this.renderer = new THREE.WebGLRenderer();

    // Set a background color: Simulate sky blue
    this.renderer.setClearColor(new THREE.Color(0.5, 0.6, 0.8), 1);

    // Set the canvas element to be full screen
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjust pixel size for retina screens
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add the canvas element Three.js renders to onto the DOM
    props.ref.appendChild(this.renderer.domElement);

    // Bind the resize handler function before using it
    this.resizeHandler = this.resizeHandler.bind(this);

    // Attach the resize handler function to the event
    window.addEventListener("resize", this.resizeHandler, false);

    // Bind the keyborard handler function before using it
    this.keyboardHandler = this.keyboardHandler.bind(this);

    // Attach the keyboard handler function to the event
    window.addEventListener("keydown", this.keyboardHandler, false);

    // Uncomment this code to render three lines on the screen, each describing the x, y and z axes
    // const helper = new THREE.AxesHelper(1000);
    // this.scene.add(helper);

    // Add a ground plane - a flat mesh.
    // The size and number of segments must match the source data height map.
    // The demo input file has 50 meter resolution and has 256 by 256 data points.
    // The ground plane should then be 50 * 256 units long and wide.
    // It should have 256 segments in each direction - to match the input data.
    const geometry = new THREE.PlaneBufferGeometry(
      50 * 256,
      50 * 256,
      256,
      256
    );

    // Define a grey colored material, having smooth shading
    const material = new THREE.MeshPhongMaterial();


    console.log(
      props.textureMap,
      props.imageMap);

    // ./data/91250-6973750.jpg ./data/91250-6973750.png

    // Load the height map from the png file
    const displacementMap = new THREE.TextureLoader().load(
      props.textureMap || "./data/91250-6973750.png"

    );
    material.displacementMap = displacementMap;
    material.displacementScale = props.displacementScale || 2000;

    // Load the photo texture from the jpg file

    const texture = new THREE.TextureLoader().load(
      props.imageMap || "./data/91250-6973750.jpg"
    );

    material.map = texture;

    // Define this to be a Mesh
    const ground = new THREE.Mesh(geometry, material);

    // By default, the center point for a Mesh is placed at (0, 0, 0)
    // Here we move the mesh so the lower left corner is at (0, 0, 0) instead
    ground.position.set(props.groundPosX || (50 * 256) / 2, props.groundPosY || (50 * 256) / 2, props.groundPosZ || 0);

    // Add the ground to the scene
    this.scene.add(ground);

    // Bind the animate function before using it
    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate(currentFrametime) {
    this.frametime = currentFrametime - this.previousFrameTime || 0;
    this.previousFrameTime = currentFrametime;

    requestAnimationFrame(this.animate);

    let cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);
    this.camera.position.addScaledVector(
      cameraDirection,
      this.speed * this.frametime * 0.001
    );

    this.renderer.render(this.scene, this.camera);
  }

  resizeHandler() {
    // Adjust the camera aspect according to the window aspect
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Also adjust the canvas element size so it stays full screen
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  keyboardHandler(keyboardEvent) {
    switch (keyboardEvent.key) {
      case "ArrowDown":
        this.camera.rotateX(ROTATION_SPEED);
        break;
      case "ArrowUp":
        this.camera.rotateX(-ROTATION_SPEED);
        break;
      case "ArrowLeft":
        this.camera.rotateZ(ROTATION_SPEED);
        break;
      case "ArrowRight":
        this.camera.rotateZ(-ROTATION_SPEED);
        break;
      case "q":
        this.speed += ACCELERATION;
        break;
      case "a":
        this.speed -= ACCELERATION;
        break;
      case "z":
        this.camera.rotateY(ROTATION_SPEED);
        break;
      case "x":
        this.camera.rotateY(-ROTATION_SPEED);
        break;
      default:
        break;
    }
  }
}
