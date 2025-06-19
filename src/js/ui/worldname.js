import { Actor, Label, Font, FontUnit, Color, Vector, } from "excalibur"
import { Resources } from '../resources.js'

export class WorldnameUI extends Label {

    worldNameLabel

    constructor() {
        super({
            text: "Verzin naam",
            pos: new Vector(540, 130),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })


    }


}