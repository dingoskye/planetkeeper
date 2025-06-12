import { Actor, Scene, Vector, Buttons } from "excalibur"
import { Resources } from '../resources.js'
import { UI } from '../ui/ui.js'
import { Bg } from '../background.js'
import { World } from '../worlds/world.js'

export class GameScene extends Scene {

    onInitialize(engine) {
        const background = new Bg()
        this.add(background)

        this.ui = new UI()
        this.add(this.ui)

        const world = new World()
        this.add(world)
        // const world = new Actor()
        // world.graphics.use(Resources.World.toSprite())
        // world.pos = new Vector(500, 300)
        // world.vel = new Vector(-10, 0)
        // world.on("exitviewport", (e) => this.fishLeft(e))
        // this.add(world)

        // const world2 = new Actor()
        // world2.graphics.use(Resources.WorldStage2.toSprite())
        // world2.pos = new Vector(400, 300)
        // world2.vel = new Vector(-10, 0)
        // world2.on("exitviewport", (e) => this.fishLeft(e))
        // this.add(world2)

        // const world3 = new Actor()
        // world3.graphics.use(Resources.WorldStage3.toSprite())
        // world3.pos = new Vector(300, 300)
        // world3.vel = new Vector(-10, 0)
        // world3.on("exitviewport", (e) => this.fishLeft(e))
        // this.add(world3)

        // const world4 = new Actor()
        // world4.graphics.use(Resources.WorldStage4.toSprite())
        // world4.pos = new Vector(200, 300)
        // world4.vel = new Vector(-10, 0)
        // world4.on("exitviewport", (e) => this.fishLeft(e))
        // this.add(world4)

        // const world5 = new Actor()
        // world5.graphics.use(Resources.WorldDead.toSprite())
        // world5.pos = new Vector(600, 300)
        // world5.vel = new Vector(-10, 0)
        // world5.on("exitviewport", (e) => this.fishLeft(e))
        // this.add(world5)
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
