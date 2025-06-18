import { Actor, Vector, Color, Keys, Label, Font, FontUnit, Rectangle } from "excalibur"
import { Resources } from '../resources.js'

export class ReputationBar extends Actor {

    bars
    barGraphics
    reputation
    maxValue

    constructor() {
        super()

        this.reputation = 50
        this.maxValue = 100

        const label = new Label({
            text: "Reputatie:",
            font: Resources.SubText.toFont({
                size: 27,
                unit: FontUnit.Px,
                color: Color.Black
            }),
            pos: new Vector(787, 27),
        })
        this.addChild(label)

        let barbackground = new Actor({
            x: 945, y: 25,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 300, height: 30, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 945, y: 25,
            anchor: Vector.Zero
        })
        this.barGraphics = new Rectangle({
            color: Color.Red,
            width: 300, height: 30
        })
        this.bar.graphics.use(this.barGraphics)
        this.addChild(this.bar)
    }

    onInitialize() {
        this.showReputation()
    }

    showReputation() {
        let currentValue = this.scene.worldActor.reputation
        let percentage = currentValue / this.maxValue
        if (percentage >= 1) {
            percentage = 1
        }
        if (percentage <= 0) {
            percentage = 0
        }
        this.bar.scale = new Vector(percentage, 1)

        if (percentage < 0.4 && this.barGraphics.color !== Color.fromRGB(225, 0, 0, 1)) {
            this.barGraphics.color = Color.Red
        } else if (percentage < 0.7 && this.barGraphics.color !== Color.fromRGB(0, 225, 0, 1)) {
            this.barGraphics.color = Color.Yellow
        } else {
            this.barGraphics.color = Color.Green
        }
    }
}