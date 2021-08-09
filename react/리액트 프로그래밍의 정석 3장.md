# 컴포넌트를 표현하는 JSX

JSX는 JavaScript XML의 줄임말로 **자바스크립트에 XML을 추가한 확장형 문법** 으로 이해하면 됩니다.
하나의 파일에 자바스크립트와 HTML을 동시에 작성할 수 있습니다.

```js
import React from "react";

function App() {
  return (
    <>
      <h1>Hello React!</h1>
      <div>React Component</div>
    </>
  );
}

export default App;
```

## JSX의 작동 원리

리액트 엔진은 JSX의 XML 구조를 분석하여 자바스크립트 함수 코드로 변환합니다.
위 예제의 `<div>React Component</div>` 부분은 아래와 같이 변환됩니다.

```js
React.createElement("div", null, "React Component");
```

리액트를 사용하면 이런 과정들을 알 필요 없이 JSX로 화면을 빠르게 구성할 수 있습니다.
개발자는 JSX만 작성하고, 리액트 엔진은 JSX를 기존 자바스크립트로 해석하는 역할만 수행합니다.
이것을 `선언형 화면(Declarative View)` 기술이라 부릅니다.

---

# 컴포넌트와 구성 요소

> 리액트로 작성된 화면은 컴포넌트만으로 구성되어 있습니다.

## 컴포넌트의 개념

기존의 웹 프레임워크는 MVC 방식으로 정보, 화면, 구동 코들르 분리하여 관리했습니다.
정보담당을 모델(Model), 화면 담당을 뷰(View), 구동 담당을 컨트롤러(Controller)라고 부르며 **코드 관리를 효율적으로 할 수 있다**는 장점이 있으나 **MVC 각 요소의 의존성이 높아** 재활용이 어렵다는 단점이 있습니다.

컴포넌트의 등장 배경은 웹 사이트의 화면이 각 요소가 비슷하고 반복적으로 사용한 경우가 많다는 데 있습니다. 컴포넌트는 MVC의 뷰를 독립적으로 구성하여 재사용할 수 있고 컴포넌트를 통해 새로운 컴포넌트를 쉽게 만들 수도 있습니다.

컴포넌트를 조합해 화면을 구성한다고 생각하시면 되겠습니다.

## 컴포넌트의 주요 구성 요소

### 프로퍼티

상위 컴포넌트에서 하위 컴포넌트로 전달되는 **읽기 전용 데이터** 입니다.

### state

컴포넌트의 상태를 저장하고 변경할 수 있는 데이터입니다.

### 컨텍스트

부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에 전달하는 데이터입니다.

---

# 컴포넌트에 데이터를 전달하는 프로퍼티

> 프로퍼티는 상위 컴포넌트가 하위 컴포넌트에 값을 전달할 때 사용합니다. 이때 프로퍼티값은 수정할 수 없다는 특징이 있습니다.

## 프로퍼티 기초

다음은 부모 컴포넌트인 App 컴포넌트에서 name이라는 프로퍼티를 자식 컴포넌트인 UserName 컴포넌트에 전달한 예제 입니다.
name과 같이 속성(attribute) 형태로 전달되는 값을 프로퍼티라고 합니다.

```js
function App() {
  return (
    <>
      <UserName name='Carrot' />
    </>
  );
}
```

여기서 중요한 점 두 가지는 **프로퍼티가 상위 컴포넌트에서 하위 컴포넌트로 전달된다**는 것과 **프로퍼티는 상위에서 하위 단방향으로 흐른다** 입니다.

## 프로퍼티의 다양한 사용 방법

프로퍼티에서는 자바스크립트의 모든 자료형을 사용할 수 있습니다. 이때 프로퍼티의 자료형은 미리 선언해 주는 것이 좋습니다.
프로퍼티의 자료형을 미리 선언하면 리액트 엔진이 프로퍼티로 전달하는 값의 변화를 효율적으로 감지할 수 있고, 개발자가 실수로 지정되지 않은 자료형을 프로퍼티에 전달하려고 할 때 경고 메시지로 알려주기 때문에 버그 예방에도 좋습니다.

