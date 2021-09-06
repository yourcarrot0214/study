# 커링과 조합 개념 공부하기

> 커링이란 '함수의 인자를 다시 구성하여 필요한 함수를 만드는 패턴'을 말합니다. 인자의 순서, 개수에 따라 비슷한 함수를 반복해서 작성해야 하는 부분을 커링을 이용하면 커링 패턴으로 묶인 함수들을 쉽게 유지, 보수할 수 있으므로 유용합니다.

```js
// currying을 통한 연산 함수 조합
const multiply = (a, b) => a * b;
const add = (a, b) => a + b;

const multiplyX = (x) => (a) => multiply(a, x);
const addX = (x) => (a) => add(x, a);

const addFour = addX(4);
const multiplyTwo = multiplyX(2);
const multiplyThree = multiplyX(3);

//  => ((x * 2) * 3) + 4
const formula = (x) => addFour(multiplyThree(multiplyTwo(x)));

console.log(formula(2));
// 16;
```

---

## 함수 조합 기법 알아보기

위 예제와 같은 방법으로 함수를 조합하면 적용 순서가 오른쪽에서 왼쪽 방향이므로 사람이 함수의 적용 흐름ㅇ을 한번에 이해하기 어렵다는 단점이 있습니다. 즉, 코드 가독성이 떨어집니다.

```js
//                                      <-- 함수가 실행되는 순서
const formula = (x) => addFour(multiplyThree(multiplyTwo(x)));
```

### 1. compose() 함수 만들어 보기

이런 실수를 유발하지 않기 위해서는 커링 함수를 순서대로 조합하는 `compose()` 함수를 만들어 사용하면 됩니다. <br>
배열 내장 함수인 `reduce()`를 활용하여 `compose()` 함수를 만들어 보도록 하겠습니다.

```js
const compose = (funcArr) =>
  funcArr.reduce(
    (prevFunc, nextFunc) => (value) => nextFunc(prevFunc(value)),
    (k) => k
  );

const formulaWithCompose = compose([multiplyTwo, multiplyThree, addFour]);

console.log(formulaWithCompose(2));
// 16
```

<br>
___

## 실무에서 사용하는 함수 조합 기법 알아보기

### 1. arguments를 사용하여 배열 인자 대신 나열형 인자로 함수 구조를 유연하게 만들기

앞에서 작성한 `compose()` 함수는 '함수의 인자 목록을 배열로 받을 수 있는 arguments'를 활용하여 다음과 같이 간결하게 수정할 수 있습니다.

```js
const compose = () => {
  const funcArr = Array.prototype.slice.call(arguments);
  return funcArr.reduce(
    (prevFunc, nextFunc) => (value) => nextFunc(prevFunc(value)),
    (k) => k
  );
};

const fomulaWithCompose = compose(multiplyTwo, multiplyThree, addFour);
```

- Array의 prototype 객체 안에 정의된 `slice()` 함수를 사용하여 나열형 자료를 배열로 변환합니다.
- 이후 `compose()` 함수에 인자를 전달할 때 배열값이 아닌 인자 항목을 원하는 만큼 전달해 조합하여 사용합니다.

<br>

### 2. arguments를 활용하여 하나의 실행 인자 value를 다중 인자로 사용 가능하게 확장하기

위 예제의 `compose()` 함수가 받아들이는 함수 목록의 함수들은 모두 인자를 1개만 받습니다. 여러 인자를 처리하는 함수를 `compose()` 함수가 조합해야 한다면 앞에서 사용한 arguments 변수와 nextFunc의 인자로 `apply()` 함수를 이용하면 인자를 여러 개 받아 처리하는 함수도 조합할 수 있습니다.

```js
const compose = () => {
  const funcArr = Array.prototype.slice.call(arguments);
  return funcArr.reduce(
    (prevFunc, nextFunc) => () => {
      const args = Array.prototype.slice.call(arguments);
      return nextFunc(prevFunc.apply(null, args));
    },
    (k) => k
  );
};
```

- `apply()` 함수는 인자에 전달된 배열을 전달받아 나열형 인자로 실행되도록 돕습니다.
  - 예를 들어 `prevFunc()` 함수가 3개의 인자를 전달받는 구조라면 args 변수에 [1, 2, 3]이 전달되면 `prevFunc([1, 2, 3])`이 할당될 것입니다.
- `apply()` 함수의 첫 번째 인자로 전달한 null은 함수에 포함된 this의 값을 정의합니다.

<br>

### 3. 전개 연산자로 더 간결하게 만들기

```js
const compose = (...funcArr) =>
  funcArr.reduce(
    (prevFunc, nextFunc) => (...args) => nextFunc(prevFunc(...args)),
    (k) => k
  );
```

<br>

### 4. 함수 조합 실행하기

```js
const fomulaWithCompose = compose(multiplyTwo, multiplyThree, addFour);

// compose 함수의 인자인 커링 함수의 인자를 수정하여 조합할 수도 있습니다.
const fomulaWithCompose = compose(multiplyX(2), multiplyX(3), addX(4));
```
