import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class WorldFaseOne extends Actor {

    developedCounter 
    Resources
    developed

    constructor() {
        super()
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(5, 5)
        this.developedCounter = 0
    }

    onPostUpdate(engine){
        this.developedCounter ++
        if (this.developedCounter >= 3600) {
            this.developed --;
            this.developedCounter = 0
        }

        
    }
}
