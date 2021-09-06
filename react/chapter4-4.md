# 4.4 테스트 위주 개발 방법 사용해 보기

> 작성한 코드가 제대로 기능하는지 확인하기 위해 작성하는 코드를 테스트 코드라고 합니다. 수행 기능ㅇ을 작성하기 전에 테스트 코드부터 작성하는 개발 방법을 '테스트 주도 개발(Test-Driven Development)'이라고 합니다.

---

## 리액트의 기본 테스트 환경 jest 도구 사용해 보기

> create-react-app에서 제공하는 기본 테스트 환경인 jest의 사용 방법을 알아봅시다.

### 1. `package.json` 파일 확인하기

`package.json` 파일을 보면 test라는 이름의 테스트 항목이 있습니다.

```js
"script": {
    ...
    "test": "react-scripts test",
    ...
}
```

### 2. 테스트 환경 구동하기

터미널 창에서 다음 명령어를 입력하면 테스트 환경을 구동하며, create-react-app이 미리 작성해둔 테스트 도구 명령어를 실행합니다.

```bash
> yarn test
```

### 3. 테스트 코드 작성하기

create-react-app은 파일 이름이 `.test.js`, `.spec.js`로 끝나는 파일이나 `src/__tests__` 폴더에 작성된 모든 `.js`, `.jsx` 확장자 파일을 테스트 환경에서 실행시킵니다.<br>
간략한 테스트를 위해 `ReactDOM()`함수를 사용하여 가상으로 웹 문서를 생성하여 컴포넌트를 출력해봅니다.

```js
// ./src/__tests__/04/Input.test.jsx
import React from "react";
import ReactDOM from "react-dom";
import Input from "../../03/Input";

describe("<Input> test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
```

### 4. 경고 메시지 확인하기

파일을 저장하고 테스트 환경을 구동하면 'Warning: Failed prop type: The prop 'name' is marked ...' 라는 경고 메시지가 나타납니다.<br>
필수 프로퍼티인 name이 Input 컴포넌트로 전달되지 않았기 때문에 테스트가 실패했습니다. `Input.test.jsx` 파일을 다음과 같이 수정하여 저장하면 테스트 환경이 테스트 코드 파일을 감시하고 있다가 변경 내용을 확인하고 다시 테스트를 실행합니다.

```js
import React from "react";
import ReactDOM from "react-dom";
import Input from "../../03/Input";

describe("<Input> test", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input name='test_name' />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
```

- 테스트 코드를 실행하면 Input 컴포넌트가 출력되는 동안 오류나 경고 메시지가 출력되는지 볼 수 있습니다.
- 실무에서는 개발자가 코드를 변경할 때 실수하는 경우가 많은데 이런 테스트 코드를 미리 작성하여 실행함으로서 에러를 미연에 방지할 수 있습니다.

---

## enzyme 라이브러리 간단히 알아보기

> enzyme은 컴포넌트의 기능만을 손쉽게 검사해주는 도구입니다.

enzyme은 테스트 과정에서 작성된 컴포넌트의 기능만을 손쉽게 검사해주는 도구입니다.

## enzyme 라이브러리 설치하고 테스트해 보기

### 1. enzyme 설치하기

- 터미널에 다음 명령어를 입력하여 enzyme을 설치하세요.
- enzyme과 함께 설치하는 enzyme-adapter-react-16.3 라이브러리는 링액트 16.3 버전부터 징원하는 생명주기 함수를 위한 것이고, react-test-renderer 라이브러리는 document.createElement() 함수 없이 컴포넌트를 생성할 수 있게 도와줍니다.

```bash
> yarn add --dev enzyme enzyme-adapter-react-16.3 react-test-renderer
```

### 2. 테스트 환경에 enzyme 추가하기

enzyme-adapter-react-16.3 라이브러리를 리액트 프로젝트에 적용하려면 src 폴더에 테스트 설정 코드를 추가해야 합니다. 테스트 설정 코드는 jest가 처음 테스트 코드를 실행하기 전에 구동되며, 추가 테스트 도구의 환경 설정을 위한 코드를 작성할 때 사용합니다.

