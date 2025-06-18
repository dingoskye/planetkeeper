import { Actor, CollisionType, Vector, Color, Label, Rectangle } from "excalibur";
import { Resources } from "./resources.js";

export class StartButton extends Actor {

    buttonFocused = false

    constructor() {
        super({
            pos: new Vector(640, 410),
            width: 300,
            height: 60,
            collisionType: CollisionType.ActiveCollision,
        });

        this.buttonGraphics = new Rectangle({
            width: 300,
            height: 80,
            color: Color.Gray,
        });

        this.graphics.use(this.buttonGraphics);

        this.buttonText = new Label({
            text: "Start spel",
            font: Resources.SubText.toFont({
                color: Color.Black,
                textAlign: 'center',
                size: 30,
            }),
            pos: new Vector(0, -15),
        });

        this.addChild(this.buttonText);
    }

    setFocused(isHovering) {
        if (isHovering) {
            this.buttonGraphics.color = Color.fromRGB(136, 129, 70, 1);
            console.log(this.buttonText)
            this.buttonText._text.color = Color.White;
        } else {
            this.buttonGraphics.color = Color.Gray;
            this.buttonText._text.color = Color.Black;
        }
    }
}
