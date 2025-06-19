import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'

export class Flower extends Actor {
    constructor(x, y) {
        super()
        this.graphics.use(Resources.CollectableFlowerShadow.toSprite())
        this.pos = new Vector(x, y)
        //  this.scale = new Vector(3, 3)
    }
    flowerCollectible() {
        let collection = JSON.parse(localStorage.getItem("collection"))
        console.log(collection)
        if (collection) {
            if (collection.includes("flower")) {
                return
            } else {
                console.log("there is a collection")
                console.log("youll get a flower")
                collection.push("flower")
                localStorage.setItem("collection", JSON.stringify(collection))
            }
        } else {
            console.log("youll get your first collection")
            collection = []
            collection.push("flower")
            localStorage.setItem("collection", JSON.stringify(collection))
            this.graphics.use(Resources.CollectibleFlower.toSprite())
        }
    }
}