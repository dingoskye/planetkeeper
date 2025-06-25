import { Actor, Vector, Color, Label, FontUnit, Rectangle, Timer } from "excalibur"
import { Resources } from '../resources.js'

export class ReputationLowPopUp extends Actor {
    constructor() {
        super({
            z: 10,
        });

        const label = new Label({
            text: "Reputatie is te laag",
             pos: new Vector(-20, 100),
            anchor: Vector.Half,
            font: Resources.SubText.toFont({
                size: 24,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center'
            })
        });
        this.addChild(label);

        const label1 = new Label({
            text: "om naar de volgende fase te gaan",
            pos: new Vector(-20, 135),
            anchor: Vector.Half,
            font: Resources.SubText.toFont({
                size: 20,
                unit: FontUnit.Px,
                color: Color.White,
                textAlign: 'center'
            })
        });
        this.addChild(label1);
    }

    onInitialize(engine) {
        this.timer = new Timer({
            fcn: () => this.kill(),
            repeats: false,
            interval: 5000
        });
        engine.add(this.timer);
        this.timer.start();
    }
}
