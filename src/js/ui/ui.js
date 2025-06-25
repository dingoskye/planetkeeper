import { ScreenElement } from "excalibur"
import { ProgressionBar } from './progressbar.js'
import { ReputationBar } from './reputationbar.js'
import { ResourceUI } from './resourcesui.js'
import { BackgroundUi } from './backgroundUi.js'
import { PopUp } from './popup.js'
import { CollectPopUp } from '../collectabel/collectPopUp.js'
import { ProgressButtonUI } from './progressbutton.js'
import { WorldnameUI } from "./worldname.js"
import { WorldFaseUI } from "./worldfaseui.js"
import { MaterialsPopUp } from "./materialsPopUp.js"
import { ReputationLowPopUp } from "./reputationLowPopUp.js"

export class UI extends ScreenElement {

    progressionBar
    progressButton
    reputationBar
    resourceUI
    worldFase
    worldName

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

        //ProgessButton
        this.progressButton = new ProgressButtonUI()
        this.addChild(this.progressButton)

        //Worldname
        this.worldName = new WorldnameUI()
        this.addChild(this.worldName)

        //Worldfase
        this.worldFase = new WorldFaseUI()
        this.addChild(this.worldFase)
    }

    showPopUp(kind, update, number) {
        let popUp = new PopUp(kind, update, number)
        this.addChild(popUp)
    }

    showReputationLowPopUp() {
        if (!this.reputationLowPopUp) {
            this.reputationLowPopUp = new ReputationLowPopUp(); 
            this.reputationLowPopUp.pos.x = 1100; 
            this.reputationLowPopUp.pos.y = this.reputationBar.pos.y + this.reputationBar.height + 20; 
            this.addChild(this.reputationLowPopUp);
        }
    }

    closeReputationLowPopUp() {
        if (this.reputationLowPopUp) {
            this.reputationLowPopUp.kill();
            this.reputationLowPopUp = null;
        }
    }

    showCollectablePopUp(kind) {
        let popUp = new CollectPopUp(kind)
        this.addChild(popUp)
    }

    showMaterials() {
        if (!this.materialsPopUp) {
            this.materialsPopUp = new MaterialsPopUp();
            this.addChild(this.materialsPopUp);
        }
    }

    closeMaterials() {
        if (this.materialsPopUp) {
            this.materialsPopUp.kill();
            this.materialsPopUp = null;
        }
    }
}
