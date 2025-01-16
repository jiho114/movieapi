# Movie Site 프로젝트

- Axios를 사용하여 TMDB 영화 데이터를 활용한 반응형 영화 사이트입니다.

- 사용한 API : TMDB

- 사용한 언어 : 리액트 Vite

- 사용한 라이브러리 : Axios, Swiper

## Movie Site의 핵심 내용
- 미디어 쿼리를 사용한 반응형 사이트로 제작하여 사용자가 어느 환경에서 접속을 해도 보기 쉽고 편리하게 작업하였습니다.

- 영화 추천작, 배우 정보 등 데이터 API를 활용
- Swiper를 사용하여 페이지의 동적인 느낌을 구현
- axios를 활용한 데이터 가지고 오기
- .env 파일 활용과 데이터 API를 vercel에 배포하기

### Movie Site 프로젝트를 하며
- 이번 프로젝트는 두 번째로 API를 활용한 작업입니다. 첫 번째 요리 사이트를 만들 때보다 훨씬 더 수월하게 진행할 수 있었습니다. 특히, Axios를 통해 데이터를 받아오는 과정은 어려움 없이 자연스럽게 구현되었고, console.log를 활용해 필요한 데이터를 정확히 골라내고 그에 맞는 컴포넌트를 만들 수 있었습니다. Actor.jsx는 Home.jsx에서 두 번 재활용되었는데, 각각 다른 title과 배우 정보를 전달해야 했기에 props를 사용해 배열을 동적으로 넣어주고, Actor 컴포넌트에서 세부적인 작업을 진행하는 과정이 매우 흥미로웠습니다. 리액트를 처음 배울 때는 props가 특히 헷갈렸지만, 꾸준히 프로젝트를 만들어가며 공부하고 복습하다 보니 어느새 많이 발전했다는 느낌이 들었습니다.
