import { Car } from "./car";

export class Race{
    laps: number;
    distance: number;
    status: string;
    cars: Car[];

    constructor(){
        this.status = "NUEVA";
    }

    getTotalDistance(): number{
        return (this.distance * this.laps);
    }

    sortCars(x:Car, y:Car): number{
        if(x.currentDistance < y.currentDistance) return -1;
        if(x.currentDistance > y.currentDistance) return 1;
        return 0;
    }

    updatePositon(): void{
        this.cars = this.cars.sort(this.sortCars);
    }

    isOver(): boolean{
        let state = true;

        let totalDistance = this.getTotalDistance();

        this.cars.forEach((car) => {
            if(car.currentDistance < totalDistance){
                state = false;
            }
        })

        return state;
    }
}