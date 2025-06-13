import { Actor, Vector, Color, ScreenElement, Engine, Loader, CollisionType, Shape, Text, Font, Label, BaseAlign, TextAlign } from "excalibur";
import jsonData from "../include/events.json"
import { Resources } from './resources.js'

export class DilemmaEvent extends Actor {

    #LabelDilemma
    #labelA
    #labelB
    #LabelC

    constructor() {
        super()
    }

    onInitialize() {
        this.logJson();
    }

    onPostUpdate() {

    }

    logJson() {
        for (let p of jsonData) {
            console.log(p)
        }
    }

    dilemmaManager() {

    }

    showDilemma() {
        // Haal het eerste dilemma-event uit de JSON
        const event = jsonData[0];

        // Achtergrond 
        const bgWidth = 900;
        const bgHeight = 250;
        const bgX = 70 + bgWidth / 2;
        const bgY = 890 + bgHeight / 2;

        this.labelScreen = new Actor({
            pos: new Vector(bgX, bgY),
            width: bgWidth,
            height: bgHeight,
            z: 9000
        });

        // Voeg sprite toe als graphics
        const bgSprite = Resources.EventText.toSprite();
        bgSprite.width = bgWidth;
        bgSprite.height = bgHeight;
        this.labelScreen.graphics.use(bgSprite);

        this.addChild(this.labelScreen);

        // Label voor het dilemma
        this.#LabelDilemma = new Label({
            text: event.title + "\n" + event.context,
            pos: new Vector(100, 900),
            font: new Font({
                size: 40,
                family: 'Open Sans',
                color: Color.White,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#LabelDilemma);

        // Labels voor de keuzes
        this.#labelA = new Label({
            text: "A: " + event.choices[0].option,
            pos: new Vector(100, 980),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#labelA);

        this.#labelB = new Label({
            text: "B: " + event.choices[1].option,
            pos: new Vector(100, 1030),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#labelB);

        this.#LabelC = new Label({
            text: "C: " + event.choices[2].option,
            pos: new Vector(100, 1080),
            font: new Font({
                size: 30,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#LabelC);
    }

    hideDilemma() {
        if (this.labelScreen) {
            this.labelScreen.kill();
            this.labelScreen = null;
        }
        if (this.endLabel) {
            this.endLabel.kill();
            this.endLabel = null;
        }

    }


    progressionHandler() {

    }
}
