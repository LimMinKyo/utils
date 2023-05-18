/**
 * 정해진 시간만큼 코드 실행 대기
 * @param sec 초단위
 */
export const sleep = (sec: number) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};
