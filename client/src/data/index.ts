const emailList = [{ value: "naver.com" }, { value: "nate.com" }, { value: "gmail.com" }, { value: "daum.net" }, { value: "1024corp.com" }, { value: "love.com" }];
const links = [
  {
    to: "/",
    color: "primary",
    title: "페이지네이션"
  },
  {
    to: "/prefetch",
    color: "secondary",
    title: "페이지네이션-프리패치"
  }
  // {
  //   to: "/main/infinite-scroll",
  //   color: "success",
  //   title: "무한스크롤",
  // },
];
const questionList = [
  {
    question: "좋아하는 색깔은?",
    index: 0
  },
  {
    question: "좋아하는 영화 장르는?",
    index: 1
  },
  {
    question: "영어이름은?",
    index: 2
  },
  {
    question: "태어난 고향은?",
    index: 3
  },
  {
    question: "보물 1호는?",
    index: 4
  },
  {
    question: "감명깊게 읽은 책 이름은?",
    index: 5
  }
];
export { emailList, links, questionList };
