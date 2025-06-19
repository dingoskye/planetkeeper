import { Actor, Vector } from "excalibur"
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
                    this.graphics.use(Resources.CollectibleBloodBird.toSprite())
                    break;
                case "rainbowbird":
                    this.graphics.use(Resources.CollectibleBird.toSprite())
                    break;
                case "flower":
                    this.graphics.use(Resources.CollectibleFlower.toSprite())
            }
        }
    }
}