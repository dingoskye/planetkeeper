import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons, CollisionType, Rectangle } from "excalibur"
import { Resources } from "../resources.js"
import { Startbg } from "../startbackground.js"
import { Pointer } from "../pointer.js"
import { StartButton } from "../startButton.js"

export class StartScene extends Scene {
    mygamepad;
    pointer;
    startButton;
    buttonFocused = false;
    sceneStarted = false;
    wasHovering = false;

    onInitialize(engine) {
        const startbg = new Startbg();
        this.add(startbg);

        this.pointer = new Pointer();
        this.add(this.pointer);

        this.startButton = new StartButton();
        this.add(this.startButton);

        const title = new Label({
            text: "Planet Keeper",
            font: Resources.MainText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 50,
                unit: FontUnit.Px,
            }),
            pos: new Vector(640, 310),
        })

        const instruction = new Label({
            text: "Druk op 'X' om iets te selecteren",
            font: Resources.SubText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 30,
                unit: FontUnit.Px,
            }),
            pos: new Vector(640, 680),
        })

        this.add(title);
        this.add(instruction);
    }

    onActivate(context) {
        this.sceneStarted = false
        Resources.Intro.play(0.6);
    }

    onPreUpdate(engine) {
        //wat ik heb
        const pointer = this.pointer;
        let isHovering = false;
        if (pointer && this.startButton) {

            // Dit is met copilot gedaan
            //Checkt de corners/hitbox van de start button en wanneer de pointer op die positie is, komt er een soort trigger
            isHovering =
                pointer.pos.x >= this.startButton.pos.x - this.startButton.width / 2 &&
                pointer.pos.x <= this.startButton.pos.x + this.startButton.width / 2 &&
                pointer.pos.y >= this.startButton.pos.y - this.startButton.height / 2 &&
                pointer.pos.y <= this.startButton.pos.y + this.startButton.height / 2;
        }

        //de rest is zelf
        if (isHovering && !this.wasHovering) {
            Resources.Hover.play(0.5);
        }
        this.wasHovering = isHovering;
        pointer.buttonFocused = isHovering;
        this.startButton.setFocused(isHovering);

        if (!this.sceneStarted && engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.sceneStarted = true;
            engine.goToScene("game");
            Resources.Click.play(0.5);
            Resources.Intro.stop();
        }

        const gamepad = engine.mygamepad;
        if (!this.sceneStarted && isHovering && gamepad && gamepad.isButtonPressed(Buttons.Face1)) {
            this.sceneStarted = true;
            engine.goToScene("game");
            console.log("press A");
            Resources.Click.play(0.5);
            Resources.Intro.stop();
        }
    }
}