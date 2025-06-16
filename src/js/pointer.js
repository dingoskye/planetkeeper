import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons, CollisionType, Axes } from "excalibur"
import { Resources } from "./resources.js"

export class Pointer extends Actor {
    mygamepad
    pointer
    startButton
    buttonFocused = false

    constructor() {
        super({
            pos: new Vector(640, 400),
            scale: new Vector(0.3, 0.3),
            anchor: Vector.Half,
            z: 5,
            collisionType: CollisionType.PreventCollision,
        })
        this.graphics.use(Resources.Pointer.toSprite())
    }

    onPreUpdate(engine) {
        const gamepad = engine.mygamepad;

        if (gamepad) {
            const x = gamepad.getAxes(Axes.LeftStickX);
            const y = gamepad.getAxes(Axes.LeftStickY);

            const speed = 55;
            this.pos.x += x * speed;
            this.pos.y += y * speed;
        }
    }
}