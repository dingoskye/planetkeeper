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
                Resources.Click.play(0.5);
                engine.goToScene("collectables");
            }

            if (face1Pressed && this.pointerTouchingMaterial) {
                Resources.Click.play(0.5);
                this.ui.showMaterials();

                const closeButton = this.ui.materialsPopUp.close;

                closeButton.on('collisionstart', (event) => {
                    if (event.other.owner instanceof Pointer) {
                        this.pointerTouchingClose = true;
                    }
                });

                closeButton.on('collisionend', (event) => {
                    if (event.other.owner instanceof Pointer) {
                        this.pointerTouchingClose = false;
                    }
                });
            }

            if (face1Pressed && this.pointerTouchingClose) {
                console.log("Player drukt op Close");
                Resources.Click.play(0.5);
                this.ui.closeMaterials();
            }

            const popup = this.ui.materialsPopUp
            if (popup && !this.materialsHandlersSet) {
                this.materialsHandlersSet = true
                
                this.button1 = popup.button1
                this.button2 = popup.button2
                this.button3 = popup.button3
                this.button4 = popup.button4

                this.button1.on('collisionstart', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton1 = true
                })
                this.button1.on('collisionend', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton1 = false
                })

                this.button2.on('collisionstart', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton2 = true
                })
                this.button2.on('collisionend', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton2 = false
                })

                this.button3.on('collisionstart', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton3 = true
                })
                this.button3.on('collisionend', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton3 = false
                })

                this.button4.on('collisionstart', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton4 = true
                })
                this.button4.on('collisionend', (evt) => {
                    if (evt.other.owner instanceof Pointer)
                        this.pointerTouchingButton4 = false
                })
            }

            if (face1Pressed && this.pointerTouchingButton1) {
                const amount = this.button1.amount;
                const currentResources = this.ui.resourceUI.resource;
                console.log(currentResources)

                if (currentResources >= amount) {
                    Resources.Click.play(0.5);
                    this.worldActor.updateResource(-amount);
                    this.worldActor.updateProgression(+amount);
                    this.ui.closeMaterials();
                } else {
                    console.log("Niet genoeg materiaal");
                    Resources.WarningDead.play(0.5);
                }
            }

            if (face1Pressed && this.pointerTouchingButton2) {
                const amount = this.button2.amount;
                const currentResources = this.ui.resourceUI.resource;

                if (currentResources >= amount) {
                    Resources.Click.play(0.5);
                    this.worldActor.updateResource(-amount);
                    this.worldActor.updateProgression(+amount);
                    this.ui.closeMaterials();
                } else {
                    console.log("Niet genoeg materiaal");
                    Resources.WarningDead.play(0.5);
                }
            }

            if (face1Pressed && this.pointerTouchingButton3) {
                const amount = this.button3.amount;
                const currentResources = this.ui.resourceUI.resource;

                if (currentResources >= amount) {
                    Resources.Click.play(0.5);
                    this.worldActor.updateResource(-amount);
                    this.worldActor.updateProgression(+amount);
                    this.ui.closeMaterials();
                } else {
                    console.log("Niet genoeg materiaal");
                    Resources.WarningDead.play(0.5);
                }
            }

            if (face1Pressed && this.pointerTouchingButton4) {
                const amount = this.button4.amount;
                const currentResources = this.ui.resourceUI.resource;

                if (currentResources >= amount) {
                    Resources.Click.play(0.5);
                    this.worldActor.updateResource(-amount);
                    this.worldActor.updateProgression(+amount);
                    this.ui.closeMaterials();
                } else {
                    console.log("Niet genoeg materiaal");
                    Resources.WarningDead.play(0.5);
                }
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
