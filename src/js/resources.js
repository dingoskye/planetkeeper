import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    World: new ImageSource('images/wereld_stage-1.png'),
    WorldStage2: new ImageSource('images/wereld_stage-2.png'),
    WorldStage3: new ImageSource('images/wereld_stage-3.png'),
    WorldStage4: new ImageSource('images/wereld_stage-4.png'),
    WorldStage5: new ImageSource('images/wereld_stage-5.png'),
    WorldDead: new ImageSource('images/wereld_dead.png'),
    EventText: new ImageSource('images/eventtext.png'), //voor events. IS
    Goldbar: new ImageSource('images/goldbar.png'),
    GoldbarStacks: new ImageSource('images/goldbarmulti.png'),
    HappyFace: new ImageSource('images/happyface.png'),
    Pointer: new ImageSource('images/pointer.png'),
    SadFace: new ImageSource('images/sadface.png'),
    Scenebg: new ImageSource('images/background.png'),
    StartScenebackground: new ImageSource('images/startscene.png'),
    CollectibleBird: new ImageSource('images/Collectable_Bird.png'),
    CollectibleFlower: new ImageSource('images/Collectable_Flower.png'),
    CollectibleBird: new ImageSource('images/Collectable_Bird.png'),
    Materiaal1: new ImageSource('images/Materiaal_1.jpg'),
    Materiaal2: new ImageSource('images/Materiaal_2.jpg'),
    Endbg: new ImageSource('images/endscene.png'),
    MainText: new FontSource('fonts/Audiowide-Regular.ttf', 'AudioWide'),
    SubText: new FontSource('fonts/Orbitron-VariableFont_wght.ttf', 'Orbitron')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }