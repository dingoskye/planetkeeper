import { ScreenElement } from "excalibur"
import { ProgressionBar } from './progressbar.js'
import { ReputationBar } from './reputationbar.js'
import { ResourceUI } from './resourcesui.js'
import { BackgroundUi } from './backgroundUi.js'

export class UI extends ScreenElement {

    progressionBar
    reputationBar
    resourceUI

    constructor() {
        super()
        //BOVENKANT UI
        //Achterkant
        let background = new BackgroundUi(0, 0, 80)
        this.addChild(background)

        //Materialen
        this.resourceUI = new ResourceUI()
        this.addChild(this.resourceUI)

        //Reputatie
        this.reputationBar = new ReputationBar()
        this.addChild(this.reputationBar)

        //ONDERKANT UI
        //Achterkant
        let background1 = new BackgroundUi(0, 635, 85)
        this.addChild(background1)

        //Progressie
        this.progressionBar = new ProgressionBar()
        this.addChild(this.progressionBar)
    }
}

