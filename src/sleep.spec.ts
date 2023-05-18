import { sleep } from "./sleep";

describe("sleep", () => {
  it("정해진 시간만큼 대기해야한다.", async () => {
    // given
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");

    // when
    await sleep(1);

    // then
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
