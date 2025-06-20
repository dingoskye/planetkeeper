import { Actor, Vector, Color, Keys, Label, Font, FontUnit, Rectangle } from "excalibur"
import { Resources } from '../resources.js'

export class ReputationBar extends Actor {

    bars
    barGraphics
    reputation
    maxValue

    constructor() {
        super()

        this.reputation = 50
        this.maxValue = 100

        const label = new Label({
            text: "Reputatie:",
            font: Resources.SubText.toFont({
                size: 27,
                unit: FontUnit.Px,
                color: Color.Black
            }),
            pos: new Vector(787, 27),
        })
        this.addChild(label)

        let barbackground = new Actor({
            x: 945, y: 25,
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 300, height: 30, anchor: Vector.Zero
        })
        this.addChild(barbackground)

        this.bar = new Actor({
            x: 945, y: 25,
            anchor: Vector.Zero
        })
        this.barGraphics = new Rectangle({
            color: Color.Red,
            width: 300, height: 30
        })
        this.bar.graphics.use(this.barGraphics)
        this.addChild(this.bar)
    }

    onInitialize() {
        this.showReputation()
    }

    showReputation() {
        let currentValue = this.scene.worldActor.reputation
        this.percentage = currentValue / this.maxValue

        if (this.percentage >= 1) {
            this.percentage = 1
        }
        if (this.percentage <= 0) {
            this.percentage = 0
        }
        this.bar.scale = new Vector(this.percentage, 1);

        if (this.percentage < 0.4) {
            this.barGraphics.color = Color.Red;
        } else if (this.percentage < 0.7) {
            this.barGraphics.color = Color.Yellow;
        } else {
            this.barGraphics.color = Color.Green;
        }
    }

    // checkGameState() {
    //     const world = this.scene.worldActor
    //     const engine = this.scene.engine

    //     const progressFull = world.progression >= world.maxProgress
    //     const reputationFull = world.reputation >= this.maxValue

    //     if (world.reputation <= 0) {
    //         console.log("Game over triggered by reputation")
    //         this.scene.gameOver(engine)
    //     }

    //     if (progressFull && reputationFull) {
    //         console.log("Allebei vol, doorgaan naar volgende fase")
    //         world.fase++
    //         this.scene.worldUpdate("fase" + world.fase, world.progression)
    //     }
    // }
}

//voor world.js


//   if (!this.activeDilemma && this.progression >= this.maxProgress && this.reputation === 100) {
//             this.fase++
//             this.progression = 0
//             this.scene.ui.progressionBar.resetBar()
//             this.updateWorld(this.fase)
//         }

//rep update
// updateReputation(number) {
//     if (number !== 0) {
//         const update = number < 0 ? "-" : "+"
//         const number1 = Math.abs(number)

//         if (update === "+") {
//             this.reputation += number1
//         } else if (update === "-") {
//             this.reputation -= number1
//         }

//         if (this.reputation > 100) this.reputation = 100
//         if (this.reputation <= 0) {
//             this.reputation = 0
//             console.log("Game Over - reputatie op 0")
//             this.scene.gameOver(this.scene.engine)
//         }

//         this.scene.ui.reputationBar.showReputation()
//         this.scene.ui.showPopUp("reputation", update, number1)
//         console.log("Reputatie is nu:", this.reputation)
//     }
// }