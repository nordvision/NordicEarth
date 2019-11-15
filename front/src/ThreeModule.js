import * as THREE from "three";

const defaultCoordinate = [91250, 6973750];

const tilesets = [
  {
    id: "sweden",
    minX: 600000,
    maxX: 800000,
    minY: 6400000,
    maxY: 6700000,
    scale: 6000,
    text: "Russian submarine"
  },
  {
    id: "norway",
    minX: 91250,
    maxX: 100000,
    minY: 6973750,
    maxY: 7100000,
    scale: 2000,
    text: "Molde"
  },
  {
    id: "denmark",
    minX: 306148,
    maxX: 330000,
    minY: 6170538,
    maxY: 6200000,
    scale: 2000,
    text: "Roskilde"
  }
];

function rangeMapper([x, y]) {
  let tileset;
  for (const ts of tilesets) {
    if (ts.minX <= x && x <= ts.maxX && ts.minY <= y && y <= ts.maxY) {
      tileset = ts;
    }
  }
  const tileX = x - ((x - tileset.minX) % (TILE_RESOLUTION * 255));
  const tileY = y - ((y - tileset.minY) % (TILE_RESOLUTION * 255));
  return { x: tileX, y: tileY, tileset };
}

function coordinateToScene([x, y], tile) {
  const tileX = x - tile.x;
  const tileY = y - tile.y;

  return { x: tileX, y: tileY };
}

// rotation rate, in radians per frame
const ROTATION_SPEED = 0.05;

// amount to increase/decrease speed per key press (q / a)
// measured in meters/second
const ACCELERATION = 50;

// tile definition, depends on the topography and texture input data
const TILE_RESOLUTION = 50;
const TILE_POINT_COUNT = 256;
const TILE_SIZE = TILE_RESOLUTION * TILE_POINT_COUNT;

export default class ThreeModule {
  constructor(ref, originCoordinate) {
    // Set initial speed to zero
    this.speed = 0;

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
    // and with a near limit of 10 and and far limit of 40000
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      10,
      40000
    );

    // Define the initial camera position (x, y, z)
    this.camera.position.set(5000, 5000, 1000);

    // Fix up the camera coordinate conventions - so that the
    // x and y coordinates run along the surface of our terrain
    // and z describes the height
    this.camera.rotateX(Math.PI / 2);
    this.camera.up = new THREE.Vector3(0, 0, 1);

    // Set up WebGL and attach a canvas element to the DOM
    this.renderer = new THREE.WebGLRenderer();

    // Set a background color: Simulate sky blue
    const skyColor = new THREE.Color(0.5, 0.6, 0.8);
    this.renderer.setClearColor(skyColor, 1);

    // Set the canvas element to be full screen
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjust pixel size for retina screens
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add horizon
    this.createHorizon();
    const near = 1000;
    const far = TILE_SIZE*3;
    this.scene.fog = new THREE.Fog(skyColor, near, far);

    // Add the canvas element Three.js renders to onto the DOM
    ref.current.appendChild(this.renderer.domElement);

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

    // Find the tile and tileset originCoordinate is on
    const tile = originCoordinate
      ? rangeMapper(originCoordinate)
      : rangeMapper(defaultCoordinate);
    console.log(`Loading tile ${tile.x}-${tile.y} from ${tile.tileset.id}`);
    this.createTile(tile, { x: 0, y: 0 });
    // Add neighbour tiles if they exist
    for (const x of [-1, 0, 1]) {
      for (const y of [-1, 0, 1]) {
        if (x !== 0 || y !== 0) {
          this.createTile({...tile, x: tile.x + x*TILE_SIZE, y: tile.y + y*TILE_SIZE}, {x,y});
        }
      }
    }
    

    if (originCoordinate) {
      const targetCoordinate = coordinateToScene(originCoordinate, tile);
      this.createPole(targetCoordinate, tile.tileset.text);
      this.camera.lookAt(new THREE.Vector3(targetCoordinate.x, targetCoordinate.y, 0))
    }


