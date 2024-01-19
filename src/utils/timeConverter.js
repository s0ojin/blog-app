export const timeConverter = (timeStamp) => {
  const currentTime = new Date();
  const createdTime = timeStamp.toDate();
  const diffSeconds = (currentTime.valueOf() - createdTime.valueOf()) / 1000;

  const times = [
    { name: "일", calculator: 60 * 60 * 24 },
    { name: "시간", calculator: 60 * 60 },
    { name: "분", calculator: 60 },
  ];

  //7일 이전의 글은 생성 날짜 전체 출력
  if (diffSeconds > 86400) {
    return `${createdTime.getFullYear()}.${(
      "00" +
      (createdTime.getMonth() + 1)
    ).slice(-2)}.${("00" + createdTime.getDate()).slice(-2)}`;
  }

  for (const value of times) {
    const betweenTime = Math.floor(diffSeconds / value.calculator);
    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }

  return "방금 전";
};
