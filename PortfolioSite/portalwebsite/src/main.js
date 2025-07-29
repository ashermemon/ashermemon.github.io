import "./style.css";
import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import { getFirstObjectWithName } from "./Raycast.js";

const scene = new THREE.Scene();
const loader = new GLTFLoader();

let target;
let target2;
let target3;
let target4;
let lookOn = true;

const clock = new THREE.Clock();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 6.2, 5);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const screenWidth = 2.5;
const screenHeight = 1.5;
let iframeVisible = false;

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.pointerEvents = "none";
cssRenderer.domElement.style.position = "absolute";
cssRenderer.domElement.style.top = "0";
cssRenderer.domElement.style.left = "0";
document.body.appendChild(cssRenderer.domElement);

const background3 = document.createElement("div");
background3.style.width = "1435px";
background3.style.height = "1200px";
background3.style.border = "none";
background3.className = "filter";

const iframe = document.createElement("iframe");
iframe.src = "/HTMLSITE/HOME.html";
iframe.style.width = "1435px";
iframe.style.height = "1200px";
iframe.style.border = "none";
iframe.className = "oldMonitor";

const bulbIntensityMax = 150;
let waitTime = 5000;

let Disk1;
let Disk2;
let Disk3;
let Disk4;

const lightBulb = new THREE.PointLight(0xfff3db, bulbIntensityMax);
lightBulb.position.set(0, 12, 0);
/*
class InputController {
  constructor() {
    this.initialize_(); 
  }
  initialize_(){
    this.current = {
      leftButton: false,
      rightButton: false,
      mouseX: 0,
      mouseY: 0,


    };
    this.previous_ = null;
    this.keys_ = {};
    this.previousKeys_ = {};

    document.addEventListener('mousedown', (e) => this.onMouseDown_(e), false);
    document.addEventListener('mouseup', (e) => this.onMouseUp_(e), false);
    document.addEventListener('mousemove', (e) => this.onMouseMove_(e), false);

  }
  onMouseDown_(e){

  }
  onMouseUp_(e){
    
  }
  onMouseMove_(e){
    
  }


}
*/

setTimeout(() => {
  bulbFlicker(lightBulb);
}, waitTime);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const rectLight = new THREE.RectAreaLight(0x98d1f5, 30, 1.7, 1.5);

const xPos = -0.24;
const yPos = 6.15;
const zPos = 0.7;
rectLight.position.set(xPos, yPos, zPos);
rectLight.lookAt(xPos, yPos, zPos + 1);

scene.add(lightBulb, ambientLight, rectLight);

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 0;
controls.lookSpeed = 0.01;
controls.lookVertical = true;
controls.heightSpeed = 0;

/*
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

Array(200).fill().forEach(addStar);*/

const spaceTexture = new THREE.TextureLoader().load("../spacebg.jpg");
scene.background = spaceTexture;

function bulbFlicker(bulb) {
  if (bulb.intensity == 0) {
    bulb.intensity = bulbIntensityMax;
    waitTime = Math.random() * 20000;
    setTimeout(() => {
      bulbFlicker(bulb);
    }, waitTime);
  } else {
    bulb.intensity = 0;
    waitTime = Math.random() * 800;
    setTimeout(() => {
      bulbFlicker(bulb);
    }, waitTime);
  }
}

function loadModel(modelname) {
  loader.load(`/PortfolioSite/portalwebsite/public/3DModels/${modelname}.glb`, function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        switch (child.name) {
          case "CD1":
            target = child;
            target.visible = true;
            break;
          case "CD2":
            target2 = child;
            target2.visible = true;
            break;
          case "CD3":
            target3 = child;
            target3.visible = false;
            break;
          case "CD4":
            target4 = child;
            target4.visible = true;
            break;
        }
      }
    });
  });
}
const iframeObject = new CSS3DObject(iframe);
iframeObject.scale.set(-0.00128, 0.00128, 1);
iframeObject.name = "iframeObject";

const backgroundObject = new CSS3DObject(background3);
backgroundObject.scale.set(0.00128, 0.00128, 1);
/*
rectLight.updateWorldMatrix(true, false);
iframeObject.position.setX(rectLight.position.x);
iframeObject.position.setY(rectLight.position.y);
iframeObject.position.setZ(rectLight.position.z);*/

loadModel("Chair");
loadModel("ComputerAndWires");
loadModel("KeyBoard");
loadModel("MonitorNew3");
loadModel("Mouse");
loadModel("Table");
loadModel("Disc");
loadModel("Room");

