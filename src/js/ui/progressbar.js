import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class ProgressionBar extends Actor {

    bar
    progress
    maxValue

    constructor() {
        super()

        this.progress = 0
        this.maxValue = 100

        let label = new Label({
            text: 'Progressie:',
            pos: new Vector(550, 658),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(label)

        let barbackground = new Actor({
            x: 745, y: 655,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 500, height: 40, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 745, y: 655,
            color: Color.Green,
            width: 500, height: 40, anchor: Vector.Zero
        })
        this.addChild(this.bar)

        this.updateProgress()
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.progress = this.progress + 10
            this.updateProgress()
        }
    }

    updateProgress() {
        let currentValue = this.progress
        let percentage = currentValue / this.maxValue
        if (percentage >= 1) {
            percentage = 1
        }
        this.bar.scale = new Vector(percentage, 1)
        console.log(this.bar.scale)
        if (this.progress >= this.maxValue) {
            console.log("Whoohoo")
        }
    }
}