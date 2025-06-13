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
        })
        this.graphics.use(Resources.Pointer.toSprite())
    }

    onPreUpdate(engine) {
        const gamepad = engine.mygamepad

        if (gamepad) {
            // const threshold = 0.2;
            // const stickX = Math.abs(gamepad.getAxes(0)) > threshold ? gamepad.getAxes(0) : 0;
            // const stickY = Math.abs(gamepad.getAxes(1)) > threshold ? gamepad.getAxes(1) : 0;
            const x = engine.mygamepad.getAxes(Axes.LeftStickX)
            const y = engine.mygamepad.getAxes(Axes.LeftStickY)

            const speed = 55;
            this.pos.x += x * speed;
            this.pos.y += y * speed;

            // this.pointer.pos.x = Math.max(0, Math.min(engine.drawWidth, this.pointer.pos.x));
            // this.pointer.pos.y = Math.max(0, Math.min(engine.drawHeight, this.pointer.pos.y));

            // const pointerBounds = this.pointer.body.collider?.bounds;
            // const buttonBounds = this.startButton.body.collider?.bounds;

            //mix tussen mij en chat
            // if (pointerBounds && buttonBounds && pointerBounds.intersect(buttonBounds)) {
            // this.buttonFocused = true;
            this.scene.updateButtonVisual();

            if (gamepad.isButtonPressed(Buttons.Face1)) {
                engine.goToScene("game");
            }
        } else {
            this.buttonFocused = false;
            this.scene.updateButtonVisual();
        }
    }
}