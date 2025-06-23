import { Vector, Actor, CollisionType } from "excalibur"
import { Resources } from "./resources.js"

export class Backpack extends Actor {
    constructor() {
        super({
            width: Resources.Backpack.width * 0.5,
            height: Resources.Backpack.height * 0.5,
            pos: new Vector(50, 130),
            collisionType: CollisionType.Fixed,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Backpack.toSprite());
        this.scale = new Vector(0.25, 0.25);
    }
}