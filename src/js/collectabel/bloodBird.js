import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Flower } from './flower.js'

export class BloodBird extends Flower {
    constructor() {
        super()
        this.graphics.use(Resources.CollectableBloodBird.toSprite())
        //this.pos = new Vector(250, 250)
        //  this.scale = new Vector(3, 3)
    }
}