import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons, CollisionType, Axes } from "excalibur"
import { Resources } from "./resources.js"

export class Pointer extends Actor {
    mygamepad
    pointer
    startButton
    buttonFocused = false

    constructor() {
        super({
            pos: new Vector(650, 550),
            scale: new Vector(0.2, 0.2),
            anchor: Vector.Half,
            z: 5,
            collisionType: CollisionType.ActiveCollision,
        })
        this.graphics.use(Resources.Pointer.toSprite())
    }

    onPreUpdate(engine) {
        const gamepad = engine.mygamepad;

        if (gamepad) {
            const x = gamepad.getAxes(Axes.LeftStickX);
            const y = gamepad.getAxes(Axes.LeftStickY);

            const speed = 30;
            this.pos.x += x * speed;
            this.pos.y += y * speed;

            if (this.pos.x < 0) {
                this.pos.x = 0;
            }
            if (this.pos.y < 0) {
                this.pos.y = 0;
            }
            if (this.pos.x > 1280) {
                this.pos.x = 1280;
            }
            if (this.pos.y > 720) {
                this.pos.y = 720;
            }
        }
    }
}