import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseThree extends World {
    constructor(progression) {
        super()
        this.progression = progression
        this.progressionCounter = 0
        this.resourceCounter = 0
        console.log(this.progression)
        this.graphics.use(Resources.WorldStage3.toSprite())

        this.minProgress = 200
        this.maxProgress = 410
        this.fase = 3
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
            this.updateResource(250)
            this.resourceCounter = 0
        }

        // if (this.progression >= 310) {
        //     engine.currentScene.worldUpdate("faseFour", this.progression)
        //     this.kill()
        // }

        if (this.progression <= this.minProgress) {
            engine.currentScene.worldUpdate("faseOne", this.progression)
            this.kill()
        }
    }
}
