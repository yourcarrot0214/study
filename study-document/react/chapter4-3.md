# 4-3 스타일 컴포넌트 만들기

> CDN을 통해 스타일 파일을 임포트하여 사용하는 방법은 CDN 파일에 의존하므로 컴포넌트를 공유할 때 별도의 스타일 파일을 공유해야 한다는 단점이 있습니다. 이러한 단점을 극복하고자 컴포넌트 안에서 스타일을 정의하여 바로 사용하는 방법을 알아봅니다.

## react-with-styles로 스타일을 적용한 Text 컴포넌트 만들기

- react-with-styles는 에어비앤비에서 공개한 스타일 컴포넌트 라이브러리 입니다.
- 라이브러리는 자바스크립트 친화적이며 HOC 형태로 구현되어 있어 코드를 읽고 이해하기 쉬운 장점이 있습니다.

### 1. react-with-styles 라이브러리 설치하기

```bash
> yarn add react-with-styles aphrodite react-with-styles-interface-aphrodite
```

- 프로젝트 루트 폴더에 라이브러리를 설치 합니다.
- 함께 설치되는 라이브러리는 서버 출력을 도와주는 아프로디테 입니다.
- 서버 출력은 자바스크립트로 스타일을 적용하면 화면이 모두 출력된 이후 자바스크립트 엔진이 동작하며 적용하게 되므로 스타일 적용시 시간 간격이 생깁니다.
- 시간 간격이 생기면 잠시나마 색상과 글꼴이 적용되지 않은 왜곡된 화면이 노출될 수 있으므로 이 시간 간격을 줄이려면 화면 출력을 시작하는 순간에 스타일 코드를 서버에서 생성하여 같이 출력하면 됩니다.
  - 이 방법을 서버출력이라 하고 스페셜 페이지에서 자세히 다루도록 합니다.

<br>

### 2. 테마 파일 만들기

설치가 완료되면 프로젝트 전체에서 사용할 스타일 파일을 만들겠습니다.

```js
// ./src/04/Theme.js
export default {
  // 색상
  color: {
    primary: "#03a9f4",
    secondary: "#795548",
    white: "#FFFFFF",
    gray: "#CCCCCC",
    default: "#999999",
  },
  // 글꼴 크기
  size: {
    xg: 24,
    lg: 18,
    md: 14,
    sm: 12,
    xs: 10,
  },
  lineHeight: {
    xg: "60px",
    lg: "54px",
    md: "36px",
    sm: "24px",
    xs: "18px",
  },
  // 길이 단위
  unit: 4,
};
```

<br>

### 3. 공용 스타일 컴포넌트 함수 만들기

react-with-styles를 모든 컴포넌트에서 사용하려면 아래와 같은 공용 파일을 만들어 설정해 두는 것이 좋습니다. 공용 파일에는 앞에서 정의한 테마 파일을 등록한 후 공통된 테마 설정값을 사용하여 스타일 컴포넌트를 구성합니다.

```js
// .src/04/withStyles.js

import ThemedStyleSheet from "react-with-styles/lib/ThemedStyleSheet";
import aphroditeInterface from "react-with-styles-interface-aphrodite";
import { css, withStyles, withStylesPropTypes } from "react-with-styles";
import Theme from "./Theme";

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export { css, withStyles, withStylesPropTypes, ThemedStyleSheet };
export default withStyles;
```

- `ThemedStyleSheet`
  - react-with-styles의 테마 관리자를 임포트합니다.
- `aphroditeInterface`
  - 서버 출력을 도와주는 아프로디테 라이브러리의 react-with-styles 버전을 임포트 합니다.
- `{ css, withStyles, withStylesPropTypes }`
  - react-with-styles에서 사용하는 함수를 임포트합니다.
- `ThemedStyleSheet.registerTheme(Theme);`
  - 사전에 제작한 Theme 파일을 등록합니다.
- `ThemedStyleSheet.registerInterface(aphroditeInterface);`
  - 아프로디테를 react-with-styles의 테마 관리자에 적용합니다.

<br>

### 4. 텍스트 예제 컴포넌트 만들기

자식 프로퍼티로 전달받은 노드를 span 엘리먼트 안에 출력하는 Text 컴포넌트 입니다.

```js
// .src/04/Text.jsx

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Text extends PureComponent {
  render() {
    const { children } = this.props;

    return <span>{children}</span>;
  }
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Text;
```

<br>

### 5. react-with-styles로 스타일을 적용할 때 사용하는 withStyles() 함수 살펴보기

react-with-styles로 스타일을 적용하려면 반환값이 함수인 커링 형태의 withStyles() 함수를 사용해야 합니다.

<br>

### 6. withStyles() 함수로 react-with-styles 사용해 보기

```js
// src/04/Text.jsx

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withStyles, { css } from "./withStyles";

class Text extends PureComponent {
  render() {
    const { children, styles } = this.props;

    return <span {...css(styles.default)}>{children}</span>;
  }
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(({ color, size }) => ({
  default: {
    color: color.default,
    fontSize: size.md,
  },
}))(Text);
```

- `css()` 함수를 임포트하영 엘리먼트에 스타일을 적용합니다.
- `css()` 함수로 엘리먼트에 default 키에 정의된 스타일을 적용합니다.
  - `css()` 함수는 엘리먼트 속성값을 객체형으로 반환하므로 전개 연산자를 사용해 span 엘리먼트에 스타일을 적용합니다.
