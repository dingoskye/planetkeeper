import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Bg extends Actor {
    constructor() {
        super({
            x: 650, y: 290,
            width: 1280, height: 720
        })

        this.graphics.use(Resources.Scenebg.toSprite())
        this.scale = new Vector(1.3, 1.3)
    }
}