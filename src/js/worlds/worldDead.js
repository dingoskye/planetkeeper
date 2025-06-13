import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { World } from './world.js'

export class WorldDead extends World {
    constructor() {
        super()
        console.log("dead")
        this.graphics.use(Resources.WorldDead.toSprite())
    }
}