프로퍼티의 자료형 선언은 리액트에서 제공하는 `prop-types`를 이용하면 됩니다.

```js
import React from "react";
import PropTypes from "prop-types";

const UserName = ({ name }) => {
  return (
    <>
      <div>{name}</div>
    </>
  );
};

// 자료형 선언
UserName.propTypes = {
  name: PropTypes.string,
};

export default UserName;
```

프로퍼티의 데이터 타입에 따라 다양한 자료형 선언을 해줄 수 있습니다.
자료형 선언은 `프로퍼티명 : 프로퍼티 타입`으로 해주면 됩니다.

```js
UserName.propTypes = {
  boolValue: PropTypes.bool,
  numberValue: PropTypes.number,
  arrayBalue: PropTypes.arrayOf(PropTypes.number),
  objectValue: PropTypes.object,
  nodeValue: PropTypes.node,
  functionValue: PropTypes.func,
};
```

객체 프로퍼티에 다양한 데이터 타입의 값이 포함되어 있다면 `PropTypes.shape`을 사용하여 각각의 키값에 맞는 데이터 타입을 선언해 줄 수 있습니다.

```js
UserName.propTypes = {
  objectValue: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};
```

특정 컴포넌트에 꼭 전달되어야 하는 필수 프로퍼티가 있다면 `isRequired`를 사용하면 됩니다.

```js
UserName.propTypes = {
  objectValue: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),

  defaultValue: PropTypes.string.isRequired,
};
```

프로퍼티에 기본값을 지정하려면 `defaultProps`를 이용하면 됩니다.

```js
UserName.defaultProps = {
  name: "Carrot",
};
```

---

# 컴포넌트 상태 관리하기

> 값을 변경해야 하는 데이터를 다룰 경우 state를 사용합니다.

## state로 상태 관리하기

state는 **값을 저장하거나 변경할 수 있는 객체**로 보통 버튼을 클릭하거나 값을 입력하는 등의 이벤트와 함께 사용됩니다.

```js
import React from "react";

class StateExample extends React.component {
  constructor(props) {
    super(props);

    // state 정의
    this.state = {
      loading: true,
      formData: "no data",
    };

    this.handleData = this.handleData.bind(this);

    setTimeout(this.handleData, 4000);
  }

  handleData() {
    const data = "new data";
    const { formData } = this.state;

    // state 변경
    this.setState({
      loading: false,
      formData: data + formData,
    });

    console.log(`loading값은 ${this.state.loading} 입니다.`);
  }

  render() {
    return (
      <div>
        <span>로딩중 : {String(this.state.loading)}</span>
        <span>결과 : {this.state.formData}</span>
      </div>
    );
  }
}

export default StateExample;
```

state를 사용할 때 주의할 점은 다음과 같습니다.

1. 생성자(constructor)에서 반드시 초기화 해야 합니다.
2. state값을 변경할 때는 **setState()함수**를 반드시 상용해야 합니다.
3. setState() 함수는 비동기로 처리되며, setState()코드 이후로 연결된 함수들의 실행이 완료된 시점에 화면 동기화 과정을 거칩니다.

### state값은 setState() 함수로 변경해야 합니다.

state값을 직접 변경하면 안 되는 이유는 render() 함수로 화면을 그려주는 시점은 리액트 엔진이 정하기 때문입니다. 직접 state값을 변경해도 render() 함수는 새로 호출되지 않고 setState() 함수를 호출하여 state값을 변경해야 리액트 엔진이 자동으로 render() 함수를 호출하므로 화면에 변경된 state값을 새롭게 출력할 수 있습니다.

### setState() 함수의 인자로 함수를 전달하면 이전 state값을 쉽게 읽을 수 있습니다.

```js
handleData(data) {
    this.setState((prev) => ({
        loading: false,
        formData: data + prev.formData
    }))
}
```

---

# 컴포넌트의 생명주기

> 컴포넌트의 생성부터 소멸까지의 과정을 컴포넌트의 생명주기(LifeCycle)라고 부릅니다. 컴포넌트는 생명주기마다 함수를 가지고 있는데 이 함수들을 이용하면 특정 시점에 원하는 동작을 하도록 만들 수 있습니다.

## 생명주기 함수 살펴보기

<img src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F999512335C49891D19D458" />

- 생명주기 함수는 render() 함수를 포함하여 총 8종의 함수가 있습니다.
- 생명주기 함수는 리액트 엔진이 자동으로 호출합니다.
- 컴포넌트가 생성될 때 4개의 생명주기 함수가 호출됩니다.
  - constructor
  - getDerivedStateFromProp
  - render
  - componentDidMount
- 컴포넌트 생성 후 갱신 완료(업데이트)까지 5개의 생명주기 함수가 호출됩니다.
  - getDerivedStateFromProp
  - shouldComponentUpdate
    - 이 함수의 반환값이 true일 경우 이후 과정이 진행되고 false일 경우 이후 과정이 모두 생략됩니다.
  - render
  - getSnapshotBeforeUpdate
  - componentDidUpdate
- 컴포넌트 갱신완료 후 소멸(제거될 때) 완료까지 1개의 생명주기 함수가 호출됩니다.
  - componentWillUnmount

### constructor(props) 함수

- 맨 처음 생성될 때 한 번만 호출되며, 상태(state, 객체 변수)를 선언할 때 사용됩니다.
- constructor() 함수를 정의할 때는 **항상 super() 함수를 가장 위에 호출해야 합니다.**
- super() 함수는 프로퍼티와 생명 주기 상태 등을 초기화하는 중요한 과정을 포함하고 있습니다.

```js
constructor(props) {
    super(props);
    // 이후 추가적인 state data 혹은 변수를 선언합니다.
}
```

### render() 함수

- 데이터가 변경되어 새 화면을 출력해야 할 때 자동으로 호출되는 함수입니다.
- render() 함수가 반환하는 JSX를 화면에 그려줍니다.

### static getDerivedStateFromProps(props, state) 함수

- 정적 함수입니다. 따라서 함수 안에서 this.props나 this.state와 같은 방법으로 접근할 수 없습니다.
- 값에 접근해야 하는 경우 반드시 인자로 전달된 props, state를 이용해야 합니다.
- 이때 props는 상위 컴포넌트에서 전달받은 프로퍼티로 state값을 연동할 때 주로 사용되며, 반환 값으로 state를 변경합니다.

### componentDiddMount() 함수

- rendder() 함수가 JSX를 화면에 출력한 이후 호출되는 함수입니다.
- 컴포넌트가 화면에 모두 출력된 이후 해야하는 작업들은 여기서 하면 됩니다.

### shouldComponentUpdate(nextProps, nextState) 함수

- 프로퍼티를 변경하거나 setState() 함수를 호출하여 state값을 변경하면 **화면을 새로 출력해야 하는지** 판단하는 함수입니다.
- 이 함수는 화면을 새로 출력할지 여부를 판단하며, 데이터 변화를 비교하는 작업을 포함하므로 리액트 성능에 영향을 많이 줍니다.
- 화면 변경을 위해 검증 작업을 해야하는 경우 이 함수를 사용하면 됩니다.
- 내장 함수인 forceUpdate() 함수를 호출하여 화면을 출력하면 이 함수는 호출되지 않습니다.

### getSnapshotBeforeUpdate(prevProps, prevState) 함수

- 컴포넌트의 변경된 내용이 가상 화면에 완성된 이후 호출되는 함수입니다.
- 이 함수는 컴포넌트가 화면에 실제로 출력되기 전에 호출되므로 화면에 출력될 엘리먼트의 크기 또는 스크롤 위치 등의 **DOM 정보에 접근할 때 사용** 됩니다.

