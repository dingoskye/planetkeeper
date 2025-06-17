import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class ProgressionBar extends Actor {

    bar

    constructor() {
        super()

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

        this.bar.scale = new Vector(0, 1)
    }

    showProgress() {
        let currentValue = this.scene.worldActor.progression - this.scene.worldActor.minProgress
        let percentage = currentValue / this.scene.worldActor.maxProgress

        if (percentage <= 0) {
            percentage = 0
        }

        this.bar.scale = new Vector(percentage, 1)
        // if (currentValue >= this.scene.worldActor.maxProgress) {
        //     this.scene.worldActor.updateWorld(this.scene.worldActor.fase)
        // }
    }

    resetBar() {
        this.showProgress()
    }
}