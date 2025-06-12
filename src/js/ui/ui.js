import { ScreenElement, Actor } from "excalibur"
import { ProgressionBar } from './progressbar.js'
import { ReputationBar } from './reputationbar.js'

export class UI extends ScreenElement {

    progressionBar
    reputationBar

    constructor() {
        super()

        this.progressionBar = new ProgressionBar()
        this.addChild(this.progressionBar)

        this.reputationBar = new ReputationBar()
        this.addChild(this.reputationBar)
    }
}