### componentDidUpdate(prevProps, prevState, snapshot) 함수

- 컴포넌트가 실제 화면에 출력된 이후 호출되는 함수입니다.
- 이 함수는 부모 컴포넌트로부터 전달된 이전 프로퍼티(prevProps)와 이전 state값(prevState)과 함께 getSnapshotBeforeUpdate() 함수에서 반환된 값(snapshot)을 인자로 전달받습니다.
- 이 값들을 이용하여 스크롤 위치를 옮기거나 커서를 이동시키는 등의 **DOM 정보를 변경할 때 사용** 됩니다.

### componentWillUnmount() 함수

- 컴포넌트가 소멸되기 직전에 호출되는 함수입니다.
- 보통 컴포넌트에서 감시하고 있는 작업들을 해제할 때 필요한 함수입니다.
  - 예를 들어 컴포넌트에서 setInterval() 함수가 사용되었다면, 이 함수에서 clearInterval() 함수로 해제해 주어야 합니다.
  - 이러한 해제 작업이 생략되면 메모리 누수 현상이 발생하여 웹 브라우저의 작동이 멈추기도 합니다.

---

## 생명주기 함수의 실행 과정 살펴보기

### 생성 과정의 생명주기 함수들 실행

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root));
```

- index.js 파일의 ReactDOM.render() 함수가 실행되면 App 컴포넌트의 최초 생명주기 함수인 constructor()가 실행됩니다.
- App 컴포넌트가 포함한 자식 컴포넌트 역시 독립적인 생명주기를 가집니다.

```js
// App 컴포넌트의 자식 컴포넌트 LifecycleExample
import React from "react";

class LifecycleExample extends React.component {
  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps() 호출");
    return {};
  }

  constructor(props) {
    super(props);
    // getDerivedStateFromProps() 함수를 사용하므로
    // 경고 메시지를 건너 뛰기 위해 state 초기값을 설정합니다.
    this.state = {};
    console.log("constructor() 호출");
  }

  componentDidMount() {
    console.log("componentDidMount() 호출");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate() 호출");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount() 호출");
  }

  getSnapshotBeforeUpdate() {
    console.log("getSnapshotBeforeUpdate() 호출");
    return {};
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate() 호출");
    return true;
  }

  render() {
    console.log("render() 호출");
    return null;
  }
}

export default LifecycleExample;
```

App 컴포넌트에서 `<LifecycleExample />`를 포함시켜 리액트 서버를 구동해 보면 생명주기 함수에 있는 console.log 메시지를 확인할 수 있습니다.

```js
// console
"constructor() 호출";
"getDerivedStateFromProp() 호출";
"render() 호출";
"componentDidMount() 호출";

