import { Actor, Vector, Color, Keys, Label, Font, FontUnit, Rectangle } from "excalibur"
import { Resources } from '../resources.js'

export class ReputationBar extends Actor {

    bar
    barGraphics
    reputation
    maxValue

    constructor() {
        super()

        this.reputation = 0
        this.maxValue = 100

        const label = new Label({
            text: "Reputatie:",
            font: Resources.SubText.toFont({
                size: 27,
                unit: FontUnit.Px,
                color: Color.White
            }),
            pos: new Vector(780, 27),
        })

        this.addChild(label)

        let barbackground = new Actor({
            x: 935, y: 25,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 300, height: 30, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 935, y: 25,
            anchor: Vector.Zero
        })
        this.barGraphics = new Rectangle({
            color: Color.Red,
            width: 300, height: 30
        })
        this.bar.graphics.use(this.barGraphics)
        this.addChild(this.bar)

        this.updateReputation()
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.reputation = this.reputation + 10
            this.updateReputation()
        }
    }

    updateReputation() {
        let currentValue = this.reputation
        let percentage = currentValue / this.maxValue
        if (percentage >= 1) {
            percentage = 1
        }
        this.bar.scale = new Vector(percentage, 1)

        console.log(this.bar.graphics.color)
        if (percentage < 0.5 && this.barGraphics.color !== Color.fromRGB(225, 0, 0, 1)) {
            this.barGraphics.color = Color.fromRGB(225, 0, 0, 1)
        } else if (percentage > 0.5 && this.barGraphics.color !== Color.fromRGB(0, 225, 0, 1)) {
            this.barGraphics.color = Color.fromRGB(0, 225, 0, 1)
        }

        if (this.reputation >= this.maxValue) {
            console.log("Whoohoo")
        }
    }
}