import { Actor, Vector, Color, ScreenElement, Engine, Loader, CollisionType, Shape, Text, Font, Label} from "excalibur";
import jsonData from "../include/events.json"

export class dilemmaEvent extends Event {
    showDilemma(){
        for(let p of jsonData) {
            console.log(p)
        }
    }
}