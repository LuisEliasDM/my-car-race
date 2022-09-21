import { Component } from '@angular/core';
import { Car } from './models/car';
import { Pilot } from './models/pilot';
import { Race } from './models/race';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'My car race';

    constructor(){
        let race = this.getRace()

        this.startRace(race);

        do{
            this.showPosition(race);
        }while(race.status != "TERMINADA")

        const {pilot, carNumber} = race.cars[0]

        if(pilot != null){
            const {name, firstSurname, secondSurname, nationality} = pilot
            let pilotData: any = {
                name: `${name} ${firstSurname} ${secondSurname??''}`,
                nationality: nationality,
                carNumber: carNumber,
            }
            console.log("PILOTO GANADOR")
            console.log(pilotData)
        }

    }

    startRace(race: Race){
        if(race.status != "NUEVA") return

        race.cars.forEach( (car) => {
            car.start(race)
        });

        race.status = "EN_PROCESO";
    }

    showPosition(race: Race){
        this.updateRace(race);
        console.log(race.status);

        let carsPosition: any[] = []
        race.cars.forEach((car, index) => {
            const {pilot, carNumber} = car

            if(pilot != null){
                const {name, firstSurname, secondSurname, nationality} = pilot
                let pilotData = {
                    position: index+1,
                    name: `${name} ${firstSurname} ${secondSurname??''}`,
                    nationality: nationality,
                    carNumber: carNumber,
                }
                carsPosition.push(pilotData);
            }
        })

        console.table(carsPosition);
    }

    updateRace(race: Race){
        if(race.status != "EN_PROCESO") return

        race.cars.forEach( (car) => {
            car.updateDistance(Car.generateRandomNumber(), race);
        });

        race.updatePositon();

        if(race.isOver()){
            race.status = "TERMINADA";
        }
    }

    getRace(): Race{
        let cars = this.getCars()

        let race = new Race();
        race.laps = 3;
        race.distance = 136;
        race.cars = cars;

        return race;
    }

    getCars(): Car[]{
        let pilots = this.getPilots();
        let cars = []

        let car1 = new Car();
        car1.carNumber = 1;
        car1.color = "RED";
        car1.pilot = pilots[0];
        cars.push(car1);

        let car2 = new Car();
        car2.carNumber = 2;
        car2.color = "BLUE";
        car2.pilot = pilots[1];
        cars.push(car2);

        let car3 = new Car();
        car3.carNumber = 3;
        car3.color = "YELLOW";
        car3.pilot = pilots[2];
        cars.push(car3);

        let car4 = new Car();
        car4.carNumber = 4;
        car4.color = "GREEN";
        car4.pilot = pilots[3];
        cars.push(car4);

        return cars;
    }

    getPilots(): Pilot[]{
        let pilots = []

        let pilot1 = new Pilot();
        pilot1.id = 1;
        pilot1.name = "PILOT";
        pilot1.firstSurname = "NUMBER 1";
        pilot1.nationality = "MEXICAN";
        pilots.push(pilot1);

        let pilot2 = new Pilot();
        pilot2.id = 2;
        pilot2.name = "PILOT";
        pilot2.firstSurname = "NUMBER 2";
        pilot2.nationality = "CANADIAN";
        pilots.push(pilot2);

        let pilot3 = new Pilot();
        pilot3.id = 3;
        pilot3.name = "PILOT";
        pilot3.firstSurname = "NUMBER 3";
        pilot3.nationality = "CHINESE";
        pilots.push(pilot3);

        let pilot4 = new Pilot();
        pilot4.id = 4;
        pilot4.name = "PILOT";
        pilot4.firstSurname = "NUMBER 4";
        pilot4.nationality = "ITALIAN";
        pilots.push(pilot4);

        return pilots;
    }

}