- `withStyles` 스타일 생성 함수를 호출하여 테마 파일에 등록된 값 `{ color, size }`를 withStyles() 함수에 전달했습니다.
- `fontSize`
  - 자바스크립트를 이용는 css 라이브러리의 경우 대부분 카멜표기법으로 속성명을 입력합니다.

<br>

### 7. 프로퍼티에 따라 Text 컴포넌트에 다양한 스타일 변경하기

`css()` 함수는 전개된 인자들의 속성값을 병합해 주는 기능이 있습니다. 예를 들어 `css(style1, style2, style3)`은 style1, style2, style3을 병합해줍니다.

```js
// src/04/Text.jsx

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withStyles, { css } from "./withStyles";

class Text extends PureComponent {
  render() {
    const {
      children,
      styles,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
    } = this.props;

    return (
      <span
        {...css(
          styles.default,
          xsmall && styles.xsmall,
          small && styles.small,
          large && styles.large,
          xlarge && styles.xlarge,
          secondary && styles.secondary,
          primary && styles.primary
        )}
      >
        {children}
      </span>
    );
  }
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
};

export default withStyles(({ color, size }) => ({
  default: {
    color: color.default,
    fontSize: size.md,
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  small: {
    fontSize: size.sm,
  },
  xsmall: {
    fontSize: size.xs,
  },
  primary: {
    color: color.primary,
  },
  secondary: {
    color: color.secondary,
  },
}))(Text);
```

- `<Text>` 컴포넌트에 props로 large, xlarge, small, xsmall, primary, secondary 등을 전달하면 각각 다르게 적용된 css를 확인할 수 있습니다.

---

<br>

## react-with-styles로 스타일을 적용한 Button 컴포넌트 만들기

위에서 살펴본 기능들을 활용하여 Button 컴포넌트를 만들어 봅니다.

```js
// ./src/04/Button.jsx

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withStyles, { css } from "./withStyles";

class Button extends PureComponent {
  render() {
    const {
      children,
      disabled,
      styles,
      large,
      xlarge,
      small,
      xsmall,
      primary,
      secondary,
      onPress,
    } = this.props;

    return (
      <button
        {...css(
          styles.default,
          small && styles.small,
          xsmall && styles.xsmall,
          large && styles.large,
          xlarge && styles.xlarge,
          secondary && styles.secondary,
          primary && styles.primary
        )}
        onClick={onPress}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  onPress: () => {},
  small: false,
  xsmall: false,
  large: false,
  xlarge: false,
  secondary: false,
  primary: false,
};

export default withStyles(({ color, size, unit }) => ({
  default: {
    border: 1,
    borderStyle: "solid",
    borderColor: color.default,
    borderRadius: 2,
    color: color.default,
    fontSize: size.md,
    padding: unit * 2,
    cursor: "pointer",
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  small: {
    fontSize: size.sm,
    padding: unit,
  },
  xsmall: {
    fontSize: size.xs,
    padding: unit,
  },
  primary: {
    borderColor: color.primary,
    color: color.white,
    backgroundColor: color.primary,
  },
  secondary: {
    borderColor: color.secondary,
    color: color.secondary,
  },
}))(Button);
```

- `<Text>` 컴포넌트와 마찬가지로 props를 전달하면 각각 다른 css가 적용된 버튼을 확인할 수 있습니다.

---

<br>

## 반응형으로 스타일 구성하기

모바일 사용자를 위해 '해상도에 따라 화면이 달라지는' 반응형으로 스타일을 구성해 보겠습니다. 여기서는 미디어 속성값을 테마 파일에 저장하여 반응형 컴포넌트나 레이아웃 컴포넌트를 제작합니다.

<br>

### 1. 테마 파일에 미디어 속성값 추가하기

```js
// ./04/Theme.js

export const LARGE_AND_ABOVE = "largeAndAbove";
const BREAKPOINT_NAMES = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
};

const breakpoints = {
  [BREAKPOINT_NAMES.LARGE]: 1128,
  [BREAKPOINT_NAMES.MEDIUM]: 744,
  [BREAKPOINT_NAMES.SMALL]: 327,
};

const responsive = {
  [LARGE_AND_ABOVE]: `@media (min-width: ${
    breakpoints[BREAKPOINT_NAMES.LARGE]
  }px`,
  [BREAKPOINT_NAMES.SMALL]: `@media (max-width: ${
    breakpoints[BREAKPOINT_NAMES.MEDIUM] - 1
  }px)`,
  print: "@media print",
};

export default {
  // ..(기존 테마 파일에 있던 색상, 폰트, 사이즈, 길이 단위)
  responsive,
};
```

<br>

### 2. 버튼 컴포넌트에 미디어 속성값 적용하기

미디어 속성값을 사용해 버튼 컴포넌트를 수정해 보겠습니다.

- 휴대폰 해상도에서 버튼의 넓이를 100%로 늘려 변경합니다.
- 테마 파일로 작성된 미디어 속성값(resopnsive)은 `withStyles()` 함수의 인자로 전달됩니다.

```js
// ./src/04/Button.jsx

// ... 기존 코드

export default withStyles(({ color, size, unit, responsive }) => {
    default: {
        border: 1,
        borderStyle: 'solid',
        borderColor: color.default,
        borderRadius: 2,
        color: color.default,
        fontSiz e: size.md,
        padding: unit * 2,
        cursor: 'pointer',
        [responsive.small]: {
            width: '100%',
        }
    },
    // .... 기존 코드
})(Button);
```
