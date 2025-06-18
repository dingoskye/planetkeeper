import { Actor, Label, Font, FontUnit, Color, Vector, } from "excalibur"
import { Resources } from '../resources.js'

export class WorldFaseUI extends Label {

    worldFaseLabel

    constructor() {
        super({
            text: "Fase 1",
            pos: new Vector(600, 560),
            font: Resources.SubText.toFont({
                size: 27,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

    }

}