import { cm1, cm2 } from './common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pillar } from './Pillar';
import { Floor } from './Floor';

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: cm1.canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene은 common.js에서 생성끝! 
cm1.scene.background = new THREE.Color(cm2.backgroundColor);

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.x = -4;
camera.position.y = 19;
camera.position.z = 14;
cm1.scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight(cm2.lightColor, 0.8);
cm1.scene.add(ambientLight);

const spotlightDistance = 50;

const spotLight1 = new THREE.SpotLight(cm2.lightColor, 1);
spotLight1.castShadow = true;
const spotLight2 = spotLight1.clone();
const spotLight3 = spotLight1.clone();
const spotLight4 = spotLight1.clone();

spotLight1.position.set(-spotlightDistance, spotlightDistance, spotlightDistance);
spotLight2.position.set(spotlightDistance, spotlightDistance, spotlightDistance);
spotLight3.position.set(-spotlightDistance, spotlightDistance, -spotlightDistance);
spotLight4.position.set(spotlightDistance, spotlightDistance, -spotlightDistance);

cm1.scene.add(spotLight1, spotLight2, spotLight3, spotLight4);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 물체
const glassUnitSize = 1.2;

// Stage
const floor = new Floor({
	name: 'floor',
});

//  기둥 Pillar
const pillar1 = new Pillar({
	name: 'pillar',
	x: 0,
	y: 5.5,
	z: -glassUnitSize * 12 - glassUnitSize / 2
});

const pillar2 = new Pillar({
	name: 'pillar',
	x: 0,
	y: 5.5,
	z: glassUnitSize * 12 + glassUnitSize / 2
});

// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	controls.update();

	renderer.render(cm1.scene, camera);
	renderer.setAnimationLoop(draw);
}

function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(cm1.scene, camera);
}

// 이벤트
window.addEventListener('resize', setSize);

draw();
