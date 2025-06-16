import { Actor, Vector, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class PopUp extends Actor {

    constructor(kind, update, number) {
        super()
        console.log(kind)

        let label = new Label({
            text: `${update}`,
            pos: new Vector(25, 100),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        let image = new Actor()

        let label1 = new Label({
            text: `${number}`,
            pos: new Vector(115, 100),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        if (kind = "reputation") {
            label.pos = new Vector(1100, 100)
            label1.pos = new Vector(1190, 100)

            image.pos = new Vector(1150, 116)
            if (update === "-") {
                image.graphics.use(Resources.SadFace.toSprite())
            } else if (update === "+") {
                image.graphics.use(Resources.HappyFace.toSprite())
            }
            image.scale = new Vector(0.5, 0.5)
        }
        if (kind = "resource") {
            label.pos = new Vector(25, 100)
            label1.pos = new Vector(115, 100)

            image.pos = new Vector(75, 116)
            image.graphics.use(Resources.Goldbar.toSprite())
            image.scale = new Vector(0.5, 0.5)
        }

        this.addChild(label)
        this.addChild(image)
        this.addChild(label1)
    }
}