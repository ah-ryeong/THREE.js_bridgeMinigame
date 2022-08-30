import { Stuff } from './Stuff';
import { Mesh } from 'three';
import { cm1, geo, mat } from './common';

export class Floor extends Stuff {
    constructor(info) {
        // 부모의 생성자를 호출
        super(info);

        this.geometry = geo.floor;
        this.material = mat.floor;

        // console.log(this.geometry.parameters.width);
        this.width = this.geometry.parameters.width;
        this.height = this.geometry.parameters.height;
        this.depth = this.geometry.parameters.depth;

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.receiveShadow = true;

        cm1.scene.add(this.mesh);

        this.setCannonBody();
    }
}