import { Actor, Label, Font, FontUnit, Color, Vector, TextAlign } from "excalibur"
import { Resources } from '../resources.js'

export class WorldnameUI extends Label {

    worldNameLabel

    constructor() {
        super({
            text: "Memento Vivere",
            pos: new Vector(500, 130),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.z = 1

    }



}