```js
// ./src/setupTests.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16.3";

configure({ adapter: new Adapter() });
```

### 3. 간편한 출력 테스트를 도와주는 `shallow()` 함수

> shallow() 함수는 컴포넌트의 자식 컴포넌트를 생성하거나 출력하는 과정을 건너뛰고 현재 컴포넌트의 생명주기만을 테스타합니다.

```js
// ./src/__tests__/04/Input_spec.jsx
import React from "react";
import { shallow } from "enzyme";

import Input from "../../03/Input";

describe("<Input> Test", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Input />);
    }).not.toThrow();
  });
});
```

- `shallow()` 함수 안에 Input 컴포넌트를 직접 넣었습니다.
- jest의 `toThrow()` 함수를 사용하여 입력 컴포넌트가 출력되는 동안 오류가 발생하는지 검사하고, 오류가 발생하지 않으면 테스트를 통과합니다.
- `toThrow()` 함수는 컴포넌트의 출력 오류를 검사합니다.
  - 예를들어 프로퍼티로 전달받은 콜백 함수를 실행하도록 컴포넌트를 구성했을 때, 콜백 함수를 프로퍼티로 전달하는 과정이 생략되는 경우에는 에러가 발생합니다.
  - `.not.toThrow()` 함수는 이러한 에러가 나타나는지 검증하는 함수입니다.

### 4. `expect()` 함수로 결과값 검증하기

- jest의 검사 함수인 `expect()`는 특정 변수를 비교하거나 함수를 실행하여 발생한 결과값을 검증합니다.
- `expect()` 함수를 사용하여 `shallow()` 함수가 반환하는 객체의 개수를 검증해보겠습니다.

```js
// ./src/__tests__/04/Input_spec.jsx
import React from "react";
import { shallow } from "enzyme";

import Input from "../../03/Input";

describe('<Input> Test', () => {
    ...
    it('has one element', () => {
        const wrapper = shallow(<Input />);
        expect(wrapper.length).toEqual(1);
        expect(wrapper).toHaveLength(1);
    })
})
```

- `expect()` 함수가 반환한 `toEqual()` 함수를 사용하여 반환된 객체의 수를 비교합니다.
- `expect()` 함수가 반환한 `toHaveLength()` 함수를 사용하여 .length값을 비교합니다.

### 5. 경고 메시지를 오류로 인식하도록 설정하기

jest의 `spyOn()` 함수를 활용하여 경고 메시지를 오류로 인식하도록 설정해 보겠습니다. <br>
`beforeEach()`와 `afterEach()`는 jset에서 제공하는 함수로, 각 테스트 코드가 실행되기 이전과 이후에 특정 설정을 추가하고 변경된 설정을 초기화하기 위해 실행되는 함수입니다.

```js
//  ./src/setupTests.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16.3";

configure({ adapter: new Adapter() });

afterEach(() => {
  console.error.mockClear();
});

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation((e) => {
    throw new Error(e);
  });
});
```

- `console.error()` 함수 객체에 `spyOn()` 함수로 추가된 가상의 감지 코드를 제거합니다.
- 감시 함수 `sypOn()`을 사용하여 console 객체의 error() 함수를 실제 기능 대신 `mockImplementation`에 정의된 함수가 실행되도록 합니다.
- `console.error()` 함수를 실행할 때 전달된 인자로 오류를 발생하도록 합니다.
- 테스트 결과에서 발생된 오류를 참고하여 Input_spec.jsx 파일에 Input 컴포넌트에 props로 name 값을 전달해 오류를 수정합니다.

### 7. 오류 수정 후 테스트 코드 실행하기

아래의 명령어를 입력하여 수정된 테스트 코드만 실행해 보겠습니다. 실행 명령어 뒤에 특정 파일 경로나 디렉토리 경로를 입력하면 해당 경로의 테스트만 실행할 수 있습니다.