```

컴포넌트 생명주기의 실행 과정은 다음과 같습니다.
|컴포넌트 생성|
|--|
|1. constructor|
|2. getDerivedStateFromProps|
|3. render|
|4. componentDidMount|
|컴포넌트 생성 완료|

### 변경 과정의 생명주기 함수들 실행

변경 과정의 생명주기 함수들은 **상위 컴포넌트의 프로퍼티나 state의 변화가 생기면 실행** 됩니다. <br>
`<LifecycleExample />` 컴포넌트의 componentDidMount() 함수에 setState() 함수를 사용하여 state값을 변경해 봅시다.

```js
// LifecycleExample.jsx
componentDidMount() {
    console.log('componentDidMount() 호출');
    this.setState({updated: true});
}
```

```
// console
constructor() 호출
getDerivedStateFromProps() 호출
render() 호출
componentDidMount() 호출
getDerivedStateFromProps() 호출
shouldComponentUpdate() 호출
render() 호출
getSnapshotBeforeUpdate() 호출
componentDidUpdate() 호출
```

- 생성 과정의 마지막 단계인 componentDidMount() 함수에 setState() 함수를 호출하여 state를 변경했습니다.
- 변경 과정은 shouldComponentUpdate() 함수의 반환값이 true인 경우 진행되므로 변경 과정의 모든 생명주기 함수들의 호출 과정을 확인할 수 있습니다.
- componentDidMount() 호출 메시지 이후 내용들이 setState() 함수 호출 이후에 실행되는 생명주기 함수가 출력하는 내용입니다.

이번에는 shouldComponentUpdate() 함수의 반환값이 false 일때의 과정을 살펴봅시다.

```js
// LifecycleExample.jsx
shouldComponentUpdate() {
    console.log('shouldComponentUpdate() 호출');
    return false;
}
```

```
// console
constructor() 호출
getDerivedStateFromProps() 호출
render() 호출
componentDidMount() 호출
getDerivedStateFromProps() 호출
shouldComponentUpdate() 호출
```

shouldComponentUpdate() 함수의 반환값이 false 이므로 **리액트 엔진은 데이터 비교 후 변경 사항이 없다**고 판단하여 이후 변경 과정의 생명주기 함수가 실행되지 않습니다.<br>
만약 shouldComponentUpdate() 함수의 결과값과 상관없이 화면 동기화 과정을 진행하고 싶다면 componentDidMount() 함수에 `this.forceUpdate()` 함수를 호출하면 됩니다.

| 변경 생명주기 실행 과정  | 비고                               |
| ------------------------ | ---------------------------------- |
| 생성완료                 | forceUpdate() 실행시 render로 이동 |
| getDerivedStateFromProps |
| shouldComponentUpdate    | 반환값이 false이면 갱신 완료       |
| render                   |
| getSnapshotBeforeUpdate  |
| componentDidUpdate       |
| 갱신완료                 |

---

### 소멸 과정의 생명주기 함수들 실행

소멸 과정은 컴포넌트가 화면에서 생략되면 시작됩니다.<br>
소멸 과정의 생명주기 함수를 실행해 보기 위해 App 컴포넌트를 다음과 같이 변경하겠습니다.

```js
// App.jsx
import React from 'react';
import LifecycleExample from './LifecycleExample.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasDestroyed : false
        }
    }

    componentDidMount() {
        this.setState({hasDestroyed: true};)
    }

    render() {
        return (
            <>
                {this.state.hasDestroyed ? null : <LifecycleExample />}
            </>
        )
    }
}

exrpot default App;
```

```
// console
constructor() 호출
getDerivedStateFromProps() 호출
render() 호출
componentDidMount() 호출
componentWillUnmount() 호출
```

- componentDidMount() 호출 뒤 setState() 함수로 state값을 변경하여 LifecycleExample 컴포넌트가 출력되지 않도록 코드를 작성하였습니다.
- 이후 콘솔창에서와 같이 곧바로 componentWillUnmount() 함수가 호출되었음을 확인할 수 있습니다.

| 소멸 생성주기 실행 과정 |
| ----------------------- |
| 생성&갱신 완료          |
| componentWililUnmount   |
| 소멸 완료               |

[code sandbox ] : (https://codesandbox.io/s/lifecycleexample-dcre1)

---

# 클래스형 컴포넌트

> 클래스형 컴포넌트는 두 종류의 클래스(Component, PureComponent)를 사용합니다.

## Component 알아보기

Component 클래스는 프로퍼티, state와 생명주기 함수가 들어있는 구조의 컴포넌트를 만들 때 사용합니다.<br>

```js
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    spuer(props);
    console.log('생성 함수');
  }

  componentDidMount() {
    // 상속받은 생명주기 함수
  }

  myMethod() {
    // 추가 확장 함수
  }

  render() {
    // 상속받은 화면 출력 함수
  }
}

