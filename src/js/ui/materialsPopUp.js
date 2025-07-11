import { Actor, Vector, Color, Label, Font, FontUnit, Rectangle, CollisionType } from "excalibur"
import { Resources } from '../resources.js'
import { MaterialsButton } from "./materialsButton.js"
import { Pointer } from '../pointer.js'

export class MaterialsPopUp extends Actor {
    pointerTouchingClose = false;
    pointerTouchingButton1 = false;
    pointerTouchingButton2 = false;
    pointerTouchingButton3 = false;
    pointerTouchingButton4 = false;
    button1
    button2
    button3
    button4

    constructor() {
        super({
            x: 640, y: 360, z: 5,
            color: Color.Gray,
            width: 760, height: 340,
        });

        let label = new Label({
            text: "Hoeveel materialen wil",
            pos: new Vector(0, -150),
            font: Resources.SubText.toFont({
                size: 40,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: 'center'
            })
        })
        this.addChild(label)

        let label1 = new Label({
            text: "je in de planeet stoppen?",
            pos: new Vector(0, -100),
            font: Resources.SubText.toFont({
                size: 40,
                unit: FontUnit.Px,
                color: Color.Black,
                textAlign: 'center'
            })
        })
        this.addChild(label1)

        this.close = new Actor({
            x: 335, y: -135,
            scale: new Vector(0.75, 0.75),
            width: Resources.CloseButton.width * 1,
            height: Resources.CloseButton.height * 1,
            collisionType: CollisionType.Fixed,
        });
        this.close.graphics.use(Resources.CloseButton.toSprite());
        this.addChild(this.close);

        this.button1 = new MaterialsButton(-215, 0, 25);
        this.addChild(this.button1);

        this.button2 = new MaterialsButton(215, 0, 50);
        this.addChild(this.button2);

        this.button3 = new MaterialsButton(-215, 100, 100);
        this.addChild(this.button3);

        this.button4 = new MaterialsButton(215, 100, 200);
        this.addChild(this.button4);


        this.close.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingClose = true;
        });
        this.close.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingClose = false;
        });

        this.button1.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton1 = true;
        });
        this.button1.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton1 = false;
        });

        this.button2.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton2 = true;
        });
        this.button2.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton2 = false;
        });

        this.button3.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton3 = true;
        });
        this.button3.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton3 = false;
        });

        this.button4.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton4 = true;
        });
        this.button4.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Pointer)
                this.pointerTouchingButton4 = false;
        });
    }

    closeMaterials() {
        this.kill();
        // this.materialsPopUp = null;
    }
}
