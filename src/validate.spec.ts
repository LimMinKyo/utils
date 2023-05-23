import {
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateContactNumber,
  validateFileSize,
} from "./validate";

describe("validatePhoneNumber", () => {
  it("01033333333", () => {
    expect(validatePhoneNumber("01033333333")).toBeTruthy();
  });
  it("010-3333-3333", () => {
    expect(validatePhoneNumber("010-3333-3333")).toBeTruthy();
  });
  it("027363333", () => {
    expect(validatePhoneNumber("027363333")).toBeFalsy();
  });
  it("02-736-3333", () => {
    expect(validatePhoneNumber("02-736-3333")).toBeFalsy();
  });
  it("0", () => {
    expect(validatePhoneNumber("0")).toBeFalsy();
  });
  it("empty string", () => {
    expect(validatePhoneNumber("")).toBeFalsy();
  });
  it("undefined (실패)", () => {
    expect(validatePhoneNumber(undefined)).toBeFalsy();
  });
});

describe("validateEmail", () => {
  it("email@email.com", () => {
    expect(validateEmail("email@email.com")).toBeTruthy();
  });
  it("test@test.com", () => {
    expect(validateEmail("test@test.com")).toBeTruthy();
  });
  it("test@o2pluss.com", () => {
    expect(validateEmail("test@o2pluss.com")).toBeTruthy();
  });
  it("testEmail", () => {
    expect(validateEmail("testEmail")).toBeFalsy();
  });
  it("test@test", () => {
    expect(validateEmail("test@test")).toBeFalsy();
  });
  it("undefined (실패)", () => {
    expect(validateEmail(undefined)).toBeFalsy();
  });
});

describe("validatePassword", () => {
  it("Asd12345678@ 성공", () => {
    expect(validatePassword("Asd12345678@")).toBeTruthy();
  });
  it(`Asd1!"#$%&'()*+, 성공(특수문자 테스트)`, () => {
    expect(validatePassword(`Asd1!"#$%&'()*+,`)).toBeTruthy();
  });
  it(`Asd1-./:;<=>?@[₩ 성공(특수문자 테스트)`, () => {
    expect(validatePassword(`Asd1-./:;<=>?@[₩`)).toBeTruthy();
  });
  it("Asd1]^_`{|}~ 성공(특수문자 테스트)", () => {
    expect(validatePassword("Asd1]^_`{|}~")).toBeTruthy();
  });
  it("Asd123 45678@ 실패(공백 포함)", () => {
    expect(validatePassword("Asd123 45678@")).toBeFalsy();
  });
  it("asd12345678@ 실패(대문자 미포함)", () => {
    expect(validatePassword("asd12345678@")).toBeFalsy();
  });
  it("Asdasd!@# 실패(숫자 미포함)", () => {
    expect(validatePassword("Asdasd!@#")).toBeFalsy();
  });
  it("Asd12345678 실패(특수문자 미포함)", () => {
    expect(validatePassword("Asd12345678")).toBeFalsy();
  });
  it("Asd456@ 실패(최소 8자 이상)", () => {
    expect(validatePassword("Asd456@")).toBeFalsy();
  });
  it("Asd123456789123456789@ 실패(최대 16자)", () => {
    expect(validatePassword("Asd123456789123456789@")).toBeFalsy();
  });
  it("undefined (실패)", () => {
    expect(validatePassword(undefined)).toBeFalsy();
  });
});

describe("validateFileSize", () => {
  it("10MB (성공)", () => {
    expect(validateFileSize(10 * 1024 * 1024)).toBeTruthy();
  });
  it("11MB (실패)", () => {
    expect(validateFileSize(11 * 1024 * 1024)).toBeFalsy();
  });
});

describe("validateContactNumber", () => {
  it("010-3333-3333 (성공)", () => {
    expect(validateContactNumber("010-3333-3333")).toBeTruthy();
  });
  it("02-123-4567 (성공)", () => {
    expect(validateContactNumber("02-123-4567")).toBeTruthy();
  });
  it("041-734-5678 (성공)", () => {
    expect(validateContactNumber("041-734-5678")).toBeTruthy();
  });
  it("0505-1234-5678 (성공)", () => {
    expect(validateContactNumber("0505-1234-5678")).toBeTruthy();
  });
  it("123 (실패)", () => {
    expect(validateContactNumber("123")).toBeFalsy();
  });
  it("undefined (실패)", () => {
    expect(validateContactNumber(undefined)).toBeFalsy();
  });
});
