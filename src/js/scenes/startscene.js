import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor, Buttons } from "excalibur"
import { Resources } from "../resources.js"
import { Startbg } from "../startbackground.js"

export class StartScene extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        const startbg = new Startbg()
        this.add(startbg)

        const title = new Label({
            text: "Planet Keeper",
            font: new Font({
                size: 50,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(640, 230),
        })

        const instruction = new Label({
            text: "Druk op 'A' of 'X'",
            font: new Font({
                size: 30,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(640, 310),
        })

        this.add(title)
        this.add(instruction)
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene("game");
            return;
        }

        if (engine.mygamepad) {
            if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
                console.log("A-knop ingedrukt - start game");
                engine.goToScene("game");
                return;
            }
        }
    }
}