import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseFour extends World {
    constructor(progression, reputation) {
        super()
        this.progression = progression
        this.reputation = reputation
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
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.updateProgression(-10)
        }

        if (this.progressionCounter >= 3600) {
            this.updateProgression(-1)
            this.progressionCounter = 0
        }

        if (this.resourceCounter >= 3600) {
            this.updateResource(+45)
            this.resourceCounter = 0
        }

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.updateReputation(+10)
        }
        if (engine.input.keyboard.wasPressed(Keys.B)) {
            this.updateResource(+10)
        }
        //animatie voor de upgrade en downgrade
        if (this.progression <= this.minProgress) {
            this.scale.x -= 0.025
            this.scale.y -= 0.025
            if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                this.scene.worldUpdate("faseThree", this.progression, this.reputation)
                this.scene.ui.worldFase.faseThree()
            }
        }

        if (this.activeDilemma === false)
            if (this.progression >= this.maxProgress && this.reputation >= 70) {
                this.scale.x -= 0.025
                this.scale.y -= 0.025
                if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                    this.updateWorld()
                }
            }
    }
}