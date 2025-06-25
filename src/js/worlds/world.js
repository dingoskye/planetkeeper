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
    collectableCounter
    resources

    constructor(progression) {
        super({ anchor: new Vector(0.5, 0.5) })
        if (progression) {
            this.progression = progression
        } else {
            this.progression = 10
        }
        this.resources = 0
        this.activeDilemma = false
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(1, 1)
        this.progressionCounter = 0
        this.resourceCounter = 0
        this.collectableCounter = 0
        this.reputation = 50
        this.minProgress = 0
        this.maxProgress = 110
        this.fase = 1

    }

    onInitialize() {
        this.scene.ui.progressionBar.showProgress()
    }

    onPostUpdate(engine) {
        this.progressionCounter++
        this.resourceCounter++
        this.collectableCounter++

        if (engine.input.keyboard.wasPressed(Keys.R)) {
            this.updateProgression(10)
        }

        if (engine.input.keyboard.wasPressed(Keys.F)) {
            this.updateProgression(-10)
        }

        if (this.collectableCounter === 500) {
            this.scene.collectCollectable("flower")
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
                this.death()
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

        if (
            this.activeDilemma === false &&
            this.progression >= this.maxProgress &&
            this.reputation < 70
        ) {
            this.scene.ui.showReputationLowPopUp();
        }
    }

    death() {
        this.scene.reset = true
        this.scene.worldUpdate("dead", this.progression)
    }

    updateResource(number) {
        //Haald het nummer en het wiskundige teken uit elkaar
        const update = number < 0 ? "-" : "+"
        const number1 = Math.abs(number)

        this.resources += number

        this.scene.ui.resourceUI.showResources(update, number1)
        this.scene.ui.showPopUp("resource", update, number1)
    }

    updateProgression(progress) {
        this.progression += progress
        console.log(`your progress is${this.progression}`)
        this.scene.ui.progressionBar.showProgress()
    }

    updateReputation(number) {
        if (number !== 0) {
            //Haalt het nummer en het wiskundige teken uit elkaar
            const update = number < 0 ? "-" : "+"
            const number1 = Math.abs(number)

            if (update === "+") {
                this.reputation += number1
            } else if (update === "-") {
                this.reputation -= number1
            }

            //if (this.reputation > 70) this.reputation = 70
            // if (this.reputation <= 0) {
            //     this.reputation = 0
            //     console.log("Game Over - rep = 0")
            //     this.scene.gameOver(this.scene.engine)
            // }

            this.scene.ui.reputationBar.showReputation()
            this.scene.ui.showPopUp("reputation", update, number1)
            console.log("Reputatie is nu:", this.reputation)
        }
    }

    getWorldState() {
        return {
            resources: this.resources,
            reputation: this.reputation,
            progression: this.progression
        };
    }

    updateFaseName() {
        switch (this.fase) {
            case 1:
                this.scene.ui.worldFase.faseTwo();
                break;
            case 2:
                this.scene.ui.worldFase.faseThree();
                break;
            case 3:
                this.scene.ui.worldFase.faseFour();
                break;
            case 4:
                this.scene.ui.worldFase.faseFive();
                break;
        }
    }


    updateWorld() {
        //checkt welke fase de wereld nu is en welke hij moet worden stuurd hij mee
        switch (this.fase) {
            case 1:
                this.scene.worldUpdate("faseTwo", this.progression, this.reputation)
                break;
            case 2:
                this.scene.worldUpdate("faseThree", this.progression, this.reputation)
                break;
            case 3:
                this.scene.worldUpdate("faseFour", this.progression, this.reputation)
                break;
            case 4:
                this.scene.worldUpdate("faseFive", this.progression, this.reputation)
                break
            case 5:
                this.scene.worldUpdate("faseFive", this.progression, this.reputation)
        }
        //haalt deze wereld weg en reset de progressiebalk
        this.kill()
        this.scene.ui.progressionBar.resetBar()
        this.updateFaseName();
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