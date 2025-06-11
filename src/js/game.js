import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const world = new Actor()
        world.graphics.use(Resources.World.toSprite())
        world.pos = new Vector(500, 300)
        world.vel = new Vector(-10,0)
        world.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(world)

        const world2 = new Actor()
        world2.graphics.use(Resources.WorldStage2.toSprite())
        world2.pos = new Vector(400, 300)
        world2.vel = new Vector(-10,0)
        world2.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(world2)

        const world3 = new Actor()
        world3.graphics.use(Resources.WorldStage3.toSprite())
        world3.pos = new Vector(300, 300)
        world3.vel = new Vector(-10,0)
        world3.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(world3)

        const world4 = new Actor()
        world4.graphics.use(Resources.WorldStage4.toSprite())
        world4.pos = new Vector(200, 300)
        world4.vel = new Vector(-10,0)
        world4.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(world4)

        const world5 = new Actor()
        world5.graphics.use(Resources.WorldDead.toSprite())
        world5.pos = new Vector(600, 300)
        world5.vel = new Vector(-10,0)
        world5.events.on("exitviewport", (e) => this.fishLeft(e))
        this.add(world5)
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
