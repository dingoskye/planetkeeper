import { Actor, Vector, randomInRange } from "excalibur"
import { Resources } from './resources.js'

export class EventMarker extends Actor {
    constructor() {
        super()
        const y = randomInRange(-100, 100)
        const x = randomInRange(-100, 100)
        this.graphics.use(Resources.PinPointer.toSprite())
        this.pos = new Vector(x, y)
    }
}