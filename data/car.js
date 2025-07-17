class Car {
  #brand;
  #model;

  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(
      `${this.#brand} ${this.#model}, speed: ${
        this.speed
      } km/h, Trunk: ${trunkStatus}`
    );
  }

  go() {
    if (this.isTrunkOpen === true) {
      console.log("close trunk before moving");
    } else {
      if (this.speed + 5 > 200) {
        this.speed = 200;
      } else {
        this.speed += 5;
      }
    }
  }

  break() {
    if (this.speed - 5 < 0) {
      this.speed = 0;
    } else {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    } else {
      console.log("can not open trunk while in motion");
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });

car1.displayInfo();

//
//
class RaceCar extends Car {
  acceleration;

  constructor(CarDetails) {
    super(CarDetails);
    this.acceleration = CarDetails.acceleration;
  }

  go() {
    if (this.speed + this.acceleration > 300) {
      this.speed = 300;
    } else {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {
    console.log("RaceCar has no Trunk");
  }

  closeTrunk() {
    console.log("RaceCar has no Trunk");
  }
}

const raceCar1 = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});

console.log(raceCar1);

raceCar1.go();
raceCar1.openTrunk();

raceCar1.displayInfo();

let info = {
  name: "hey",
  age: 30,
  type: ["weed", "beans"],
};
