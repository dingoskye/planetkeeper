import { ScreenElement, Actor } from "excalibur"
import { ProgressionBar } from './progressbar.js'

export class UI extends ScreenElement {

    progressionBar

    constructor() {
        super()

        this.progressionBar = new ProgressionBar()
        this.addChild(this.progressionBar)
    }
}