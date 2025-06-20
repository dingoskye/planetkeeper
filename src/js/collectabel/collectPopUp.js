import { Actor, Vector, Color, Label, Font, FontUnit, Rectangle } from "excalibur"
import { Resources } from '../resources.js'

export class CollectPopUp extends Actor {

    constructor(kind) {
        super({
            x: 930, y: 325,
            color: Color.Gray,
            width: 350, height: 100,
            anchor: Vector.Zero
        })

        this.counter = 240
        this.kind = kind

        this.image = new Actor({ pos: new Vector(50, 0) })

        let label = new Label({
            text: "Trofee",
            pos: new Vector(140, 25),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(label)

        let label1 = new Label({
            text: "verzameld!",
            pos: new Vector(140, 50),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(label1)
    }

    onInitialize() {
        if (this.kind === "flower") {
            this.image.graphics.use(Resources.CollectibleFlower.toSprite())
            this.image.pos = new Vector(95, 20)
        } else if (this.kind === "bloodbird") {
            this.image.graphics.use(Resources.CollectableBloodBird.toSprite())
            this.image.pos = new Vector(55, 40)
            this.image.scale = new Vector(0.5, 0.5)
        } else if (this.kind === "rainbowbird") {
            this.image.graphics.use(Resources.CollectibleBird.toSprite())
            this.image.pos = new Vector(55, 40)
            this.image.scale = new Vector(0.5, 0.5)
        }

        this.addChild(this.image)
    }

    onPostUpdate() {
        //zorgt dat de popup weg gaat
        this.counter--
        if (this.counter === 0) {
            this.actions.fade(0, 100).callMethod(() => this.kill)
        }
    }
}