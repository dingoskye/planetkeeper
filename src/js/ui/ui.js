import { ScreenElement, Actor, Color, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { ProgressionBar } from './progressbar.js'
import { ReputationBar } from './reputationbar.js'
import { ResourceUI } from './resourcesui.js'

export class UI extends ScreenElement {

    progressionBar
    reputationBar
    resourceUI

    constructor() {
        super()
        //Bovenkant UI
        //Achterkant
        let barbackground = new Actor({
            x: 0, y: 0,
            color: Color.fromRGB(197, 179, 88, 0.7),
            width: 1280, height: 80, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        //Materialen
        let resourceImage = new Actor({
            x: 50, y: 40,
        })
        resourceImage.graphics.use(Resources.GoldbarStacks.toSprite())
        resourceImage.scale = new Vector(0.5, 0.5)
        this.addChild(resourceImage)

        this.resourceUI = new ResourceUI()
        this.addChild(this.resourceUI)

        //Reputatie
        this.reputationBar = new ReputationBar()
        this.addChild(this.reputationBar)

        //Onderkant UI
        //Achterkant
        let barbackground1 = new Actor({
            x: 0, y: 635,
            color: Color.fromRGB(197, 179, 88, 0.7),
            width: 1280, height: 85, anchor: Vector.Zero
        })
        this.addChild(barbackground1)

        //Progressie
        this.progressionBar = new ProgressionBar()
        this.addChild(this.progressionBar)
    }
}