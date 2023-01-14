# react-auth-project

## To Do

- [x] 회원가입

  - src/\_\_users 폴더 내에 users 배열에 새로운 user 데이터 추가하는 형식으로 구현
  - 간단한 프론트 페이지용 로직이라 백엔드 보안에 대한건 신경쓰지 않음

- [x] 로그인

  - users 배열에 입력한 id/pw가 일치하는지 아닌지 확인 후 로그인 성공/실패 판별
  - 로그인 성공시 localstorage에 isLogin, "true" 값을 주어 로그인 되어있는지 아닌지 판별

- [x] 로그아웃

  - localstorage에 isLogin, "false" 값을 주어 로그아웃 상태로 만듦

- [x] 유효성 검사
  - 실시간으로 유효성 검사를 해야 하는 항목의 경우 useEffect를 이용해 유효한지 여부를 판단하여 값 설정
  - 중복 체크의 경우에는 onBlur를 이용해 중복값 체크

## Log

- react-router 버전 업
  - Switch 엘리먼트가 Routes로 대체됨
    - Route 엘리먼트의 path 와 Link 엘리먼트의 to의 경로가 상대 경로로 바뀜
    - Route 엘리먼트의 exact가 없어짐
      - 유동적인 path를 사용하고 싶다면, path 뒤에 "\*"를 사용
  - useHistory 대신 useNavigate 사용
    - React suspense와의 호환성을 더 높이기 위함
    - 사용자의 상호작용이 이루어지기 전(이전 클릭이 로딩 중인 상태에서 다른 라우트로의 링크를 클릭한 경우 등)처럼 pending이 충돌되는 경우에 더 부드러운 경험(smoother experience)를 제공함
    - navigate API는 이전의 pending 작업을 인식한 뒤 해당 내용을 history stack에 PUSH하는 것이 아니라 REPLACE함으로써 로드되지 않은 페이지를 기록하지 않음
  - createBrowserRouter
    - DOM History API를 사용하여 URL을 업데이트하고 히스토리 스택을 관리함
    - loaders, actions, fetchers 와 같은 API 사용
    - JSON 형식으로 볼 수 있어 개인적으론 가독성이 좋다고 느낌

> https://reactrouter.com/en/main/upgrading/v5

> https://reactrouter.com/en/main/routers/create-browser-router

- localStorage로 관리하던 로그인 여부를 recoil로 관리하도록 업데이트

  - 개인적으로는 초기값 설정이 가능한 부분이 편리하다고 생각함.
    - localStorage에서는 가장 처음 시작하는 페이지에 setItem()을 사용해야 했는데, 이게 살짝 꼬이거나 하면 답이 없었기 때문에... 명시적으로 초기값을 설정하는 부분이 편리함
  - 타입을 설정할 수 있는 부분도 편리
    - 이 전에 localStorage에서는 boolean 타입을 잘못 줬다가 페이지 이동이 미친듯이 되는 오류가 있었어서..(main <-> login 무한반복) string 타입으로 설정해줬었는데 recoil에서는 명확히 타입을 지정할 수 있어, 비교문 사용시 좀 더 편리
  - 이 프로젝트에서는 느끼지 못 하는 부분이긴 하지만ㅋㅋ 이런 여러 상태들을 한 곳에 모아놓고 볼 수 있는것도 편리!
    - redux를 사용했을 때 처럼 여러 상태들을 한 곳에서 관리 할 수 있어 보기도 편하고 코드 짜기도 편리할듯

- 로그인 페이지 React Hook Form 사용

  - 기존 AuthInputBox로 사용하던 input을 React Hook Form으로 대체
  - 일단... 기존 input도 component로 분리하면서 로직이 좀 꼬였는데 AuthInputBox를 React Hook Form으로 대체할 생각을 하니 눈 앞이 캄캄해서 일단 로그인 페이지만 바꿔봄
  - 장점으로는 state를 줄일 수 있다는 점. 반복되는 함수들(setState와 같은..)을 처리하지 않아서 코드가 좀 깔끔해진 느낌
  - 컴포넌트화 시키기 편했으면 좋겠다. 보통 이런 폼의 경우에는 한 곳에서만 쓰이는게 아니라서(로그인/회원가입/유저정보...) 스타일을 통일시킬 필요가 있는데 컴포넌트화 시키기 어려우면 사용되는 페이지들에 스타일을 따로 두던가.. css를 따로 만들던가 해야할 듯
    - 지금 제일 걱정은 submit 함수를 어떻게 컴포넌트화 시켜야 하는지가 고민...
  - submit 하니 생각났는데, handleSubmit 함수는 리턴값이 함수인...함수..(뭐라 하는지 잘 모르겠음;;) 함수를 리턴하는 함수로 이루어짐.

    - 리턴값이 함수이면서, 파라미터를 함수로 받는 고차함수로 이루어짐.
    - 프로퍼티는 각각 onSubmit과 onError를 처리할 수 있는 함수들로 이루어짐
    - 예제를 보니, onSubmit에서 에러를 처리해도 되고(비동기식), 함수를 따로 나눠도 괜찮게끔(동기식) 설계한 듯
    - 아래와 같이 파라미터로 원격으로 함수를 전달한 뒤 바로 실행해도 괜찮고, 바로 함수를 넣어도 괜찮음

    ```javascript
    // It can be invoked remotely as well
    handleSubmit(onSubmit)();

    // You can pass an async function for asynchronous validation.
    handleSubmit(async (data) => await fetchAPI(data));
    ```

    - 유효성 검사와 에러를 다루기 쉽다고 하는데, 그 부분은 회원가입에 적용한 뒤에 봐야 알 듯

- 회원가입 페이지 react-hook-form 적용

  - 유효성 검사, 에러 다루기 쉽다는게 뭔지 알 것 같다!
    - 기존에는 에러 종류별로 메세지 구분하기 귀찮아서 그냥 하나로 통일했는데, 에러 타입을 지정하고, 타입에 따라 메세지를 지정할 수 있어 확실히 에러 다루기가 쉬움
    - 에러별로 메세지를 나누기 쉬워서 UX에 도움되지 않을까~
    - 코드의 길이가 줄어든 것 뿐만이 아니라, 코드가 훨씬 보기 편해짐
    - 유효성 검사를 useState로 관리하다가 내부 함수로 관리하게 되니 코드가 짧아지고, 보기 편해짐
    - 에러를 세부적으로 관리할 수 있어(정규 표현식 위배인지, 필수값인데 넣지 않은건지..등) 체크하기 편해졌다.
    - 아, 에러를 따로 useState에 관리하지 않아도 되니 password check 변수 정하기가 쉬워짐ㅋㅋ
  - 이후 AuthInputBox를 리팩토링 하는건.. 아마 css위주로 하지 않을까...

- AuthInputBox react-hook-form 적용 후 리팩토링
  - 기능때문에 이래저래 복잡했던 컴포넌트인데, 복잡한 부분을 react-hook-form으로 관리하고 난 뒤에 훨씬 간단해짐
  - 스타일 위주의 컴포넌트로 변경!
  - 기존에도 좀 더 스타일 위주의 컴포넌트로 쓸 수 있지 않았을까...
