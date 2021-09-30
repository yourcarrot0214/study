let add: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

let result: number = add(1, 2);
console.log(result);

let maAdd = (x: number, y: number) => x + y;

function buildName(firstName: string, lastName?: string) {
  return `${firstName} ${lastName}`;
}

let username = buildName("wilted");
console.log(username);

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

type Job = "developer" | "marketer" | "degisner";
type User = {
  name: string;
  job: Job;
};

const user1: User = {
  name: "Carrot",
  job: "developer",
};

const user2: User = {
  name: "Wilted",
  job: "marketer",
};

function getSize<T>(arr: T[]) {
  return arr.length;
}

let stringArray: string[] = ["a", "b", "c"];
let objectArray: object[] = [{}, {}, {}];

getSize<object>(objectArray);
getSize<string>(stringArray);

interface Mobile<T> {
  name: string;
  price: number;
  option: T;
}

interface Option {
  color: string;
  version: number;
}

const apple: Mobile<Option> = {
  name: "iPhone",
  price: 990,
  option: {
    color: "red",
    version: 13,
  },
};

const samsung: Mobile<string> = {
  name: "galaxy",
  price: 990,
  option: "getting ready",
};

interface User {
  name: string;
  age: number;
}

interface Car {
  name: string;
  color: string;
}

interface Book {
  price: number;
}

const user: User = { name: "Carrot", age: 35 };
const car: Car = { name: "Tesla", color: "white" };
const book: Book = { price: 39000 };

function printName<T extends { name: string }>(data: T): string {
  return data.name;
}

printName(user);
printName(car);
printName(book);