```bash
> yarn test ./src/__tests__/03/Input_spec.jsx
```

---

## enzyme 라이브러리 능숙하게 사용하기

`find()` 함수를 이용하여 Input 컴포넌트에 `render()` 함수에서 출력해야 하는 항목이 제대로 갖춰졌는지 검사해 보겠습니다. 이 과정은 컴포넌트가 필요한 엘리먼트를 출력하고 정상적으로 작동하는지 검증하는 과정이므로 반드시 알아야 합니다.<br>
먼저 Input 컴포넌트는 다음과 같은 요구 사항을 만족해야 합니다.

- 입력 컴포넌트는 input, label, span 엘리먼트를 출력합니다.
- input의 value, type 속성은 프로퍼티 value, type의 값을 사용합니다.
- label은 프로퍼티 label의 값을 사용합니다.
- 사용자의 입력이 올바르지 않은 경우 input 엘리먼트 밑에 span 엘리먼트를 배치하여 오류 메시지(errorMessage)를 출력합니다.

### 1. `find()` 함수로 엘리먼트 출력하기

```js
// ./src/__tests__/04/Input_spec.jsx
import React from "react";
import { shallow } from "enzyme";

import Input from "../../03/Input";

describe("<Input> Test", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Input name='test_name' />);
    }).not.toThrow();
  });

  describe("contains <input>", () => {
    it("renders on input", () => {
      const wrapper = shallow(<Input name='test_name' />);
      expect(wrapper.find("input")).toHaveLength(1);
      expect(wrapper.find("label")).toHabeLength(1);
    });
  });
});
```

- `shallow()` 함수는 컴포넌트를 출력한 후 컴포넌트를 검사할 수 있는 enzyme 객체를 반환합니다. enzyme 객체는 `find()` 함수를 포함하고 있습니다.
- `find()` 함수의 인자로 'input'을 전달하여 출력된 DOM에서 input 엘리먼트를 찾습니다. `toHaveLength()` 함수로 반환된 엘리먼트의 개수를 검증합니다.
- `find()` 함수로 추출된 값은 배열형이며, `expect()` 함수가 반환한 배열의 길이를 `toHaveLength()` 함수로 검사했습니다.

### 2. `prop()`, `props()` 함수로 프로퍼티에 전달된 값 검증하기

Input 컴포넌트에 전달된 프로퍼티의 값이 의도대로 `render()` 함수에서 할당되었는지 검사히기 위한 함수 `prop()`, `props()`를 사용해 보겠습니다.

```js
// .src/__tests__/04/Input_spec.jsx
...
describe('<Input> Test', () => {
    ...
    it('assigns the prop value and type', () => {
        const expectedValue = '123';
        const wrapper = shallow(<Input name='test_name' value={expectedValue}>);
        expect(wrapper.find('input).prop('value')).toBe(expectedValue);
        const {type, value} = wrapper.find('input').props();
        expect(value).toBe(expectedValue);
        expect(type).toBe('text');
    })
})
```

- `prop()` 함수를 사용하여 value의 프로퍼티값과 컴포넌트에 전달된 값을 검증합니다.
- `props()` 함수에서 객체 추출식을 사용해 추출한 value, type의 프로퍼티값을 검증합니다.
- `prop()` 함수는 enzyme 객체가 반환한 컴포넌트(또는 엘리먼트)ㅇ에 확인하고자 하는 프로퍼티의 이름을 인자로 전달합니다. 그러면 해당 프로퍼티의 값을 추출하여 반환합니다.
- `props()` 함수는 전체 프로퍼티값들을 객체로 반환하므로 여러 개의 프로퍼티에 대한 작업을 할 수 있습니다.

### 3. `setProps()` 함수로 변경된 프로퍼티값 전달하기

구현된 컴ㅍ넌트의 생명주기 함수 코드를 검증하거나 변경된 값에 맞춰 화면 출력 state를 검증하려면 프로퍼티의 값을 바꿔야 합니다. enzyme의 `setProps()` 함수는 프로퍼티값을 변경하여 테스트에 적용할 수 있습니다.

