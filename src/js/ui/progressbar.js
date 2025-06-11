import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"

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
            pos: new Vector(560, 635),
            font: new Font({
                family: 'impact',
                size: 35,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(label)

        let barbackground = new Actor({
            x: 735, y: 635,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 500, height: 40, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 735, y: 635,
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
        let currentValue = Math.max(0, Math.min(this.progress, this.maxValue))
        const percentage = currentValue / this.maxValue
        this.bar.scale = new Vector(percentage, 1)

        if (this.progress >= this.maxValue) {
            console.log("Whoohoo")
        }
    }
}