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

export class GameScene extends Scene {

    onInitialize(engine) {
        const background = new Bg()
        this.add(background)

        const world = new World()
        this.add(world)

        this.ui = new UI()
        this.add(this.ui)
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
}
