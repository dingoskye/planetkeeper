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
        this.z = 1
    }
    faseOne() {
        this.text = "Fase 1"
    }
    faseTwo() {
        this.text = "Fase 2"
    }

    faseThree() {
        this.text = "Fase 3"
    }

    faseFour() {
        this.text = "Fase 4"
    }

    faseFive() {
        this.text = "Fase 5"
    }

}