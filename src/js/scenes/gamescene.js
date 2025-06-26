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
import { Pointer } from '../pointer.js'
import { Backpack } from "../backpack.js"

export class GameScene extends Scene {

    sceneStarted
    gamepad
    pointerTouchingBackpack
    pointerTouchingMaterial
    pointerTouchingClose
    pointerTouchingButtons = {}
    button1
    button2
    button3
    button4
    reset

    onInitialize(engine) {
        this.resetScene()

        this.backpack.on('collisionstart', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingBackpack = true;
            }
        });

        this.backpack.on('collisionend', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingBackpack = false;
            }
        });

        this.ui.progressButton.on('collisionstart', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingMaterial = true;
            }
        });

        this.ui.progressButton.on('collisionend', (event) => {
            if (event.other.owner instanceof Pointer) {
                this.pointerTouchingMaterial = false;
            }
        });
    }

    onPostUpdate(engine) {
        if (engine.mygamepad) {
            const face1Pressed = engine.mygamepad.isButtonPressed(Buttons.Face1);

            if (face1Pressed && this.pointerTouchingBackpack) {
                Resources.Click.play(0.5);
                engine.goToScene("collectables");
            }

            if (face1Pressed && this.pointerTouchingMaterial) {
                Resources.Click.play(0.5);
                this.ui.showMaterials();
            }

            const popup = this.ui.materialsPopUp;
            if (popup) {
                if (face1Pressed && popup.pointerTouchingClose) {
                    Resources.Click.play(0.5);
                    this.ui.closeMaterials();
                }
                if (face1Pressed && popup.pointerTouchingButton1) {
                    const amount = popup.button1.amount;
                    const currentResources = this.ui.resourceUI.resource;
                    if (currentResources >= amount) {
                        Resources.Click.play(0.5);
                        this.worldActor.updateResource(-amount);
                        this.worldActor.updateProgression(+amount);
                        this.ui.closeMaterials();
                    } else {
                        Resources.WarningDead.play(0.5);
                    }
                }
                if (face1Pressed && popup.pointerTouchingButton2) {
                    const amount = popup.button2.amount;
                    const currentResources = this.ui.resourceUI.resource;
                    if (currentResources >= amount) {
                        Resources.Click.play(0.5);
                        this.worldActor.updateResource(-amount);
                        this.worldActor.updateProgression(+amount);
                        this.ui.closeMaterials();
                    } else {
                        Resources.WarningDead.play(0.5);
                    }
                }
                if (face1Pressed && popup.pointerTouchingButton3) {
                    const amount = popup.button3.amount;
                    const currentResources = this.ui.resourceUI.resource;
                    if (currentResources >= amount) {
                        Resources.Click.play(0.5);
                        this.worldActor.updateResource(-amount);
                        this.worldActor.updateProgression(+amount);
                        this.ui.closeMaterials();
                    } else {
                        Resources.WarningDead.play(0.5);
                    }
                }
                if (face1Pressed && popup.pointerTouchingButton4) {
                    const amount = popup.button4.amount;
                    const currentResources = this.ui.resourceUI.resource;
                    if (currentResources >= amount) {
                        Resources.Click.play(0.5);
                        this.worldActor.updateResource(-amount);
                        this.worldActor.updateProgression(+amount);
                        this.ui.closeMaterials();
                    } else {
                        Resources.WarningDead.play(0.5);
                    }
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

        if (this.reset === true) {
            this.resetScene()
        }
    }

    resetScene() {
        this.clear()

        this.reset = false
        this.sceneStarted = false
        this.pointerTouchingClose = false;
        this.pointerTouchingBackpack = false;
        this.pointerTouchingMaterial = false;

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
