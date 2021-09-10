interface SquareConfig {
  color: string;
  width?: number;
}

interface ReturnSquare {
  color: string;
  area: number;
}

function createSquare(config: SquareConfig): ReturnSquare {
  let newSquare = { color: "orange", area: 1000 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

let mySquare: ReturnSquare = createSquare({ color: "black", width: 100 });
let mySquare2 = createSquare({ color: "orange", opacity: 100 } as SquareConfig);

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (source, subString): boolean {
  let result = source.search(subString);
  return result > -1;
};