exrpot default MyComponent;
```

## PureComponent 알아보기

PureComponent 클래스는 Component 클래스를 상속받은 클래스 입니다. <br>
PureComponent 클래스는 shouldComponentUpdate() 함수를 **얕은 비교**를 하도록 재정의했습니다.<br>
PureComponent 클래스로 만들어진 컴포넌트는 **얕은 비교를 통해 데이터가 변경된 경우**에만 render() 함수를 호출합니다.<br>
반면, Component 클래스로 만들어진 컴포넌트는 항상 render() 함수를 호출합니다. <br>

### 검증 비교를 위한 얕은 비교 알아보기

> ==, ===, shallowEqual() 함수를 이용해 얕은 비교와 그렇지 않은 비교의 차이점을 알아봅니다.

```js
import shallowEqual from "shallow-equal";

const obj = { name: "carrot" };
const myList = [1, 2, 3, obj];
const list1 = [1, 2, 3, obj];
const list2 = [1, 2, 3, { name: "carrot" }];
```

```js
// 1. 깊은 비교 ===
console.log(myList === list1); // false
```

- myList와 list1은 같은 요소를 가지고 있지만 각각 새롭게 정의된 배열이므로 false 입니다.

```js
// 2. 얕은 비교 shallowEqual()
shallowEqual(myList, list1); // true
shallowEqual(list1, list2); // false
```

- list2의 경우 같은 내용을 포함하고 있지만 새 객체이기 때문에 결과는 false 입니다.

얕은 비교를 사용하는 이유는 **비교 검사 작업이 성능에 영향을 끼치기 때문**입니다.

- PureComponent 클래스로 선언한 컴포넌트에서는 `shouldComponentUpdate()` 함수에서 `shallowEqual()` 함수로 얕은 비교를 하여 데이터의 변경이 있으면 화면을 새로 출력하고, Component 클래스로 선언한 컴포넌트는 이러한 비교 과정 없이 항상 새로 출력합니다.

### PureComponent와 불변 변수로 성능을 높입니다.

- 에어비앤비는 1000개가 넘는 숙소 정보를 화면에 출력합니다. 그런데 한 곳의 숙소 예약이 가득차게 되어 1개의 정보만 바뀔 수도 있습니다.
- 1개의 숙소 정보가 바뀔 때마다 999개의 숙소 정보를 비교하면 비효율적이겠죠.
- 이런 경우 불변 변수를 활용해 숙소 정보가 바뀔 때마다 새 배열을 할당하는 방식으로 비교 속도를 최적화할 수 있습니다.

---

# 함수형 컴포넌트

> state가 없는 함수형 컴포넌트(Stateless Functional Component)

## 함수형 컴포넌트의 구조

- 함수와 동일한 구조를 가지고 있습니다.
- 데이터(프로퍼티, 컨텍스트)를 입력받아 함수형 컴포넌트 내부에서 일련의 작업이 이루어진 뒤 출력할 컴포넌트를 JSX 형식으로 반환합니다.

```js
// 함수형 컴포넌트
import React from "react";
import PropTypes from "prop-types";

function SFC(props, context) {
  // class component의 this.propsㅇ와 동일합니다.
  const { somePropValue } = props;

  // context는 부모컴포넌트가 가질 수 있는 state입니다.
  const { someContextValue } = context;

  return <h1>Hello, {comePropValue}</h1>;
}

SFC.propTypes = { somePropValue: PropTypes.any };
SFC.defaultProps = { somePropValue: "default value" };

export default SFC;
```

- 함수형 컴포넌트에는 클래스 선언이 없습니다.
- 상위 컴포넌트로부터 전달받은 프로퍼티와 컨텍스트만을 이용하여 화면을 구성합니다.
- **state와 생명주기 함수를 사용할 수 없습니다.**
- 단순한 구조의 UI 컴포넌트를 제작할 때 많이 사용됩니다.

---

# 배열 컴포넌트

> 같은 형태에서 내용만 다른 (게시판, 유튜브 영상목록, 투두리스트 등) 컴포넌트를 출력할 때 배열 컴포넌트를 사용합니다.

```js
import React from "react";
import Task from "./Task";

