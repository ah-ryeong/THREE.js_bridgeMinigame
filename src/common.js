import { BoxGeometry, MeshPhongMaterial, Scene } from 'three';

export const cm1 = {
    canvas: document.querySelector('#three-canvas'),
    scene: new Scene()
};

export const cm2 = {
    backgroundColor: '#3e1322',
    lightColor: '#ffe9ac',
    pillarColor: '#071d28'
};

export const geo = {
    pillar: new BoxGeometry(5, 10, 5),
};

export const mat = {
    pillar: new MeshPhongMaterial({ color: cm2.pillarColor }),
};