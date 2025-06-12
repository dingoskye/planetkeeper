import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class World extends Actor {

    progressionCounter 
    resourceCounter
    resource
    progression

    constructor() {
        super()
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(1,1)
        this.progressionCounter = 0
        this.resourceCounter = 0
    }

    onPostUpdate(engine){
        this.progressionCounter ++
        this.resourceCounter ++
        if (this.progressionCounter >= 3600) {
            this.progression --
            this.progressionCounter = 0
        }
        if (this.resourceCounter >= 3600 ) {
            this.resource += 10
            this.resourceCounter = 0
        }
        
    }
}