class TodoList extends React.Component {
  render() {
    const todoList = [
      { taskname: "react study", status: "false" },
      { taskname: "node study", status: "true" },
    ];

    // map() 함수 사용시 React.Fragment(<></>)를 생략할 수 있습니다.
    return todoList.map((todo) => <Task key={todo.taskname} taskInfo={todo} />);
  }
}

export default TodoList;
```

- 배열에는 다양한 자료형을 저장할 수 있습니다. node, JSX도 마찬가지로 배열에 저장할 수 있습니다.
- 배열 컴포넌트의 경우 배열 요소의 개수만큼 반복하므로 성능에 영향을 많이 줍니다.
  - 따라서 **배열 컴포넌트에는 key값을 꼭 정의해 주어야 합니다.**
  - 키값을 정의하여 출력한 컴포넌트는 재출력시 리액트 엔진이 기존의 컴포넌트를 재활용하여 성능을 높일 수 있기 때문입니다.
  - `render()` 함수에서 여러개의 JSX 노드를 반환하기 위해서는 최상위 노드로 감싸주어야 합니다.
    - 일반적으로 의미를 가지지 않는 React.Fragment 태그(<React.Fragment> 또는 <></>)를 사용합니다.

---

# 컴포넌트에서 콜백 함수와 이벤트 처리하기

> 하위 컴포넌트에서 프로퍼티를 변경할 때는 프로퍼티 원본을 수정할 수 있는 함수를 하위 컴포넌트에 제공하면 됩니다.

## 콜백 함수로 프로퍼티 수정하기

```js
import React from "react";
import Count from "./Count";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };

    this.increaseCount = this.increaseCount.bind(this);
  }

  increaseCount() {
    this.setState(({ count }) => ({ count: count + 1 }));
  }

  render() {
    return <Counter count={this.state.count} onAdd={this.increaseCount} />;
  }
}
```

- App 컴포넌트에서 Counter 컴포넌트의 프로퍼티로 onAdd를 추가합니다.
- Counter 컴포넌트에서는 프로퍼티로 전달받은 onAdd 함수를 통해 상위 컴포넌트인 App 컴포넌트의 state값을 변경할 수 있습니다.

## 컴포넌트에서 DOM 객체 함수 사용하기

> 컴포넌트에서 window.addEventListener() 함수와 같은 DOM 객체 함수를 사용하려면 DOM 객체를 컴포넌트 변수에 할당해야 합니다. 이때 특수 프로퍼티인 ref를 사용합니다.

- ref 프로퍼티는 `document.getElementById()`가 반환하는 객체를 반환합니다.
- 단 ref 프로퍼티는 DOM 객체 함수가 필요한 엘리먼트에 콜백 함수 형태로 전달됩니다.

다음 예제는 화면에서 스크롤 위치를 측정해 현재 컴포넌트의 위치가 화면 안에 있는지 알려주는 컴포넌트 입니다.<br>
div 엘리먼트에 setRef() 함수를 콜백 함수 형태로 전달한 부분을 확인할 수 있습니다.

```js
import React from "react";

