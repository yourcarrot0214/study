class Orange {
  private name = "Orange";
  constructor(private brix: number = 0) {}
  getName(): string {
    return this.name;
  }
  getBrix(): number {
    return this.brix;
  }
}

class Apple {
  private name = "Apple";
  constructor(private brix: number = 0) {}
  getName(): string {
    return this.name;
  }
  getBrix(): number {
    return this.brix;
  }
}

class Box<T> {
  constructor(private fruit: T) {}
  getFruit(): T {
    return this.fruit;
  }
}

const box: Box<Orange> = new Box(new Orange(5));
console.log(box.getFruit().getName());
console.log(box);

// Generic을 지정하지 않은 상태로 string 값을 넘겨주면 자동으로 <String> 추론 된다.
// 이에 stringBox는 compile을 pass하게 된다.
const stringBox = new Box("string");
// string이 가지고 있지 않은 getName() 메서드 호출로 compile error가 발생한다.
// console.log(stringBox.getFruit().getName());
console.log(stringBox);