document.addEventListener("click", (event) => {
  const adsuifh = getFirstObjectWithName(event, camera, scene, "CASE1");

  if (adsuifh) {
    console.log("click:", adsuifh.name);

    if (target.visible == true) {
      target.visible = false;
      iframe.src = "/HTMLSITE/LIKES.html";
      if (target2.visible == false) {
        target2.visible = true;
      }
      if (target3.visible == false) {
        target3.visible = true;
      }
      if (target4.visible == false) {
        target4.visible = true;
      }
    }
  }

  const disk2 = getFirstObjectWithName(event, camera, scene, "CASE2");

  if (disk2) {
    console.log("click:", disk2.name);

    if (target2.visible == true) {
      target2.visible = false;
      iframe.src = "/HTMLSITE/Skills.html";
      if (target.visible == false) {
        target.visible = true;
      }
      if (target3.visible == false) {
        target3.visible = true;
      }
      if (target4.visible == false) {
        target4.visible = true;
      }
    }
  }

  const disk3 = getFirstObjectWithName(event, camera, scene, "CASE3");

  if (disk3) {
    console.log("click:", disk3.name);

    if (target3.visible == true) {
      target3.visible = false;
      iframe.src = "/HTMLSITE/HOME.html";
      if (target2.visible == false) {
        target2.visible = true;
      }
      if (target.visible == false) {
        target.visible = true;
      }
      if (target4.visible == false) {
        target4.visible = true;
      }
    }
  }
  const disk4 = getFirstObjectWithName(event, camera, scene, "CASE4");

  if (disk4) {
    console.log("click:", disk4.name);

    if (target4.visible == true) {
      target4.visible = false;
      iframe.src = "/HTMLSITE/PROJECTS.html";
      if (target2.visible == false) {
        target2.visible = true;
      }
      if (target3.visible == false) {
        target3.visible = true;
      }
      if (target.visible == false) {
        target.visible = true;
      }
    }
  }
  const power = getFirstObjectWithName(event, camera, scene, "ComputerClick");

  if (power && lookOn) {
    controls.lookSpeed = 0.001;
    console.log("click:", power.name);
    lookOn = false;
  } else if (power && !lookOn) {
    controls.lookSpeed = 0.01;
    console.log("click:", power.name);
    lookOn = true;
  }
});

function syncIframe() {
  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();

  rectLight.updateWorldMatrix(true, false);
  rectLight.getWorldPosition(pos);
  rectLight.getWorldQuaternion(quat);

  iframeObject.position.copy(pos);
  iframeObject.quaternion.copy(quat);

  const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
  iframeObject.position.add(forward.multiplyScalar(-0.001));

  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quat);
  iframeObject.position.add(right.multiplyScalar(-0.164));

  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(quat);
  iframeObject.position.add(up.multiplyScalar(-0.028));

  rectLight.updateWorldMatrix(true, false);
  rectLight.getWorldPosition(pos);
  rectLight.getWorldQuaternion(quat);

  backgroundObject.position.copy(pos);
  backgroundObject.quaternion.copy(quat);

  const forward2 = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
  backgroundObject.position.add(forward2.multiplyScalar(-0.001));

  const right2 = new THREE.Vector3(1, 0, 0).applyQuaternion(quat);
  backgroundObject.position.add(right2.multiplyScalar(-0.164));

  const up2 = new THREE.Vector3(0, 1, 0).applyQuaternion(quat);
  backgroundObject.position.add(up2.multiplyScalar(-0.028));

  const maxVisibleDistance = 5.8;

  const monitorPosition = new THREE.Vector3();
  rectLight.getWorldPosition(monitorPosition);

  const distance = camera.position.distanceTo(monitorPosition);

  const screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
    iframeObject.quaternion
  );
  const camToScreen = new THREE.Vector3()
    .subVectors(iframeObject.position, camera.position)
    .normalize();

  const dot = screenNormal.dot(camToScreen);

  // Threshold: closer to 1 means must face directly
  const isFacingCamera = dot > 0.5;

  if (distance <= maxVisibleDistance && !iframeVisible && isFacingCamera) {
    scene.add(backgroundObject);
    scene.add(iframeObject);

    iframeVisible = true;
  } else if (
    (distance > maxVisibleDistance && iframeVisible) ||
    (!isFacingCamera && iframeVisible)
  ) {
    scene.remove(backgroundObject);
    scene.remove(iframeObject);

    iframeVisible = false;
  }
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  controls.update(delta);
  //controls.enableZoom = false;
  renderer.render(scene, camera);
  if (rectLight && iframeObject && backgroundObject) {
    syncIframe();
  }

  cssRenderer.render(scene, camera);
}

animate();
