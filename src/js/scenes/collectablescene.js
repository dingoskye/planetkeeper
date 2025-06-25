import { Actor, Scene, Vector, Color, Label, FontUnit, TextAlign, Keys, Buttons, CollisionType } from "excalibur"
import { Resources } from '../resources.js'
import { BackgroundUi } from '../ui/backgroundUi.js'
import { Flower } from '../collectabel/flower.js'
import { BloodBird } from '../collectabel/bloodBird.js'
import { RainbowBird } from '../collectabel/rainbowBird.js'
import { Duck } from '../collectabel/duck.js'
import { Pointer } from "../pointer.js"

export class CollectablesScene extends Scene {

    sceneStarted = false;
    gamepad;
    pointerTouchingClose = false;

    onInitialize(engine) {
        let background = new Actor({
            color: Color.fromRGB(211, 211, 211, 1),
            width: 1280, height: 720, anchor: Vector.Zero
        })
        this.add(background)

        let borderTop = new BackgroundUi(0, 0, 100)
        this.add(borderTop)

        this.pointer = new Pointer();
        this.add(this.pointer);

        this.close = new Actor({
            width: Resources.CloseButton.width * 0.5,
            height: Resources.CloseButton.height * 0.5,
            x: 1225, y: 45,
            collisionType: CollisionType.Fixed,
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
        this.infoFlower = new Label({
            text: '?',
            pos: new Vector(185, 350),
            font: Resources.SubText.toFont({
                size: 20,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center
            })
        })
        this.add(this.infoFlower)

        this.bloodBird = new BloodBird(580, 250, 1)
        this.add(this.bloodBird)
        this.infoBloodbird = new Label({
            text: '?',
            pos: new Vector(595, 350),
            font: Resources.SubText.toFont({
                size: 20,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center
            })
        })
        this.add(this.infoBloodbird)

        this.bird = new RainbowBird(990, 250, 1)
        this.add(this.bird)
        this.infoRainbowbird = new Label({
            text: '?',
            pos: new Vector(1010, 350),
            font: Resources.SubText.toFont({
                size: 20,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center
            })
        })
        this.add(this.infoRainbowbird)

        this.duck = new Duck(220, 525, 2)
        this.add(this.duck)
        this.infoDuck = new Label({
            text: '?',
            pos: new Vector(185, 600),
            font: Resources.SubText.toFont({
                size: 20,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: TextAlign.Center
            })
        })
        this.add(this.infoDuck)

        this.close.on('collisionstart', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingClose = true;
            }
        });

        this.close.on('collisionend', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingClose = false;
            }
        });
    }

    onActivate() {
        this.flower.showCollectable("flower")
        this.bird.showCollectable("rainbowbird")
        this.bloodBird.showCollectable("bloodbird")
        this.duck.showCollectable("duck")
    }

    onPostUpdate(engine) {
        if (engine.mygamepad) {
            const face1Pressed = engine.mygamepad.isButtonPressed(Buttons.Face1);

            if (face1Pressed && this.pointerTouchingClose) {
                console.log("Player druekt op collectables");
                Resources.Click.play(0.5);
                engine.goToScene("game");
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.G)) {
            this.engine.goToScene('game')
        }
    }
}
