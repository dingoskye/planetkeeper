import { Actor, Vector, Color, Keys, Label, Font, FontUnit, CollisionType } from "excalibur"
import { Resources } from '../resources.js'

//materialen eraf
//reputatie erbij

export class ProgressButtonUI extends Actor {

    resource

    constructor() {
        super({ x: 440, y: 40 })
        // this.resource = 0
        this.graphics.use(Resources.Materiaal1.toSprite())
        this.scale = new Vector(0.08, 0.08)
        this.body.collisionType = CollisionType.Passive;
        this.collider.useBoxCollider(); 



    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Z)) {
            console.log(this.scene)
            console.log(this.scene.worldActor)
            this.scene.worldActor.updateProgression(10)
            this.scene.worldActor.updateResource(-10)

            // this.scene.worldActor.updateReputation(-10)
        }
    }



}