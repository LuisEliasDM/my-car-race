import { Pilot } from "./pilot";
import { Race } from "./race";

export class Car{
    carNumber: number;
    color: string;
    currentDistance: number;
    status: string;
    pilot?: Pilot;

    constructor(){
        this.currentDistance = 0;
        this.status = "DETENIDO";
    }

    start(race: Race):void{
        this.status = "AVANZANDO";
        this.updateDistance(Car.generateRandomNumber(), race);
    }

    updateDistance(randomNumber: number, race: Race):void{
        if(this.currentDistance >= race.getTotalDistance()){
            this.currentDistance += 50
        }else{
            this.currentDistance += randomNumber;
        }
    }

    stop():void{
        this.status = "DETENIDO";
    }

    static generateRandomNumber(){
        let number = Math.ceil(Math.random()*50);
        return number;
    }

}