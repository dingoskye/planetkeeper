import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Flower } from './flower.js'

export class RainbowBird extends Flower {
    constructor(x, y) {
        super()
        this.graphics.use(Resources.CollectableBirdShadow.toSprite())
        this.pos = new Vector(x, y)
        //  this.scale = new Vector(3, 3)
    }
    flowerCollectible() {
        let collection = JSON.parse(localStorage.getItem("collection"))
        console.log(collection)
        if (collection) {
            if (collection.includes("GayBird")) {
                this.graphics.use(Resources.CollectibleBird.toSprite())
            } else {
                console.log("there is a collection")
                console.log("youll get a GayBird")
                collection.push("Bird")
                localStorage.setItem("collection", JSON.stringify(collection))
            }
        } else {
            console.log("youll get your first collection")
            collection = []
            collection.push("GayBird")
            localStorage.setItem("collection", JSON.stringify(collection))
            this.graphics.use(Resources.CollectibleBird.toSprite())
        }
    }
    showBird() {
        let collection = []
        if (JSON.parse(localStorage.getItem("collection"))) {
            collection = JSON.parse(localStorage.getItem("collection"))
        }
        if (collection.includes("GayBird")) {
            this.graphics.use(Resources.CollectibleBird.toSprite())
        } else {
            this.graphics.use(Resources.CollectableBirdShadow.toSprite())
        }
    }
}