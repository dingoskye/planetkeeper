import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class Flower extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.CollectibleFlower.toSprite())
        this.pos = new Vector(250, 250)
        //  this.scale = new Vector(3, 3)
    }
}