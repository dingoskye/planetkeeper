import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons, CollisionType } from "excalibur"
import { Resources } from "../resources.js"
import { Startbg } from "../startbackground.js"

export class StartScene extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        const startbg = new Startbg()
        this.add(startbg)

        this.pointer = new Actor({
            pos: new Vector(640, 400),
            scale: new Vector(0.3, 0.3),
            anchor: Vector.Half,
        })
        this.pointer.graphics.use(Resources.Pointer.toSprite())
        this.pointer.z = 5
        this.add(this.pointer)

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
            pos: new Vector(640, 400),
            width: 300,
            height: 60,
            color: Color.Gray,
            collisionType: CollisionType.PreventCollision
        })

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
            engine.goToScene('game')
        })
        // const instruction = new Label({
        //     text: "Druk op 'A' of 'X'",
        //     font: Resources.SubText.toFont({
        //         color: Color.White,
        //         textAlign: 'center',
        //         size: 30,
        //         unit: FontUnit.Px,
        //     }),
        //     pos: new Vector(640, 390),
        // })

        this.add(title)
        this.add(this.startButton)
        this.add(buttonText)

        this.buttonFocused = true
        this.updateButtonVisual()
        // this.add(instruction)
    }

    updateButtonVisual() {
        if (this.buttonFocused) {
            this.startButton.color = Color.Yellow
        } else {
            this.startButton.color = Color.Gray
        }
    }

    onPreUpdate(engine) {
        const gamepad = engine.mygamepad

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene("game");
            return;
        }

        if (gamepad) {
            const speed = 5
            this.pointer.pos.x += stickX * speed
            this.pointer.pos.y += stickY * speed

            if (this.pointer.collidesWith(this.startButton)) {
                this.buttonFocused = true
                this.updateButtonVisual()

                if (gamepad.isButtonPressed(Buttons.Face1)) {
                    engine.goToScene("game")
                } else {
                    this.buttonFocused = false
                    this.updateButtonVisual()
                }
            }
        }
    }
}

