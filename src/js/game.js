import '../css/style.css'
import { Engine, DisplayMode, FadeInOut, Color, SolverStrategy, Vector } from "excalibur"
import { ResourceLoader } from './resources.js'
import { StartScene } from './scenes/startscene.js'
import { GameScene } from './scenes/gamescene.js'
import { GameOver } from './scenes/gameover.js'
import { DilemmaEvent } from './dilemmaEvent.js'
import { CollectablesScene } from './scenes/collectablescene.js'

export class Game extends Engine {

    mygamepad

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800)
            }
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const transitions = {
            in: new FadeInOut({ duration: 400, direction: 'in', color: Color.Black }),
            out: new FadeInOut({ duration: 400, direction: 'out', color: Color.Black })
        };

        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("Gamepad gedetecteerd");
            this.mygamepad = connectevent.gamepad;
        });

        this.input.gamepads.on('disconnect', () => {
            console.log("Gamepad losgekoppeld");
            this.mygamepad = null;
        });

        this.add('start', {
            scene: new StartScene(),
            transitions: transitions
        });

        this.add('game', {
            scene: new GameScene(),
            transitions: transitions
        });

        this.add('collectables', {
            scene: new CollectablesScene(),
            transitions: transitions
        });

        this.add('gameover', {
            scene: new GameOver(),
            transitions: transitions
        });

        this.goToScene('start');
    }
}

new Game()
