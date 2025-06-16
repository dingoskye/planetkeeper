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
            this.updateResource(100)
            this.resourceCounter = 0
        }

        // if (this.progression >= 210) {
        //     engine.currentScene.worldUpdate("faseThree", this.progression)
        //     this.kill()
        // }

        if (this.progression <= this.minProgress) {
            engine.currentScene.worldUpdate("faseOne", this.progression)
            this.kill()
        }
    }
}
