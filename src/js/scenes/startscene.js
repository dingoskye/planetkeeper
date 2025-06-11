import { Scene, Label, FontUnit, Vector, Keys, Font, Color, Actor } from "excalibur"
import { Resources } from "../resources.js"

export class StartScene extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            pos: new Vector(650, 190),
            width: 1280,
            height: 720,
            anchor: new Vector(0.5, 0.25),
            scale: new Vector(0.6, 0.6)
        })

        const bgSprite = Resources.Scenebg.toSprite()
        background.graphics.use(bgSprite)
        this.add(background)

        const title = new Label({
            text: "Planet Keeper",
            font: new Font({
                size: 40,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(800, 600),
        })

        const instruction = new Label({
            text: "Klik op 'enter' om te beginnen",
            font: new Font({
                size: 30,
                unit: FontUnit.Px,
                family: "Impact",
                color: Color.White,
                textAlign: 'center'
            }),
            pos: new Vector(400, 260),
        })

        this.add(title)
        this.add(instruction)
    }

    onPreUpdate(engine) {
        const kb = engine.input.keyboard;
        if (kb.wasPressed(Keys.Enter)) {
            console.log("Start game!");
            engine.goToScene("game");
        }
    }
}
