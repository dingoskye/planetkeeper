import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseFive extends World {
    constructor(progression) {
        super()
        this.progression = progression
        console.log(this.progression)
        this.graphics.use(Resources.WorldStage5.toSprite())
        this.progressionCounter = 0
        this.resourceCounter = 0

        this.minProgress = 800
        this.maxProgress = 1610
        this.fase = 5
    }

    onPostUpdate(engine) {
        this.progressionCounter++
        this.resourceCounter++

        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.progressionUpdate(+10)
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.progressionUpdate(-10)
        }

        if (this.progressionCounter >= 3600) {
            this.progressionUpdate(-1)
            this.progressionCounter = 0
        }

        if (this.resourceCounter >= 3600) {
            this.updateResource(1000)
            this.resourceCounter = 0
        }

        // if (this.progression >= 1000) {
        //     engine.currentScene.worldUpdate("faseThree", this.progression)
        //     this.kill()
        // }

        if (this.progression <= this.minProgress) {
            engine.currentScene.worldUpdate("faseFour", this.progression)
            this.kill()
        }
    }
}
