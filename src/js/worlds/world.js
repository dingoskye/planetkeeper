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
    activeDilemma


    constructor(progression) {
        super({ anchor: new Vector(0.5, 0.5) })
        if (progression) {
            this.progression = progression
        } else {
            this.progression = 10
        }
        this.activeDilemma = false
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
            this.updateProgression(10)
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
            this.updateResource(10)
        }

        //animatie voor de upgrade en downgrade
        if (this.progression <= this.minProgress) {
            this.scale.x -= 0.025
            this.scale.y -= 0.025
            if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                this.scene.worldUpdate("dead", this.progression)
            }
        }
        if (this.activeDilemma === false)
            if (this.progression >= this.maxProgress) {
                this.scale.x -= 0.025
                this.scale.y -= 0.025
                if (this.scale.x < 0.75 && this.scale.y < 0.75) {
                    this.updateWorld(this.fase, this.progression)
                }
            }
    }

    updateResource(number) {
        //Haald het nummer en het wiskundige teken uit elkaar
        const update = number < 0 ? "-" : "+"
        const number1 = Math.abs(number)

        this.scene.ui.resourceUI.showResources(update, number1)
        this.scene.ui.showPopUp("resource", update, number1)
    }

    updateProgression(progress) {
        this.progression += progress
        console.log(this.progression)
        this.scene.ui.progressionBar.showProgress()
    }

    updateReputation(number) {
        //Haald het nummer en het wiskundige teken uit elkaar
        const update = number < 0 ? "-" : "+"
        const number1 = Math.abs(number)

        if (update === "+") {
            this.reputation += number1
        } else if (update === "-") {
            this.reputation -= number1
        }

        this.scene.ui.reputationBar.showReputation()
        this.scene.ui.showPopUp("reputation", update, number1)
        console.log(this.reputation)
    }

    updateWorld(fase) {
        //checkt welke fase de wereld nu is en welke hij moet worden stuurd hij mee
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

        //haald deze wereld weg en reset de progressiebalk
        this.kill()
        this.scene.ui.progressionBar.resetBar()
    }
    eventMarking(activeDilemma) {
        this.activeDilemma = activeDilemma
        console.log(this.activeDilemma, "new")
        this.eventMarker = new EventMarker()
        this.addChild(this.eventMarker)
    }
    eventKill(activeDilemma) {

        this.activeDilemma = activeDilemma
        console.log(this.activeDilemma, "kill")
        this.eventMarker.kill()
    }
    eventActive() {
        console.log("check")
    }
}