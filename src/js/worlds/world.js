import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'


export class World extends Actor {

    progressionCounter
    resourceCounter
    resource
    progression
    maxProgress
    fase

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

        this.minProgress = 0
        this.maxProgress = 110
        this.fase = 1
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
            this.resource += 10
            this.resourceCounter = 0
        }

        // if (this.progression >= this.maxProgress) {
        //     engine.currentScene.worldUpdate("faseTwo", this.progression)
        //     this.kill()
        // }

        if (this.progression <= this.minProgress) {
            this.scene.worldUpdate("dead", this.progression)
            this.kill()
        }
    }

    progressionUpdate(progress) {
        this.progression = this.progression + progress
        console.log(this.progression)
        this.scene.ui.progressionBar.showProgress()
    }

    updateWorld(fase) {
        switch (fase) {
            case 1:
                this.scene.worldUpdate("faseTwo", this.progression)
                break;
            case 2:
                this.scene.worldUpdate("faseThree", this.progression)
                break;
            case 3:
                this.scene.worldUpdate("faseFour", this.progression)
                break;
            case 4:
                this.scene.worldUpdate("faseFive", this.progression)
                break
            case 5:
                this.scene.worldUpdate("faseFive", this.progression)
        }

        this.kill()
        this.scene.ui.progressionBar.resetBar()
    }
}
