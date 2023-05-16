import {
  toBizNumber,
  toContactNumber,
  removeHyphen,
  addComma,
  removeComma,
  toLoginId,
} from "./format";

describe("toContactNumber", () => {
  it("01033333333 -> 010-3333-3333", () => {
    expect(toContactNumber("01033333333")).toEqual("010-3333-3333");
  });
  it("0212345678 -> 02-1234-5678", () => {
    expect(toContactNumber("0212345678")).toEqual("02-1234-5678");
  });
  it("021235678 -> 02-123-5678", () => {
    expect(toContactNumber("021235678")).toEqual("02-123-5678");
  });
  it("0417345678 -> 041-734-5678", () => {
    expect(toContactNumber("0417345678")).toEqual("041-734-5678");
  });
  it("050512345678 -> 0505-1234-5678", () => {
    expect(toContactNumber("050512345678")).toEqual("0505-1234-5678");
  });
});

describe("removeHyphen", () => {
  it("010-2222-3333 -> 01022223333", () => {
    expect(removeHyphen("010-2222-3333")).toEqual("01022223333");
  });
});

describe("toBizNumber", () => {
  it("1112233333 -> 111-22-33333", () => {
    expect(toBizNumber("1112233333")).toEqual("111-22-33333");
  });
});

describe("addComma", () => {
  it("500000 -> 500,000", () => {
    expect(addComma("500000")).toEqual("500,000");
  });
  it("100000000 -> 100,000,000", () => {
    expect(addComma("100000000")).toEqual("100,000,000");
  });
  it("STRING600000 -> 600,000", () => {
    expect(addComma("STRING600000")).toEqual("600,000");
  });
  it("100 -> 100", () => {
    expect(addComma("100")).toEqual("100");
  });
  it("0001 -> 1", () => {
    expect(addComma("0001")).toEqual("1");
  });
  it("0 -> 0", () => {
    expect(addComma("0")).toEqual("0");
  });
  it("'' -> ''", () => {
    expect(addComma("")).toEqual("");
  });
});

describe("removeComma", () => {
  it("500,000 -> 500000", () => {
    expect(removeComma("500,000")).toEqual("500000");
  });
  it("100,000,000 -> 100000000", () => {
    expect(removeComma("100,000,000")).toEqual("100000000");
  });
  it("0 -> 0", () => {
    expect(removeComma("0")).toEqual("0");
  });
  it("'' -> ''", () => {
    expect(removeComma("")).toEqual("");
  });
});

describe("toLoginId", () => {
  it("asd123-,_", () => {
    expect(toLoginId("asd123-,_")).toEqual("asd123-,_");
  });
  it("ㅇㄴ힣asd123-,_ (한글 입력 가능)", () => {
    expect(toLoginId("ㅇㄴ힣asd123-,_")).toEqual("ㅇㄴ힣asd123-,_");
  });
  it("asd123-,_@#$ (-,_이외 특수문자 안됌)", () => {
    expect(toLoginId("asd123-,_@#$")).toEqual("asd123-,_");
  });
});
