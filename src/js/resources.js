import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    World: new ImageSource('images/wereld_stage-1.png'),
    WorldStage2: new ImageSource('images/wereld_stage-2.png'),
    WorldStage3: new ImageSource('images/wereld_stage-3.png'),
    WorldStage4: new ImageSource('images/weleld_stage-4.png'),
    WorldDead: new ImageSource('images/wereld_dead.png'),
    Scenebg: new ImageSource('images/background.png'),
    StartScenebackground: new ImageSource('images/startscene.png'),
    Endbg: new ImageSource ('images/endscene.png'),
    MainText: new FontSource('fonts/Audiowide-Regular.ttf', 'AudioWide'),
    SubText: new FontSource('fonts/Orbitron-VariableFont_wght.ttf', 'Orbitron')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }