import { toContactNumber } from "./format";

/**
 * 해당 문자열이 핸드폰번호 형식인지 검사하는 유틸함수
 * @param value 폰형식인지 검사할 전화번호 문자열
 */
export const validatePhoneNumber = (value = "") => {
  const formattedValue = toContactNumber(value);
  const regExp = /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/;
  const isPhone = regExp.test(formattedValue);

  return isPhone;
};

/**
 * 해당 문자열의 이메일 형식을 검사하는 유틸함수
 * @param value 이메일 형식을 검사할 문자열
 */
export const validateEmail = (value = "") => {
  const emailRegExp = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;
  const isEmail = emailRegExp.test(value);
  return isEmail;
};

/**
 * 해당 문자열의 패스워드 형식을 검사하는 유틸함수
 * @param value 패스워드 형식을 검사할 문자열
 */
export const validatePassword = (value = "") => {
  /**
   * 대문자 포함 대소문자 체크
   */
  const checkEnglish = () => {
    const regExp = /(?=.*?[a-z])(?=.*?[A-Z])/;
    return regExp.test(value);
  };
  /**
   * 숫자 포함 여부 체크
   */
  function checkNumber() {
    const regExp = /(?=.*?[0-9])/;
    return regExp.test(value);
  }
  /**
   * 공백 포함 여부 체크
   */
  function checkSpace() {
    const regExp = /\s/;
    const isExistSpace = regExp.test(value);
    return !isExistSpace;
  }
  /**
   * 특수문자 포함 여부
   */
  function checkSpecialChar() {
    const regExp = /(?=.*?[!"#$%&')(*+,-./:;<=>?@[₩\]^_`{|}~])/;
    return regExp.test(value);
  }
  /**
   * 8 ~ 16자리까지 입력 가능
   */
  function checkLength() {
    const regExp = /^.{8,16}$/;
    return regExp.test(value);
  }

  if (
    checkEnglish() &&
    checkNumber() &&
    checkSpace() &&
    checkSpecialChar() &&
    checkLength()
  ) {
    return true;
  }
  return false;
};

/**
 * 파일 용량 체크 유틸함수
 * @param fileSize 용량을 체크할 파일 사이즈
 */
export const validateFileSize = (fileSize: number) => {
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (fileSize > maxSize) {
    return false;
  }

  return true;
};

/**
 * 휴대폰 번호 형식을 검사하는 유틸함수
 * @param value 형식을 검사할 문자열
 */
export const validateContactNumber = (value = "") => {
  const formattedValue = toContactNumber(value);
  const regExp = /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})-([0-9]{3,4})-([0-9]{4})$/;

  if (!regExp.test(formattedValue)) {
    return false;
  }

  return true;
};

/**
 * 브라우저 환경인지 Node.js 환경인지 검사하는 유틸함수
 */
export const isClientBrowser = () => {
  if (typeof window !== "undefined") {
    return true;
  }
  return false;
};
