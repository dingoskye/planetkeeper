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
            this.updateProgression(+10)
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.updateProgression(-10)
        }

        if (this.progressionCounter >= 3600) {
            this.updateProgression(-1)
            this.progressionCounter = 0
        }

        if (this.resourceCounter >= 3600) {
            this.updateResource(+10)
            this.resourceCounter = 0
        }

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.updateReputation(-10)
        }

        if (engine.input.keyboard.wasPressed(Keys.B)) {
            this.updateResource(+10)
        }

        if (this.progression <= this.minProgress) {
            this.scale.x -= 0.025
            this.scale.y -= 0.025
            if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                this.scene.worldUpdate("faseFour", this.progression)
                this.kill()
            }
        }


        if (this.progression >= this.maxProgress) {
            this.scale.x -= 0.025
            this.scale.y -= 0.025
            if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                this.updateWorld(this.fase, this.progression)
            }
        }
    }
}
