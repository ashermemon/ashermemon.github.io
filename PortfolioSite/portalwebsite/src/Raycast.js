import * as THREE from "three";

export function getFirstObjectWithName(event, camera, scene, name) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  for (let i = 0; i < intersects.length; i++) {
    const obj = intersects[i].object;
    if (obj.name && obj.name.includes(name)) {
      return obj;
    }
  }

  return null;
}
