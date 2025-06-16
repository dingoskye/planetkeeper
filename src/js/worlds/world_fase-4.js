import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseFour extends World {
    constructor(progression) {
        super()
        this.progression = progression
        console.log(this.progression)
        this.graphics.use(Resources.WorldStage4.toSprite())
        this.progressionCounter = 0
        this.resourceCounter = 0

        this.minProgress = 400
        this.maxProgress = 810
        this.fase = 4
    }

    onPostUpdate(engine) {
        this.progressionCounter++
        this.resourceCounter++

        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.updateProgression(+10)
            // this.updateProgression(+10)
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.updateProgression(-10)
        }

        if (this.progressionCounter >= 3600) {
            this.updateProgression(-1)
            this.progressionCounter = 0
        }

        if (this.resourceCounter >= 3600) {
            this.updateResource(500)
            this.resourceCounter = 0
        }

        // if (this.progression >= 410) {
        //     engine.currentScene.worldUpdate("faseFive", this.progression)
        //     this.kill()
        // }

        if (this.progression <= this.minProgress) {
            engine.currentScene.worldUpdate("faseThree", this.progression)
            this.kill()
        }
    }
}