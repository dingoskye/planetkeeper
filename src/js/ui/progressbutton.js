import { Actor, Vector, Color, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

//materialen eraf
//reputatie erbij

export class ProgressButtonUI extends Actor {

    resource

    constructor() {
        super()


        this.resource = 0
        // dit is al een actor dus je hoeft niet nog een actor te maken
        let resourceImage = new Actor({
            x: 440, y: 40,
        })
        resourceImage.graphics.use(Resources.Materiaal1.toSprite())
        resourceImage.scale = new Vector(0.08, 0.08)
        this.addChild(resourceImage)

    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Z)) {

            console.log("Progression button pressed")
            console.log(this.scene)
            console.log(this.scene.worldActor)
            this.scene.worldActor.updateProgression(10)
            // this.scene.worldActor.updateResource(10)
            // this.scene.worldActor.updateReputation(-10)
        }
    }



}