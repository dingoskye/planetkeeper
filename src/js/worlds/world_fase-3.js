import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseThree extends World {
    constructor() {
        super()
        this.graphics.use(Resources.WorldStage3.toSprite())
    }

    onPostUpdate(engine){
        this.progressionCounter ++
        if (this.progressionCounter >= 3600) {
            this.progression --;
            this.progressionCounter = 0
        }


    }
}
