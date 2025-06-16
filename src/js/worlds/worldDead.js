import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldDead extends World {

    deadCounter

    constructor(progression) {
        super()
        this.progression = progression
        console.log(this.progression)
        console.log("dead")
        this.graphics.use(Resources.WorldDead.toSprite())
        this.deadCounter = 0
    }
    onPostUpdate(engine) {
        this.deadCounter++
        if (this.deadCounter >= 500) {
            console.log("Ha im dead")
            this.scene.gameOver(engine)
            this.deadCounter = 0
        }
    }
}
