import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldFaseFive extends World {
    constructor(progression, reputation) {
        super()
        this.progression = progression
        this.reputation = reputation
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

        if (this.reputation >= 100 || this.reputation <= 0) {
            this.collectableCounter++
        }
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.updateProgression(+10)
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.updateProgression(-10)
        }

        if (this.collectableCounter === 500 && this.reputation >= 100) {
            this.scene.collectCollectable("rainbowbird")
            console.log(this.collectableCounter, "regenboog")
        }

        if (this.collectableCounter === 500 && this.reputation <= 0) {
            this.scene.collectCollectable("bloodbird")
            console.log(this.collectableCounter)
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
                this.scene.worldUpdate("faseFour", this.progression, this.reputation)
                this.scene.ui.worldFase.faseFour()
            }
        }
    }
}
