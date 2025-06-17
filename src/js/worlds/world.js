import { Actor, Vector, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { EventMarker } from "../eventMarker.js"

export class World extends Actor {

    progressionCounter
    resourceCounter
    resource
    progression
    reputation
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

        this.reputation = 50
        this.minProgress = 0
        this.maxProgress = 110
        this.fase = 1

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
            this.updateResource("+", 10)
            this.resourceCounter = 0
        }

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.updateReputation("-", 10)
        }

        if (engine.input.keyboard.wasPressed(Keys.B)) {
            this.updateResource("+", 10)
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

    updateResource(update, number) {
        //this.resource = this.resource + number
        this.scene.ui.resourceUI.showResources(update, number)
        //console.log(this.resource + " Dit zijn mijn resources")
        this.scene.ui.showPopUp("resource", update, number)
    }

    updateProgression(progress) {
        this.progression = this.progression + progress
        console.log(this.progression)
        this.scene.ui.progressionBar.showProgress()
    }

    updateReputation(update, number) {
        if (update === "+") {
            this.reputation = this.reputation + number
        } else if (update === "-") {
            this.reputation = this.reputation - number
        }

        this.scene.ui.reputationBar.showReputation()
        this.scene.ui.showPopUp("reputation", update, number)
        console.log(this.reputation)
    }

    // updateProgression(number) {
    //     this.progression += number
    //     //progress blijft tussen 0 en 100
    //     if (this.progression > this.maxValue) {
    //         this.progression = this.maxValue;
    //         console.log("Whoohoo")
    //     } else if (this.progression < 0) {
    //         this.progression = 0
    //     }
    //     console.log(`Your progress is: ${this.progression}`)

    //     //updateResources()
    //     this.scene.ui.progressionBar.showProgress()
    // }

    // //progress laten zien
    // showProgression() {
    //     console.log(`Your progress is: ${progression}`)
    // }

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
    eventMarking() {
        if (this.eventMarker) {
            this.eventMarker.kill()
        }
        this.eventMarker = new EventMarker()
        this.addChild(this.eventMarker)

    }

}
