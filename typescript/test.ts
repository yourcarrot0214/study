enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

let c: Color = Color.Blue;
console.log(c);

function error(message: string): never {
  throw new Error(message);
}

let someValue1: any = "this is a string";

let strLength1: number = (<string>someValue).length;
