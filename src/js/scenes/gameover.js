import { Scene, Label, FontUnit, Vector, Keys, Color, Buttons } from "excalibur";
import { Bg } from "../background.js";
import { Resources } from '../resources.js';
import { Pointer } from "../pointer.js";
import { StartButton } from "../startButton.js";

export class GameOver extends Scene {
    pointer;
    startButton;
    sceneStart = false;
    wasHovering = false;

    onInitialize(engine) {
        console.log("gameover scherm");

        const bg = new Bg();
        this.add(bg);
        bg.graphics.use(Resources.Endbg.toSprite());

        const title = new Label({
            text: "Game Over",
            font: Resources.MainText.toFont({
                size: 70,
                unit: FontUnit.Px,
                color: Color.Gray,
                textAlign: 'center'
            }),
            pos: new Vector(640, 230),
            anchor: Vector.Half
        });

        const message = new Label({
            text: "Je planeet is dood",
            font: Resources.MainText.toFont({
                size: 35,
                unit: FontUnit.Px,
                color: Color.Gray,
                textAlign: 'center'
            }),
            pos: new Vector(640, 315),
            anchor: Vector.Half
        });

        const instruction = new Label({
            text: "Druk op 'A' of 'X' om terug te gaan",
            font: Resources.SubText.toFont({
                size: 25,
                unit: FontUnit.Px,
                color: Color.Gray,
                textAlign: 'center'
            }),
            pos: new Vector(640, 680),
            anchor: Vector.Half
        });

        this.pointer = new Pointer();
        this.add(this.pointer);

        this.startButton = new StartButton();
        this.add(this.startButton);

        this.add(title);
        this.add(message);
        this.add(instruction);
    }

      onActivate(context) {
        this.sceneStarted = false
        Resources.GameOver.play(0.5);
    }

    onPreUpdate(engine) {
        const pointer = this.pointer;
        const btn = this.startButton;

        let isHovering = false;
        if (pointer && btn) {
            isHovering =
                pointer.pos.x >= btn.pos.x - btn.width / 2 &&
                pointer.pos.x <= btn.pos.x + btn.width / 2 &&
                pointer.pos.y >= btn.pos.y - btn.height / 2 &&
                pointer.pos.y <= btn.pos.y + btn.height / 2;
        }

        if (isHovering && !this.wasHovering) {
            Resources.Hover.play(0.5);
        }
        this.wasHovering = isHovering;
        pointer.buttonFocused = isHovering;
        btn.setFocused(isHovering);

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene("start");
        }

        const gamepad = engine.mygamepad;
        if (isHovering && gamepad && gamepad.isButtonPressed(Buttons.Face1)) {
            engine.goToScene("start");
            Resources.Click.play(0.5);
            Resources.GameOver.stop();
        }
    }
}
