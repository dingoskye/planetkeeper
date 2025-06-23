import { Actor, Vector, Color, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'

export class PopUp extends Actor {

    label
    image
    label1
    counter
    kind
    updatekind
    number


    constructor(kind, update, number) {
        super()
        this.counter = 120
        this.kind = kind
        this.updatekind = update
        this.number = number

        this.label = new Label({
            text: `${this.updatekind}`,
            pos: new Vector(25, 100),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.image = new Actor()

        this.label1 = new Label({
            text: `${this.number}`,
            pos: new Vector(115, 100),
            font: Resources.SubText.toFont({
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
    }

    //pop up lijst
    static activeResourcePopUps = [] = []
    static activeReputationPopUps = [] = []


    onInitialize() {
        const baseY = 100

        let offsetY = 0

        if (this.kind === "reputation") {
            PopUp.activeReputationPopUps.push(this)
            offsetY = 60 * (PopUp.activeReputationPopUps.indexOf(this))

            this.label.pos = new Vector(1100, baseY + offsetY)
            this.label1.pos = new Vector(1190, baseY + offsetY)
            this.image.pos = new Vector(1150, baseY + offsetY + 16)

            if (this.updatekind === "-") {
                this.image.graphics.use(Resources.SadFace.toSprite())
                Resources.DecreaseReputation.play()
            } else if (this.updatekind === "+") {
                this.image.graphics.use(Resources.HappyFace.toSprite())
                Resources.IncreaseReputation.play()
            }

            this.image.scale = new Vector(0.5, 0.5)

        } else if (this.kind === "resource") {
            PopUp.activeResourcePopUps.push(this)
            offsetY = 60 * (PopUp.activeResourcePopUps.indexOf(this))

            this.label.pos = new Vector(25, baseY + offsetY)
            this.label1.pos = new Vector(115, baseY + offsetY)
            this.image.pos = new Vector(75, baseY + offsetY + 16)

            this.image.graphics.use(Resources.Goldbar.toSprite())
            this.image.scale = new Vector(0.5, 0.5)
            Resources.Materials.play()
        }

        this.addChild(this.label)
        this.addChild(this.image)
        this.addChild(this.label1)
    }

    onPostUpdate() {
        //oude popups verwijderen en terug naar pos
        this.counter--
        if (this.counter === 0) {
            this.actions.fade(0, 100).callMethod(() => {
                const baseY = 100

                if (this.kind === "reputation") {
                    const index = PopUp.activeReputationPopUps.indexOf(this)
                    if (index !== -1) PopUp.activeReputationPopUps.splice(index, 1)

                    PopUp.activeReputationPopUps.forEach((popup, i) => {
                        const offsetY = 60 * i
                        popup.label.pos.y = baseY + offsetY
                        popup.label1.pos.y = baseY + offsetY
                        popup.image.pos.y = baseY + offsetY + 16
                    })

                } else if (this.kind === "resource") {
                    const index = PopUp.activeResourcePopUps.indexOf(this)
                    if (index !== -1) PopUp.activeResourcePopUps.splice(index, 1)

                    PopUp.activeResourcePopUps.forEach((popup, i) => {
                        const offsetY = 60 * i
                        popup.label.pos.y = baseY + offsetY
                        popup.label1.pos.y = baseY + offsetY
                        popup.image.pos.y = baseY + offsetY + 16
                    })
                }

                this.kill()
            })
        }
    }
}