    // Bind the animate function before using it
    this.animate = this.animate.bind(this);
    this.animate(); 
  }

  createHorizon() {
    const geometry = new THREE.PlaneBufferGeometry(
      TILE_SIZE*10,
      TILE_SIZE*10
    );

    // Define a grey colored material, having smooth shading
    const material = new THREE.MeshLambertMaterial({color: new THREE.Color(0.45, 0.5, 0.7)});

    // Define this to be a Mesh
    const horizon = new THREE.Mesh(geometry, material);
    horizon.position.set(0, 0, -100);
    this.scene.add(horizon);
  }

  createTile(tile, origin) {
    // Add a ground plane - a flat mesh.
    // The size and number of segments must match the source data height map.
    // The demo input file has 50 meter resolution and has 256 by 256 data points.
    // The ground plane should then be 50 * 256 units long and wide.
    // It should have 256 segments in each direction - to match the input data.
    const geometry = new THREE.PlaneBufferGeometry(
      TILE_SIZE,
      TILE_SIZE,
      TILE_POINT_COUNT,
      TILE_POINT_COUNT
    );

    // Define a grey colored material, having smooth shading
    const material = new THREE.MeshPhongMaterial();

    const displacementMap = new THREE.TextureLoader().load(
      `./data/${tile.x}-${tile.y}.png`
    );
    material.displacementMap = displacementMap;
    material.displacementScale = tile.tileset.scale;

    // Define this to be a Mesh
    const ground = new THREE.Mesh(geometry, material);

    // By default, the center point for a Mesh is placed at (0, 0, 0)
    // Here we move the mesh so the lower left corner is at (0, 0, 0) instead
    const centerX = origin.x*(TILE_SIZE) + (TILE_SIZE) / 2;
    const centerY = origin.y*(TILE_SIZE) + (TILE_SIZE) / 2;
    ground.position.set(centerX, centerY, 0);

    // Initiate loading the photo texture from the jpg file

    new THREE.TextureLoader().load(
      `./data/${tile.x}-${tile.y}.jpg`,
      (texture) => {
        material.map = texture;
        // Only add the ground to the scene if there is a texture
        this.scene.add(ground)
      },
      undefined,
      undefined
    );
  }

  createPole(coordinate, text) {
    // Create the sign
    const signPosition = coordinate;
    // how tall the sign is
    const billboardElevation = 500;
    // how wide the pole is
    const billboardPoleWidth = 14;

    ////// START UGLY BILLBOARD HACK

    this.text = text;

    const billboardPixelHeight = 66;
    const billboardLineWidth = 8;
    const billboardFont = "bold 40px Helvetica";
    const billboardPixelWidthPadding = 60;
    const billboardPixelMinimumWidth = 140;

    const textureWidth = 512;
    const textureHeight = 256;

    // scaling factor for billboard texture,
    // maps pixels (texture) to metres (geometry)
    const textureScale = 2;
    const billboardGeometryWidth = textureWidth * textureScale;
    const billboardGeometryHeight = textureHeight * textureScale;

    this.textureCanvas = document.createElement("canvas");
    this.ctx = this.textureCanvas.getContext("2d");
    this.textureCanvas.width = textureWidth;
    this.textureCanvas.height = textureHeight;

    // clear the canvas
    this.ctx.clearRect(
      0,
      0,
      this.textureCanvas.width,
      this.textureCanvas.height
    );

    // set background color to black
    // NB color info is reused as alpha mask (black = transparent)
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      0,
      this.textureCanvas.width,
      this.textureCanvas.height
    );

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    // set text color to white
    // NB color info is reused as alpha mask (white = opaque)
    this.ctx.fillStyle = "white";
    this.ctx.font = billboardFont;
    this.ctx.fillText(
      this.text,
      this.textureCanvas.width / 2,
      this.textureCanvas.height / 2
    );

    // measure effective text size in pixels
    const textSize = this.ctx.measureText(this.text);
    let billboardPixelWidth = textSize.width + billboardPixelWidthPadding;
    // pad short names so billboards become wide and not quadratic
    if (billboardPixelWidth < billboardPixelMinimumWidth) {
      billboardPixelWidth += 20;
    }

    // draw border onto billboard
    this.ctx.lineWidth = billboardLineWidth;
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(
      this.textureCanvas.width / 2 - billboardPixelWidth / 2,
      this.textureCanvas.height / 2 - billboardPixelHeight / 2,
      billboardPixelWidth,
      billboardPixelHeight
    );

    // use canvas contents as texture
    const texture = new THREE.Texture(this.textureCanvas);
    texture.needsUpdate = true;

    const billboardGeometry = new THREE.PlaneBufferGeometry(
      billboardGeometryWidth,
      billboardGeometryHeight
    );
    const billboardMaterial = new THREE.MeshBasicMaterial();
    billboardMaterial.transparent = true;
    billboardMaterial.map = texture;
    billboardMaterial.alphaMap = texture;

    const billboard = new THREE.Mesh(billboardGeometry, billboardMaterial);
    billboard.position.set(
      signPosition.x,
      signPosition.y,
      billboardElevation
    );
    billboard.up = new THREE.Vector3(0, 0, 1);

    billboard.lookAt(
      this.camera.position.x,
      this.camera.position.y,
      billboard.position.z
    );

    this.scene.add(billboard);

    ////// END UGLY BILLBOARD HACK

    const poleGeometry = new THREE.BoxBufferGeometry(
      billboardPoleWidth,
      billboardPoleWidth,
      billboardElevation
    );
    const poleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const pole = new THREE.Mesh(poleGeometry, poleMaterial);

    pole.position.set(
      signPosition.x,
      signPosition.y,
      billboardElevation / 2 -
        (billboardPixelHeight * textureScale) / 2 -
        (billboardLineWidth * textureScale) / 2
    );

    this.scene.add(pole);
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
