import { Actor, Vector, Color, Label, Font, FontUnit, Rectangle, CollisionType } from "excalibur"
import { Resources } from '../resources.js'
import { MaterialsButton } from "./materialsButton.js"
import { Pointer } from "../pointer.js";

export class MaterialsPopUp extends Actor {

    pointerTouchingClose = false;

    constructor() {
        super({
            x: 640, y: 360, z: 5,
            color: Color.Gray,
            width: 760, height: 340,
            //anchor: Vector.Zero
        })

        let label = new Label({
            text: "Hoeveel materiaal wil",
            pos: new Vector(0, -150),
            font: Resources.SubText.toFont({
                size: 40,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: 'center'
            })
        })
        this.addChild(label)

        let label1 = new Label({
            text: "je in de planeet stoppen?",
            pos: new Vector(0, -100),
            font: Resources.SubText.toFont({
                size: 40,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: 'center'
            })
        })
        this.addChild(label1)

        this.close = new Actor({
            x: 335, y: -135,
            scale: new Vector(0.75, 0.75),
            width: Resources.CloseButton.width * 0.5,
            height: Resources.CloseButton.height * 0.5,
            collisionType: CollisionType.Fixed,
        })
        this.close.graphics.use(Resources.CloseButton.toSprite());
        this.addChild(this.close)

        this.button1 = new MaterialsButton(-215, 0, 25)
        this.addChild(this.button1)

        this.button2 = new MaterialsButton(215, 0, 50)
        this.addChild(this.button2)

        this.button3 = new MaterialsButton(-215, 100, 100)
        this.addChild(this.button3)

        this.button4 = new MaterialsButton(215, 100, 200)
        this.addChild(this.button4)
    }
}