# SSAFY Front-end 스터디 온보딩 과제

![blog-app](src/assets/defaultImg.png)

## 리드 세션\_블로그 앱 구현하기 요구사항

#### 1. 로그인, 회원가입 기능 구현

- [x] 회원가입 시 'password', 'passwordConfirm' 필드를 반드시 포함
- [ ] JWT를 이용할 경우 accessToken, refreshToken까지 구현할 것
- [x] 로그인하지 않은 회원은 '로그인페이지'와 '회원가입페이지'에만 접근할 수 있도록 Protected Route로직을 도입할 것
- [x] 회원가입 후 자동로그인되어 메인페이지로 이동될 것
- [x] 이메일가입에 정규식을 이용할 것

#### 2. 메인페이지

- [x] 블로그의 게시글들을 확인할 수 있음
- [x] 게시글을 내가 쓴 글과 전체 글을 분류해서 확인할 수 있음
- [x] 게시물 카드에는 'thumnail', '작성자', '생성일', '제목', '본문의 일부'를 반드시 포함할 것
- [x] 메인 상단에는 간단한 carousel을 구현할 것

#### 3. 프로필 페이지

- [x] 회원가입 때 입력받은 정보로 프로필을 구성
- [ ] 디폴트 이미지를 사용하여 프로필 이미지를 보여줌
- [x] 내가 작성한 글을 모아볼 수 있음
- [x] 로그아웃 기능

#### 4. 게시판 CRUD

- [x] 게시판 CRUD
- [x] 글 작성자만 수정, 삭제가 가능함

## 기술 스택

```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.3",
    "react-router-dom": "^6.21.2"
    "tailwindcss": "^3.4.1",
    "firebase": "^10.7.1",
```

- `react-hook-form`: 회원가입, 로그인, 글작성 등 form을 다룰일이 많았는데, 폼 상태관리, 유효성 검사가 용이하여 사용
- `tailwindcss`: 짧은 개발 기간 내에 빠르게 스타일링할 수 있어 사용
- `firebase`: 직접 서버를 구축하지 않고 서버리스로 회원가입, 게시판 CRUD를 구현하기 위해 사용

## 추가 개발 계획

- [ ] 게시글 최신순으로 불러올 것
- [ ] 파이어베이스 이미지 업로드 기능을 추가하여 썸네일, 프로필 등 이미지 적용 부분 개선
- [ ] 파일구조 리팩터링
- [ ] accessToken, refreshToken 로직 구현
- [ ] 하드코딩된 부분 리팩터링
