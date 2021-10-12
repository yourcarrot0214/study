# Next.js

To bulild a complete web aplication with React from scratch, there are many important details you need to consider:<br>

- Code has to be bundled using a bundler like webpack and transformed using a compiler like Babel.
- You need to do production optimizations such as code splitting.
- You might want to statically pre-render some pages for performance and SEO. You might also want to use server-side renderng or client-side rendering.
- You might have to write some server-side code to connect your React app to your data store.

리액트로 완전한 웹 애플리케이션을 처음부터 빌드하려면 고려해야 할 중요한 세부사항이 있습니다.

- 코드는 웹팩과 같은 번들러를 사용하여 번들링되고 바벨과 같은 컴파일러를 사용하여 변환되어야 합니다.
- 코드 분할과 같은 프로덕션 최적화를 수행해야 합니다.
- 성능 및 SEO를 위해 일부 페이지를 정적으로 사전 렌더링을 할 수 있습니다. 서버사이드렌더링 또는 클라이언트사이드렌더링을 사용할 수도 있습니다.
- 리액트 앱을 데이터 저장소에 연결하기 위해 서버측 코드를 작성해야 할 수도 있습니다.

---

## Next.js : The React Framework

Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of sucess when building React applications.
<br>
Next.js aims to have best-in-class developer experience and many built-in features, such as:<br>

- An intuitive page-based routing system(with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a pre-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh
- API routes to build API endpoints with Serverless Functions
- Fully extendable

`Next.js`는 위의 모든 문제애 대한 솔루션을 제공합니다. 그러나 더 중요한 것은 리액트 애플리케이션을 구축할 때 매-우 좋다고 합니다.

`Next.js`는 동급 최고의 개발자 경험과 다음과 같은 많은 기본 제공 기능을 목표로 합니다.

- 직관적인 페이지 기반 라우팅 시스템(동적 경로 지원을 포함한)
- 사전 렌더링, 정적 생성(SSG) 및 서버사이드렌더링(SSR) 모두 페이지 단위로 지원됩니다.
- 더 빠른 페이지 로드를 위한 자동 코드 분할
- 최적화된 프리페칭을 통한 클라이언트 측 라우팅
  - `prefetching` : 진행중인 처리와 병행하여 필요하다고 생각되는 명령 또는 데이터를 사전에 판독하는 작업.
- 내장 CSS 및 Sass 지원 및 모든 CSS-in-JS 라이브러리 지원
- Fast Refresh를 지원하는 개발 환경
- Serverless Fnctions로 API 엔드포인트를 빌드하기 위한 API 경로
- 완전히 확장 가능

---

## Setup

> If ou don't have Node.js installed, install Node.js. You'll need Node.js version 10.13 or later.
> Node.js가 설치되어 있지 않다면 설치하세요. Node.js 버전 10.13이 필요합니다.

## Create a Next.js app

To create a Next.js app, open your terminal, cd into the directory you'd like to create the app in, and run the following command:<br>
`Next'js`앱을 생성하려면 터미널을 열고 앱을 생성할 디렉토리로 이동한 후 다음 명령을 실행합니다.

```bash
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this templaate through the --exaple flag. If ti doesn't work, please take a lock at this page.

내부적으로 이것은 Create-next-app 이라는 도구를 사용하여 Next.js 앱을 부트스트랩합니다. --example 플래그를 통해 이 템플릿을 사용합니다. 작동하지 않으면 <a href="https://github.com/vercel/next-learn/blob/master/basics/errors/install.md">여기</a>를 확인해보세요.

---

## Run the devlopment server

You now have a new directory called `nexjs-blog`. Let's cd into it:<br>

```bash
cd nextjs-blog
```

Then, run the following command:

```bash
npm run dev
```

This starts your Next.js app's "development server" (more on this later) on port 3000. Let's check to see if it's working. Open http://localhost:3000 from your browser.

nextjs-blog 디렉토리에서 `npm run dev` 명령어를 통해 localhost:3000 port에서 Next.js의 개발 서버가 실행되는 것을 확인합니다.
