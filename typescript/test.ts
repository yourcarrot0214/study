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
