import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class WorldFaseOne extends Actor {

    progressionCounter 
    resource
    progression

    constructor() {
        super()
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(1,1)
        this.progressionCounter = 0
    }

    onPostUpdate(engine){
        this.progressionCounter ++
        if (this.progressionCounter >= 3600) {
            this.progression --;
            this.progressionCounter = 0
        }


    }
}
