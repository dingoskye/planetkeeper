import { Actor, Vector, Color, ScreenElement, Engine, Loader, CollisionType, Shape, Text, Font, Label } from "excalibur";
//gameData class aangemaakt om hier alle data van het spel in te bewaren en ook gelijk de progress en de recources te updaten
// mn oude code van progress.js
export class gameData extends Event {

    recources
    progress
    maxValue

    constructor() {

        super()

        this.recources = 0
        this.progress = 0
        this.maxValue = 100

        addResources(number); {
            this.recources += number
        }

        updateProgress(number); {
            //pt
            this.progress += number
            //progress blijft tussen 0 en 100
            if (this.progress > this.maxValue) {
                this.progress = this.maxValue;
                console.log("Whoohoo");
            } else if (this.progress < 0) {
                this.progress = 0;
            }
            console.log(`Your progress is: ${this.progress}`);

            updateRecources();
            //showProgress()
        }

        updateRecources(number); {
            //recources
            this.recources += number;
            //als de recources groter zijn dan 0, dan kan de progress geupdate worden
            if (this.recources > 0) {
                this.progress += number;
                this.recources -= number;
                console.log(`Your recources are: ${this.recources}`);
            } else {
                console.log("Not enough resources to update progress");
            }
        }

        //progress laten zien
        // showProgress(); {
        //     console.log(`Your progress is: ${progress}`);
        // }


    }

}
