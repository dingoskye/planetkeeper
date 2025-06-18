import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons, CollisionType, Rectangle } from "excalibur"
import { Resources } from "../resources.js"
import { Startbg } from "../startbackground.js"
import { Pointer } from "../pointer.js"

export class StartScene extends Scene {
    mygamepad
    pointer
    startButton
    buttonFocused = false
    sceneStarted = false

    onInitialize(engine) {
        const startbg = new Startbg()
        this.add(startbg)

        this.pointer = new Pointer()
        this.add(this.pointer)

        Resources.Intro.play(0.4)

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

        this.startButton = new Actor({
            pos: new Vector(640, 410),
            width: 300,
            height: 60,
            collisionType: CollisionType.ActiveCollision,
        });

        this.startButtonGraphics = new Rectangle({
            color: Color.Gray,
            width: 300,
            height: 60,
        });
        this.startButton.graphics.use(this.startButtonGraphics);

        const buttonText = new Label({
            text: "Start spel",
            font: Resources.SubText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 30,
                unit: FontUnit.Px,
            }),
            pos: this.startButton.pos.clone()
        })

        this.startButton.on('pointerup', () => {
            engine.goToScene('gamescene')
        })

        const instruction = new Label({
            text: "Druk op 'A' of 'X' om iets te selecteren",
            font: Resources.SubText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 30,
                unit: FontUnit.Px,
            }),
            pos: new Vector(640, 680),
        })

        this.add(title)
        this.add(this.startButton)
        this.add(buttonText)
        this.updateButtonVisual()
        this.add(instruction)
    }

    updateButtonVisual() {
        if (this.pointer.buttonFocused) {
            this.startButtonGraphics.color = Color.Yellow;
        } else {
            this.startButtonGraphics.color = Color.Gray;
        }
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
        pointer.buttonFocused = isHovering;
        this.updateButtonVisual();

        if (!this.sceneStarted && engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.sceneStarted = true;
            engine.goToScene("game");
            Resources.Click.play(0.5)
            Resources.Intro.stop()
        }

        const gamepad = engine.mygamepad;
        if (!this.sceneStarted && isHovering && gamepad && gamepad.isButtonPressed(Buttons.Face1)) {
            this.sceneStarted = true;
            engine.goToScene("game");
            console.log("press A");
            Resources.Click.play(0.5)
            Resources.Intro.stop()
        }
    }
}