```js
// .src/__tests__/Input_spec.jsx
...
describe('<Input> Test', () => {
    ...

    it('renders errorMessage', () => {
        const wrapper = shallow(<Input name='test_name' />);
        expect(wrapper.find('.error')).toHaveLength(0);
        const expectedErrorMessage = '잘못된 값이 입력되었습니다.';
        wrapper.setProps({ errorMessage: expectedErrorMessage});
        expect(wrapper.find('span').prop('className')).toBe('error');
        expect(wrapper.find('.error')).toHaveLength(1);
        expect(wrapper.html()).toContain(expectedErrorMessage);
    })
})
```

- `expect(wrapper.find('.error')).toHaveLength(0);`
  - error 스타일을 포함한 오류 메시지가 있는지 검사합니다.
- `wrapper.setProps({ errorMessage: expectedErrorMessage});`
  - `setProps()` 함수로 errorMessage 프로퍼티의 값을 변경합니다.
- `expect(wrapper.find('.error')).toHaveLength(1);`
  - errorMessage 프로퍼티가 추가되었기 때문에 error 스타일을 포함한 오류 메시지 1개가 정상적으로 포함된 것을 확인합니다.
- `expect(wrapper.html()).toContain(expectedErrorMessage);`
  - `html()` 함수를 사용하여 출력된 HTML에서 실제 오류 메시지가 정상적으로 출력되었는지 검증합니다.

### 4. `simulate()` 함수로 가상의 이벤트 검사하기

enzyme은 가상 이벤트를 작동시킬 수 있는 `simulate()` 함수를 제공합니다. 이를 이용하여 이벤트에 반응하는 콜백 함수가 정상적으로 동작하는지 검사합니다. Input 컴포넌트의 요구사항 중 'input 엘리먼트의 값이 변경될 때 onChange 콜백 함수를 호출한다'를 검사해 보겠습니다.

```js
// .src/__tests__/Input_spec.jsx
...

describe('<Input> Test', () => {
    ...

    it('calls back onChange on input change', () => {
        const changeStub = jest.fn();
        const wrapper = shallow(<Input name='test_name' onChange={changeStub} />);
        expect(changeStub).not.toHaveBeenCalled();
        const expectedTargetValue = 'updated input';
        wrapper.find('input').simulate('change', {target: { value: expectedTargetValue}});
        expect(changeStub).toHaveBeenCalledTimes(1);
        expect(changeStub).toHaveBeenCalledWith('test_name', expectedTargetValue);
    })
})
```

- `const changeStub = jest.fn();`
  - jest는 감시 함수 `fn()`을 제공하여 생성된 함수의 호출을 감시하는 방법을 제공합니다.
- `const wrapper = shallow(<Input name='test_name' onChange={changeStub} />);`
  - 생성된 감시 함수를 입력 컴포넌트의 onChange 프로퍼티에 할당합니다.
- `expect(changeStub).not.toHaveBeenCalled();`
  - 이벤트 재현 시점을 기준으로 이벤트 실행 이전에는 콜백 함수가 호출되지 않은 상태를 `expect()` 함수의 호출 검증 메서드 `toHaveBeenCalled()`로 검증합니다.
- `wrapper.find('input').simulate('change', {target: { value: expectedTargetValue}});`
  - enzyme의 이벤트 재현 메서드를 사용하여 input값이 변경되는 이벤트(onChange)를 재현합니다. 재현을 위해 실제 브라우저에서 전달할 값을 전달해야 합니다. target.value에 값이 전달되므로 객체형으로 가상의 입력값을 전달했습니다.
- `expect(changeStub).toHaveBeenCalledTimes(1);`
- `expect(changeStub).toHaveBeenCalledWith('test_name', expectedTargetValue);`
  - `fn()` 함수로 반환된 콜백 함수를 `expect()` 함수의 호출 검증 메서드로 호출 횟수와 호출 인자들을 검사합니다.
