import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'


export class World extends Actor {

    progressionCounter
    resourceCounter
    resource
    progression

    constructor(progression) {
        super()
        if (progression) {
            this.progression = progression
        } else {
            this.progression = 10
        }
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(1, 1)
        this.progressionCounter = 0
        this.resourceCounter = 0

    }

    onPostUpdate(engine) {
        this.progressionCounter++
        this.resourceCounter++

        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.progression += + 10;
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
        if (this.progression >= 110) {
            engine.currentScene.worldUpdate("faseTwo", this.progression)
            this.kill()

        }
        if (this.progression <= 0) {
            engine.currentScene.worldUpdate("dead", this.progression)
            this.kill()
        }
    }
    progressionUpdate(progress) {
        this.progression = + progress
    }
}
