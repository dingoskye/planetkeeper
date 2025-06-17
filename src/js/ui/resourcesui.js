import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class ResourceUI extends Actor {

    resource

    constructor() {
        super()

        this.resource = 0

        let resourceImage = new Actor({
            x: 50, y: 40,
        })
        resourceImage.graphics.use(Resources.GoldbarStacks.toSprite())
        resourceImage.scale = new Vector(0.5, 0.5)
        this.addChild(resourceImage)

        this.label = new Label({
            text: '0',
            pos: new Vector(90, 25),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.addChild(this.label)
    }

    onPostUpdate(engine) {

        if (engine.input.keyboard.wasPressed(Keys.B)) {
            //this.resources = this.resources + 10
            this.updateResources(+10)
        }
    }



    updateResources(number) {

        //resources
        this.resource = this.resource + number
        this.label.text = `${this.resource}`
        if (this.resource > 0) {
            // this.resource -= number
            console.log(`Your resources are: ${this.resource}`)
        } else {
            console.log("Not enough resources to update progress")
        }
    }

}