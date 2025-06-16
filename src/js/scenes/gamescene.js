import { Actor, Scene, Vector, Buttons } from "excalibur"
import { Resources } from '../resources.js'
import { UI } from '../ui/ui.js'
import { Bg } from '../background.js'
import { World } from '../worlds/world.js'
import { WorldFaseTwo } from '../worlds/world_fase-2.js'
import { WorldFaseThree } from '../worlds/world_fase-3.js'
import { WorldFaseFour } from '../worlds/world_fase-4.js'
import { WorldFaseFive } from '../worlds/world_fase-5.js'
import { WorldDead } from '../worlds/worldDead.js'
import { DilemmaEvent } from "../dilemmaEvent.js"

export class GameScene extends Scene {

    onInitialize(engine) {

        const background = new Bg()
        this.add(background)

        this.worldActor = new World();
        console.log("Adding world:", this.worldActor);
        this.add(this.worldActor)


        this.ui = new UI()
        this.add(this.ui)

        const dilemma = new DilemmaEvent();
        this.add(dilemma)


    }

    onPostUpdate(engine) {
        if (engine.mygamepad) {
            const xButton = engine.mygamepad.isButtonPressed(Buttons.Face3);
            if (xButton) {
                console.log("X-knop ingedrukt");
                this.gameOver(engine);
            }
        }
    }

    gameOver(engine) {
        console.log("Overschakelen naar gameover");
        engine.goToScene("gameover");
    }

    worldUpdate(newWorld, progression) {
        console.log("Adding world:", this.world);
        if (this.worldActor) {
            this.worldActor.kill()
        }
        if (newWorld === "dead") {
            this.worldActor = new WorldDead(progression)
            this.add(this.worldActor)
        }
        else if (newWorld === "faseTwo") {
            this.worldActor = new WorldFaseTwo(progression)
            this.add(this.worldActor)
        }
        else if (newWorld === "faseThree") {
            this.worldActor = new WorldFaseThree(progression)
            this.add(this.worldActor)
        }
        else if (newWorld === "faseFour") {
            this.worldActor = new WorldFaseFour(progression)
            this.add(this.worldActor)
        }
        else if (newWorld === "faseFive") {
            this.worldActor = new WorldFaseFive(progression)
            this.add(this.worldActor)
        }
        else if (newWorld === "faseOne") {
            this.worldActor = new World(progression)
            this.add(this.worldActor)
        }
    }
}
