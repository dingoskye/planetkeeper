// @ts-ignore
import { Actor, Vector, Color, ScreenElement, Engine, Loader, CollisionType, Shape, Text, Font, Label, BaseAlign, TextAlign, Buttons } from "excalibur";
import jsonData from "../include/events.json"
import { Resources } from './resources.js'
import { World } from "./worlds/world.js";

export class DilemmaEvent extends Actor {

    #LabelDilemma
    #labelA
    #labelB
    #LabelC
    activeDilemma
    mygamepad
    selectedIndex = 0;
    currentEvent = null;

    constructor() {
        super()
    }

    onInitialize() {
        this.logJson();
        this.dilemmaManager();
    }

    logJson() {
        for (let p of jsonData) {
            console.log(p)
        }
    }

    onPreUpdate(engine) {
        const gamepad = engine.mygamepad;
        if (gamepad && this.activeDilemma) {
            // Navigeer met up/down
            if (gamepad.wasButtonPressed(Buttons.DpadUp)) {
                this.selectedIndex = (this.selectedIndex + 2) % 3; // omhoog (wrapt naar beneden)
            }
            if (gamepad.wasButtonPressed(Buttons.DpadDown)) {
                this.selectedIndex = (this.selectedIndex + 1) % 3; // omlaag (wrapt naar boven)
            }

            // Bevestig keuze met A
            if (gamepad.wasButtonPressed(Buttons.Face1)) {
                if (this.selectedIndex === 0) {
                    this.handleChoice(this.currentEvent.choices[0], 'A');
                } else if (this.selectedIndex === 1) {
                    this.handleChoice(this.currentEvent.choices[1], 'B');
                } else if (this.selectedIndex === 2) {
                    this.handleChoice(this.currentEvent.choices[2], 'C');
                }
            }

            // Update visuele selectie
            if (this.#labelA && this.#labelB && this.#LabelC) {
                this.#labelA.font = this.#labelA.font.clone();
                this.#labelB.font = this.#labelB.font.clone();
                this.#LabelC.font = this.#LabelC.font.clone();

                this.#labelA.font.color = this.selectedIndex === 0 ? Color.Red : Color.Yellow;
                this.#labelB.font.color = this.selectedIndex === 1 ? Color.Red : Color.Yellow;
                this.#LabelC.font.color = this.selectedIndex === 2 ? Color.Red : Color.Yellow;
            }
        }
    }

    dilemmaManager() {
        // Toon direct een random dilemma bij start
        // this.showRandomDilemma();
        if (!this.activeDilemma) {
            // Daarna elke minuut een nieuw dilemma
            this.dilemmaInterval = setInterval(() => {
                this.showRandomDilemma();
            }, 30000); // 60.000 ms = 1 minuut
        }
    }

    showRandomDilemma() {
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        this.activeDilemma = true
        // @ts-ignore
        this.scene.worldActor.eventMarking(this.activeDilemma);
        const event = jsonData[randomIndex];
        this.showDilemma(event);
    }

    showDilemma(event) {
        this.currentEvent = event;

        // Stop het bestaande interval
        if (this.dilemmaInterval) {
            clearInterval(this.dilemmaInterval);
        }

        // Achtergrond 
        this.activeDilemma = true
        const canvasHeight = 720;
        const labelStartX = 20;
        const labelStartY = canvasHeight - 170;
        const labelSpacing = 40;
        const labelCount = 4; // Dilemma + 3 keuzes

        const bgPaddingX = 20;
        const bgPaddingY = 20;

        const bgWidth = 1280;
        const bgHeight = (labelSpacing * (labelCount - 1)) + 40 + bgPaddingY * 2; // hoogte van alle labels + marge

        const bgX = labelStartX + bgWidth / 2 - bgPaddingX;
        const bgY = labelStartY + bgHeight / 2 - bgPaddingY;

        // Maak de achtergrond precies passend
        this.labelScreen = new Actor({
            pos: new Vector(bgX, bgY),
            width: bgWidth,
            height: bgHeight,
            z: 9000
        });

        const bgSprite = Resources.EventText?.isLoaded?.() ? Resources.EventText.toSprite() : null;
        if (bgSprite) {
            bgSprite.width = bgWidth;
            bgSprite.height = bgHeight;
            this.labelScreen.graphics.use(bgSprite);
        } else {
            this.labelScreen.color = Color.Blue;
        }

        this.addChild(this.labelScreen);

        // Label voor het dilemma
        this.#LabelDilemma = new Label({
            text: event.title + "\n" + event.context,
            pos: new Vector(30, 550),
            font: new Font({
                size: 25,
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
            pos: new Vector(30, 610),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#labelA);

        // Maak label A klikbaar
        this.#labelA.on('pointerup', () => {
            console.log('A gekozen');
            this.handleChoice(event.choices[0], 'A');
        });

        this.#labelB = new Label({
            text: "B: " + event.choices[1].option,
            pos: new Vector(30, 640),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#labelB);

        // Maak label B klikbaar
        this.#labelB.on('pointerup', () => {
            console.log('B gekozen');
            this.handleChoice(event.choices[1], 'B');
        });

        this.#LabelC = new Label({
            text: "C: " + event.choices[2].option,
            pos: new Vector(30, 670),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Left,
                baseAlign: BaseAlign.Top
            }),
            z: 9001
        });
        this.addChild(this.#LabelC);

        // Maak label C klikbaar
        this.#LabelC.on('pointerup', () => {
            console.log('C gekozen');
            this.handleChoice(event.choices[2], 'C');
        });
    }

    hideDilemma() {
        if (this.labelScreen) {
            this.activeDilemma = false;
            // @ts-ignore
            this.scene.worldActor.eventKill(this.activeDilemma);
            this.labelScreen.kill();
            this.labelScreen = null;
        }

        // Zet alle labels in een array
        const labels = [this.#LabelDilemma, this.#labelA, this.#labelB, this.#LabelC];

        // Loop eroverheen en kill + null
        for (let i = 0; i < labels.length; i++) {
            if (labels[i]) {
                labels[i].kill();
                labels[i] = null;
            }
        }

        // // Zet de private fields ook op null
        // this.#LabelDilemma = null;
        // this.#labelA = null;
        // this.#labelB = null;
        // this.#LabelC = null;
    }

    handleChoice(choice, label) {
        console.log(`Keuze ${label} gekozen:`, choice);
        // Stuur de waardes door naar world.js
        // @ts-ignore
        const world = this.scene.actors.find(actor => actor instanceof World);
        if (choice.effects) {
            const { progression, resources, reputation } = choice.effects;
            // @ts-ignore
            world.updateProgression(progression);
            // @ts-ignore
            world.updateResource(resources);
            // @ts-ignore
            world.updateReputation(reputation);
        } else {
            console.warn('World instance niet gevonden!');
        }

        this.hideDilemma(); // Verberg het vorige dilemma
        this.dilemmaManager();
    }
}
