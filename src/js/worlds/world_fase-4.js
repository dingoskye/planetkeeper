import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseFour extends World {
    constructor() {
        super()
        this.graphics.use(Resources.WorldStage4.toSprite())
    }

    onPostUpdate(engine){
        this.progressionCounter ++
        if (this.progressionCounter >= 3600) {
            this.progression --;
            this.progressionCounter = 0
        }


    }
}
