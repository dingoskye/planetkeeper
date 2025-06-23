import { Actor, Scene, Vector, Buttons, Keys, CollisionType } from "excalibur"
import { Resources } from '../resources.js'
import { UI } from '../ui/ui.js'
import { Bg } from '../background.js'
import { World } from '../worlds/world.js'
import { WorldFaseTwo } from '../worlds/world_fase-2.js'
import { WorldFaseThree } from '../worlds/world_fase-3.js'
import { WorldFaseFour } from '../worlds/world_fase-4.js'
import { WorldFaseFive } from '../worlds/world_fase-5.js'
import { WorldDead } from '../worlds/worldDead.js'
import { DilemmaEvent } from "../dilemmaEvent.js"
import { Flower } from '../collectabel/flower.js'
import { BloodBird } from '../collectabel/bloodBird.js'
import { RainbowBird } from '../collectabel/rainbowBird.js'
import { Pointer } from '../pointer.js'
import { Backpack } from "../backpack.js"

export class GameScene extends Scene {

    sceneStarted = false;
    gamepad;
    pointerTouchingBackpack = false;

    onInitialize(engine) {

        const background = new Bg()
        this.add(background)

        this.worldActor = new World();
        console.log("Adding world:", this.worldActor);
        this.add(this.worldActor)

        this.ui = new UI()
        this.add(this.ui)

        const dilemma = new DilemmaEvent();
        this.add(dilemma);

        this.pointer = new Pointer();
        this.pointer.z = 10000;
        this.add(this.pointer);

        this.backpack = new Backpack();
        this.add(this.backpack);

        this.backpack.on('collisionstart', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingBackpack = true;
                console.log('test')
            }
        });

        this.backpack.on('collisionend', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingBackpack = false;
            }
        });

        /* 
        Onder dit zijn tijdelijke adds
        */
        // this.flower = new Flower()
        // this.add(this.flower)

        // const bloodBird = new BloodBird()
        // this.add(bloodBird)

        // const rainbowBird = new RainbowBird()
        // this.add(rainbowBird)
        /* 
        boven dit staan tijdelijke adds
        */
    }

    onPostUpdate(engine) {
        if (engine.mygamepad) {
            const face1Pressed = engine.mygamepad.isButtonPressed(Buttons.Face1);

            if (face1Pressed && this.pointerTouchingBackpack) {
                //this.pointerTouchingBackpack = true;
                console.log("Player druekt op collectables");
                Resources.Click.play(0.5);
                engine.goToScene("collectables");
            }

            if (engine.mygamepad) {
                const xButton = engine.mygamepad.isButtonPressed(Buttons.Face3);
                if (xButton) {
                    console.log("X-knop ingedrukt");
                    this.gameOver(engine);
                }
            }
        }

        if (engine.input.keyboard.wasPressed(Keys.C)) {
            this.engine.goToScene("collectables")
        }

        if (engine.input.keyboard.wasPressed(Keys.M)) {
            this.ui.showMaterials()
        }
    }

    onActivate(context) {
        this.sceneStarted = false
        Resources.GameWorld1.play(0.6);
    }

    gameOver(engine) {
        console.log("Overschakelen naar gameover");
        engine.goToScene("gameover");
        Resources.GameWorld1.stop();
    }

    collectCollectable(kind) {
        let collection = JSON.parse(localStorage.getItem("collection"))
        console.log(collection)
        if (collection) {
            if (collection.includes(kind)) {
                return
            } else {
                console.log("there is a collection")
                //console.log("youll get a flower")
                collection.push(kind)
                localStorage.setItem("collection", JSON.stringify(collection))
            }
        } else {
            console.log("youll get your first collection")
            collection = []
            collection.push(kind)
            localStorage.setItem("collection", JSON.stringify(collection))
        }

        this.ui.showCollectablePopUp(kind)
    }

    worldUpdate(newWorld, progression, reputation) {
        console.log("Adding world:", this.world)
        if (this.worldActor) {
            this.worldActor.kill()
        }
        if (newWorld === "dead") {
            this.worldActor = new WorldDead(progression, reputation)
            this.add(this.worldActor)
            Resources.WarningDead.play(0.3);
        }
        else if (newWorld === "faseTwo") {
            this.worldActor = new WorldFaseTwo(progression, reputation)
            this.add(this.worldActor)
            Resources.upgradeFase.play(0, 9);
        }
        else if (newWorld === "faseThree") {
            this.worldActor = new WorldFaseThree(progression, reputation)
            this.add(this.worldActor)
            Resources.upgradeFase.play(0, 9);
        }
        else if (newWorld === "faseFour") {
            this.worldActor = new WorldFaseFour(progression, reputation)
            this.add(this.worldActor)
            Resources.upgradeFase.play(0, 9);
        }
        else if (newWorld === "faseFive") {
            this.worldActor = new WorldFaseFive(progression, reputation)
            this.add(this.worldActor)
            Resources.upgradeFase.play(0, 9);
        }
        else if (newWorld === "faseOne") {
            this.worldActor = new World(progression, reputation)
            this.add(this.worldActor)
        }
        this.ui.progressionBar.showProgress()
    }
}
