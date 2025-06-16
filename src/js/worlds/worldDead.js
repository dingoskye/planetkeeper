import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldDead extends World {
    constructor(progression) {
        super()
        this.progression = progression
        console.log(this.progression)
        console.log("dead")
        this.graphics.use(Resources.WorldDead.toSprite())
    }
    onPostUpdate(engine) {
        // if (engine.input.keyboard.wasPressed(Keys.R)) {
        //     this.progression += + 10;
        //     console.log(this.progression)
        // }
        // if (engine.input.keyboard.wasPressed(Keys.F)) {
        //     this.progression -= 10;
        //     console.log(this.progression)
        // }
    }
}
