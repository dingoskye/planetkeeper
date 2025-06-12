import { Actor, Vector, Color, Keys, Label, Font, FontUnit, Graphic } from "excalibur"

export class ReputationBar extends Actor {

    bar
    reputation
    maxValue

    constructor() {
        super()

        this.reputation = 0
        this.maxValue = 100

        let barbackground = new Actor({
            x: 935, y: 25,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 300, height: 30, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 935, y: 25,
            color: Color.Red,
            width: 300, height: 30, anchor: Vector.Zero
        })

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
        const percentage = currentValue / this.maxValue
        this.bar.scale = new Vector(percentage, 1)
        console.log(this.bar.color)
        if (percentage < 0.5 && this.bar.color !== Color.fromRGB(225, 0, 0, 1)) {
            this.bar.color = Color.fromRGB(225, 0, 0, 1)
        } else if (percentage > 0.5 && this.bar.color !== Color.fromRGB(0, 225, 0, 1)) {
            this.bar.color = Color.fromRGB(0, 225, 0, 1)
        }

        if (this.reputation >= this.maxValue) {
            console.log("Whoohoo")
        }
    }
}