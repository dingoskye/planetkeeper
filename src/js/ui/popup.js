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

    static activePopUps = 0;


    onInitialize() {
        PopUp.activePopUps++

        if (PopUp.activePopUps > 9) {
            PopUp.activePopUps = 1
        } 

        const baseY = 100;
        const offsetY = 60 * (PopUp.activePopUps - 1);

        console.log(`PopUp active: ${PopUp.activePopUps}`)

        console.log(this.kind)
        //checkt wat er geupdate gaat worden
        if (this.kind === "reputation") {
            this.label.pos = new Vector(1100, baseY + offsetY)
            this.label1.pos = new Vector(1190, baseY + offsetY)

            this.image.pos = new Vector(1150, baseY + offsetY + 16)
            //past aan voor omhoog of omlaag
            if (this.updatekind === "-") {
                this.image.graphics.use(Resources.SadFace.toSprite())
                Resources.DecreaseReputation.play()
            } else if (this.updatekind === "+") {
                this.image.graphics.use(Resources.HappyFace.toSprite())
                Resources.IncreaseReputation.play()
            }
            this.image.scale = new Vector(0.5, 0.5)

        } else if (this.kind === "resource") {
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
        //zorgt dat de popup weg gaat
        this.counter--
        if (this.counter === 0) {
            this.actions.fade(0, 100).callMethod(() => this.kill)
            PopUp.activePopUps = 0
        }
    }
}