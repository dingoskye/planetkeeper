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
            font: Resources.MainText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 50,
                unit: FontUnit.Px,
            }),
            pos: new Vector(640, 310),
        })

        const instruction = new Label({
            text: "Druk op 'A' of 'X'",
            font: Resources.SubText.toFont({
                color: Color.White,
                textAlign: 'center',
                size: 30,
                unit: FontUnit.Px,
            }),
            pos: new Vector(640, 390),
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