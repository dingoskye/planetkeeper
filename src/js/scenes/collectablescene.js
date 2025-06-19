import { Actor, Scene, Vector, Color, Label, FontUnit, TextAlign, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { BackgroundUi } from '../ui/backgroundUi.js'
import { Flower } from '../collectabel/flower.js'
import { BloodBird } from '../collectabel/bloodBird.js'
import { RainbowBird } from '../collectabel/rainbowBird.js'

export class CollectablesScene extends Scene {

    onInitialize(engine) {
        let background = new Actor({
            color: Color.fromRGB(211, 211, 211, 1),
            width: 1280, height: 720, anchor: Vector.Zero
        })
        this.add(background)

        let borderTop = new BackgroundUi(0, 0, 100)
        this.add(borderTop)

        let label = new Label({
            anchor: new Vector(0.5, 0.5),
            text: 'Verzameling',
            pos: new Vector(640, 25),
            font: Resources.MainText.toFont({
                size: 50,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.Black
            })
        })
        this.add(label)

        this.flower = new Flower(250, 250)
        this.add(this.flower)

        this.bloodBird = new BloodBird(640, 250)
        this.add(this.bloodBird)

        this.bird = new RainbowBird(1050, 250)
        this.add(this.bird)
    }

    onActivate() {
        this.flower.showFlower()
        this.bird.showBird()
        this.bloodBird.showBloodBird()
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.G)) {
            this.engine.goToScene('game')
        }
    }
}
