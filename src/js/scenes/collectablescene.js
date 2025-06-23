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

        this.close = new Actor({
            x: 1225, y: 45,
            //scale: new Vector(0.75, 0.75)
        })
        this.close.graphics.use(Resources.CloseButton.toSprite())
        this.add(this.close)

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

        this.flower = new Flower(250, 200, 2)
        this.add(this.flower)

        this.bloodBird = new BloodBird(580, 250, 1)
        this.add(this.bloodBird)

        this.bird = new RainbowBird(990, 250, 1)
        this.add(this.bird)
    }

    onActivate() {
        this.flower.showCollectable("flower")
        this.bird.showCollectable("rainbowbird")
        this.bloodBird.showCollectable("bloodbird")
    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.G)) {
            this.engine.goToScene('game')
        }
    }
}
