import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class ResourceUI extends Actor {

    resources

    constructor() {
        super()

        this.resources = 0
        this.maxValue = 100

        this.label = new Label({
            text: '0',
            pos: new Vector(90, 25),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.label)
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.B)) {
            this.resources = this.resources + 10
            this.updateResources()
        }
    }

    updateResources() {
        this.label.text = `${this.resources}`
    }
}