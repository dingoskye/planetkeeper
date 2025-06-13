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
    }

    onPostUpdate(engine) {
        this.progressionCounter++
        this.resourceCounter++

        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.progression += 10;
            console.log(this.progression)
        }
        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.progression -= 10;
            console.log(this.progression)
        }

        if (this.progressionCounter >= 3600) {
            this.progression--
            this.progressionCounter = 0
        }

        if (this.resourceCounter >= 3600) {
            this.resource += 10
            this.resourceCounter = 0
        }
        if (this.progression >= 210) {
            engine.currentScene.worldUpdate("faseThree", this.progression)
            this.kill()

        }
        if (this.progression <= 100) {
            engine.currentScene.worldUpdate("faseOne", this.progression)
            this.kill()
        }


    }
}
