import { Stuff } from './Stuff';
import { Mesh } from 'three';
import { cm1, geo, mat, sounds } from './common';

export class Glass extends Stuff {
    constructor(info) {
        // 부모의 생성자를 호출
        super(info);

        this.type = info.type;
        // console.log(this.type);
        this.step = info.step;

        this.geometry = geo.glass;
        switch(this.type) {
            case 'normal':
                this.material = mat.glass1;
                this.mass = 1;
                break;
            case 'strong':
                this.material = mat.glass2;
                this.mass = 0;
                break;
        }

        this.width = this.geometry.parameters.width;
        this.height = this.geometry.parameters.height;
        this.depth = this.geometry.parameters.depth;

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.name = this.name;
        this.mesh.step = this.step;
        this.mesh.type = this.type;

        cm1.scene.add(this.mesh);

        this.setCannonBody();
        
        this.cannonBody.addEventListener('collide', playSound);

        const sound = sounds[this.type];
        
        function playSound(e) {
            const strength = e.contact.getImpactVelocityAlongNormal();
            console.log('타나?');
            if(strength > 5) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }
}