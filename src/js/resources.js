import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    World: new ImageSource('images/wereld_stage-1.png'),
    WorldStage2: new ImageSource('images/wereld_stage-2.png'),
    WorldStage3: new ImageSource('images/wereld_stage-3.png'),
    WorldStage4: new ImageSource('images/wereld_stage-4.png'),
    WorldStage5: new ImageSource('images/wereld_stage-5.png'),
    WorldDead: new ImageSource('images/wereld_dead.png'),
    EventText: new ImageSource('images/eventtext.png'),
    Goldbar: new ImageSource('images/goldbar.png'),
    GoldbarStacks: new ImageSource('images/goldbarmulti.png'),
    HappyFace: new ImageSource('images/happyface.png'),
    Pointer: new ImageSource('images/pointer.png'),
    SadFace: new ImageSource('images/sadface.png'),
    Scenebg: new ImageSource('images/background.png'),
    StartScenebackground: new ImageSource('images/startscene.png'),
    CollectibleFlower: new ImageSource('images/Collectable_Flower.png'),
    CollectibleBird: new ImageSource('images/Collectable_Bird.png'),
    CollectableBloodBird: new ImageSource('images/Collectable_BloodBird.png'),
    CollectableBloodBirdShadow: new ImageSource('images/BloodBird_shadow.png'),
    CollectableFlowerShadow: new ImageSource('images/flower_shadow.png'),
    CollectableBirdShadow: new ImageSource('images/GayBird_shadow.png'),
    CollectableDuck: new ImageSource('images/rob_test.png'),
    CollectableDuckShadow: new ImageSource('images/rob_test_shadow.png'),
    Backpack: new ImageSource('images/Backpack.png'),
    PinPointer: new ImageSource('images/pinpointer.png'),
    Materiaal1: new ImageSource('images/Materiaal_1.jpg'),
    Materiaal2: new ImageSource('images/Materiaal_2.jpg'),
    CloseButton: new ImageSource('images/cross.png'),
    Endbg: new ImageSource('images/endscene.png'),
    MainText: new FontSource('fonts/Audiowide-Regular.ttf', 'AudioWide'),
    SubText: new FontSource('fonts/Orbitron-VariableFont_wght.ttf', 'Orbitron'),
    Click: new Sound('sounds/click.mp3'),
    Hover: new Sound('sounds/hover.mp3'),
    EventPopUp: new Sound('sounds/eventPopUp.mp3'),
    Materials: new Sound('sounds/materials.mp3'),
    upgradeFase: new Sound('sounds/upgradeFase.mp3'),
    WarningDead: new Sound('sounds/warningDead.mp3'),
    IncreaseReputation: new Sound('sounds/increaseReputation.mp3'),
    DecreaseReputation: new Sound('sounds/decreaseReputation.mp3'),
    Intro: new Sound('sounds/intro.mp3'),
    GameWorld1: new Sound('sounds/gameWorld1.mp3'),
    GameOver: new Sound('sounds/gameOver.mp3'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }