import { Stuff } from './Stuff';
import { Mesh } from 'three';
import { cm1, geo, mat } from './common';

export class Glass extends Stuff {
    constructor(info) {
        // 부모의 생성자를 호출
        super(info);

        this.geometry = geo.glass;
        this.material = mat.glass;

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        cm1.scene.add(this.mesh);
    }
}