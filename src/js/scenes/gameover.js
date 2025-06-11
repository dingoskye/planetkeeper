import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons } from "excalibur"
import { Bg } from "../background.js"

export class GameOverScene extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        const bg = new Bg()
        this.add(bg)

        const title = new Label({
            text: "Game Over",
            font: new Font({
                size: 50,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(640, 230),
        })

        const message = new Label({
            text: "Je planeet is dood. RIP.",
            font: new Font({
                size: 30,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(640, 290),
        })

        const instruction = new Label({
            text: "Druk op 'A' of 'X' om terug te gaan",
            font: new Font({
                size: 25,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(640, 350),
        })

        this.add(title)
        this.add(message)
        this.add(instruction)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene("start");
            return;
        }

        if (engine.mygamepad) {
            if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
                console.log("A-knop ingedrukt - terug naar start");
                engine.goToScene("start");
                return;
            }
        }
    }
}