import { Actor, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Flower } from './flower.js'

export class BloodBird extends Flower {
    constructor() {
        super()
        this.graphics.use(Resources.CollectableBloodBird.toSprite())
        //this.pos = new Vector(250, 250)
        //  this.scale = new Vector(3, 3)
    }
    flowerCollectible() {
        let collection = JSON.parse(localStorage.getItem("collection"))
        console.log(collection)
        if (collection) {
            if (collection.includes("BloodBird")) {
                return
            } else {
                console.log("there is a collection")
                console.log("You catched a Bird!")
                collection.push("BloodBird")
                localStorage.setItem("collection", JSON.stringify(collection))
            }
        } else {
            console.log("youll get your first collection")
            collection = []
            collection.push("BloodBird")
            localStorage.setItem("collection", JSON.stringify(collection))
            this.graphics.use(Resources.CollectibleFlower.toSprite())
        }
    }
}