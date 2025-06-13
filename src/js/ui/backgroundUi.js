import { Actor, Vector, Color } from "excalibur"

export class BackgroundUi extends Actor {

    constructor(x, y, h) {
        super({
            x: x, y: y,
            color: Color.fromRGB(197, 179, 88, 0.7),
            width: 1280, height: h, anchor: Vector.Zero
        })
    }
}