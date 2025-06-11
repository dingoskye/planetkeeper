import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class WorldFaseOne extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.World.toSprite())
        this.pos = new Vector(640, 350)
        this.scale = new Vector(5, 5)
    }
}
