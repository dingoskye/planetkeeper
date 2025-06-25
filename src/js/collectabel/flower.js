import { Actor, Vector, Label, FontUnit, Color } from "excalibur"
import { Resources } from '../resources.js'

export class Flower extends Actor {

    constructor(x, y, scale) {
        super({ anchor: new Vector(0.5, 0.5) })
        this.graphics.use(Resources.CollectableFlowerShadow.toSprite())
        this.pos = new Vector(x, y)
        this.scale = new Vector(scale, scale)
    }

    showCollectable(kind) {
        let collection = []
        if (JSON.parse(localStorage.getItem("collection"))) {
            collection = JSON.parse(localStorage.getItem("collection"))
        }
        if (collection.includes(kind)) {
            switch (kind) {
                case "bloodbird":
                    this.graphics.use(Resources.CollectableBloodBird.toSprite())
                    this.scene.infoBloodbird.text = "Reputatie is super laag"
                    break;
                case "rainbowbird":
                    this.graphics.use(Resources.CollectibleBird.toSprite())
                    this.scene.infoRainbowbird.text = "Hoogste mogelijke reputatie"
                    break;
                case "flower":
                    this.graphics.use(Resources.CollectibleFlower.toSprite())
                    this.scene.infoFlower.text = "Langere tijd op fase 1"
                    break;
                case "duck":
                    this.graphics.use(Resources.CollectableDuck.toSprite())
                    this.scene.infoDuck.text = "Duck test is gehaald"
            }
        }
    }
}   
