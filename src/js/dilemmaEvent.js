import { Actor, Vector, Color, ScreenElement, Engine, Loader, CollisionType, Shape, Text, Font, Label} from "excalibur";
import jsonData from "../include/events.json"

export class DilemmaEvent extends Actor {

    constructor() {
        super()
    }

    onInitialize() {
        this.showDilemma();
    }

    onPostUpdate(){

    }
    
    showDilemma(){
        for(let p of jsonData) {
            console.log(p)
        }
    }

    dilemmaManager(){

    }

    progressionHandler(){

    }
}
