import { Actor, Vector, Color, Label, Font, FontUnit, Rectangle } from "excalibur"
import { Resources } from '../resources.js'

export class MaterialsButton extends Actor {

    many

    constructor(x, y, many) {
        super({
            x: x, y: y,
            color: Color.fromRGB(96, 96, 96),
            width: 250, height: 75
        })

        this.many = many

        let image = new Actor({
            x: -75, y: 0,
            scale: new Vector(0.5, 0.5)
        })
        image.graphics.use(Resources.GoldbarStacks.toSprite())
        this.addChild(image)

        let label = new Label({
            text: `${many}`,
            pos: new Vector(-10, -15),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })

        this.addChild(label)
    }
}