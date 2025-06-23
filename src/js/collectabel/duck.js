import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Flower } from './flower.js'

export class Duck extends Flower {
    constructor(x, y, scale) {
        super()
        this.graphics.use(Resources.CollectableDuckShadow.toSprite())
        this.pos = new Vector(x, y)
        this.scale = new Vector(scale, scale)
    }
}