export default class ScrollSpy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.checkPosition = this.checkPosition.bind(this);
    // 윈도우의 스크롤 이동 이벤트를 감지하여 checkPosition() 함수가 실행되도록 합니다.
    windddow.addEventListener("scroll", this.checkPosition);
  }

  setRef(ref) {
    // ref 프로퍼티에서 반환된 객체를 컴포넌트 변수에 할당합니다.
    this.ref = ref;
  }

  checkPosition() {
    // 현재 DOM 객쳉의 위치가 스크롤 화면 안팎인지 측정합니다.
    if (this.ref.getBoundingClientRect().top < window.innerHeight) {
      console.log("enter");
    } else {
      console.log("exit");
    }
  }

  componentDidMount() {
    this.checkPosition();
  }

  componentWillUnmount() {
    // 컴포넌트가 소멸할 때 화면 스크롤 감시 함수를 메모리에서 제거합니다.
    window.removeEventListener("scroll", this.checkPosition);
  }

  render() {
    return <div ref={this.setRef} />;
  }
}
```

- 위 예제와 같은 코드는 페이스북에서 스크롤을 내릴 때 자동으로 다음 페이지 목록을 추가할 때 사용합니다.
- 화면 스크롤이 변화할 때마다 객체 함수의 위치를 읽어 현재 위치가 화면 안팎인지 측정하고 있습니다.
- checkPosition() 함수의 `console.log('enter')`에 해당하는 부분에 다음 페이지 목록을 추가하는 코드를 구현하면 스크롤이 내려갈 때마다 자동으로 당음 페이지 목록이 추가되도록 구현할 수 있습니다.

## 컴포넌트에서 DOM 이벤트 사용하기

- 컴포넌트에서 출력된 특정 DOM 객체에 이벤트 컴포넌트가 반응하기 위해서는 DOM 이벤트 프로퍼티를 사용해야 합니다.
- 이벤트 프로퍼티는 특수 프로퍼티로 콜백 함수 형태로 전달해 처리합니다.
- 다음은 자주 쓰는 이벤트 이름과 DOM 이벤트 프로퍼티를 정리한 표입니다.

| 이벤트 이름 | 이벤트 호출 시점                                | JSX DOM 이벤트 프로퍼티 |
| ----------- | ----------------------------------------------- | ----------------------- |
| click       | 엘리먼트의 마우스나 키보드가 클릭될 때          | onClick                 |
| submit      | 폼의 데이터가 전송될 때                         | onSubmit                |
| mousemove   | 엘리먼트 위에서 마우스 커서가 움직일 때         | onMouseMove             |
| mouseover   | 엘리먼트 영역 위로 마우스 커서가 돌아다닐 때    | onMouseOver             |
| mouseout    | 엘리먼트 위에 있던 마우스 커서가 영역을 떠날 때 | onMouseOut              |
| keydown     | 키보드 버튼이 눌렸을 때                         | onKeyDown               |
| keypress    | 키보드 버튼 입력이 완료되었을 때                | onKeyPress              |

<br>

## 단방향 흐름 방식 개념 정리

- 리액트는 프로퍼티, state와 같은 데이터를 상위 컴포넌트에서 하위 컴포넌트 방향으로 전달합니다.
- 만약 데이터 변경이 필요한 경우 콜백 함수를 호출하여 원본 데이터가 위치한 상위 컴포넌트에서 데이터를 변경하고 다시 자식 컴포넌트로 전달하도록 합니다.
- 단방향 흐름 방식은 원본 데이터의 무결성을 지켜주므로 데이터 수정으로 인한 데이터 파편화를 줄여줍니다.
  <br>

# Input 컴포넌트 만들면서 복습하기

```js
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;
    if (onChange) {
      onChange(name, event.target.value);
    }
  }

  componentDidMount() {
    // autoFocus값이 true일 경우 출력 후 input 박스에 자동으로 커서를 배치합니다.
    if (this.props.autoFocus) {
      this.ref.focus();
    }
  }

  componentDidUpddate() {
    if (this.props.autoFocus) {
      this.ref.focus();
    }
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    const { errorMessage, label, name, value, type, onFocus } = this.props;
    return (
      <label>
        {label}
        <input
          id={`input_${name}`}
          ref={this.ref}
          onChange={this.handleChange}
          onFocus={onFocus}
          value={value}
          type={type}
        />
        {errorMessage && <span className='error'>{errorMessage}</span>}
      </label>
    );
  }
}

Input.propTypes = {
  // 문자열 데이터형의 값 'text, number, price 중 하나의 값만 가질 수 있습니다.
  type: PropTypes.oneOf(["text", "number", "price"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.onOfType([PropTypes.number, PropTypes.string]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  autoFocus: false,
  type: "text",
};

export default Input;
```
___