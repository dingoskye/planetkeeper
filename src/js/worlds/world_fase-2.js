import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'


export class WorldFaseTwo extends World {
    constructor(progress) {
        super()
        this.progression = progress
        console.log(this.progression)
        this.graphics.use(Resources.WorldStage2.toSprite())
        this.progressionCounter = 0
        this.resourceCounter = 0

        this.minProgress = 100
        this.maxProgress = 210
        this.fase = 2
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
                this.scene.worldUpdate("faseOne", this.progression)
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
