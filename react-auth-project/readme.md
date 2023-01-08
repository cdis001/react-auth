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
