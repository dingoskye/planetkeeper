import { Actor, Vector, Color } from "excalibur"

export class BackgroundUi extends Actor {

    constructor(x, y, h) {
        super({
            x: x, y: y,
            color: Color.fromRGB(136, 129, 70, 1),
            width: 1280, height: h, anchor: Vector.Zero
        })
    }
}