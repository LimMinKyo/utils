/**
 * 연락처(유선 전화번호 포함) 형식으로 바꿔주는 유틸 함수
 * @param value
 * @return 연락처(유선 전화번호 포함) 형식으로 변환된 문자열 반환
 */
export const toContactNumber = (value = "") => {
  return value
    .toString()
    .replace(/[^0-9]/g, "")
    .replace(
      /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
      "$1-$2-$3"
    )
    .replace("--", "-");
};

/**
 * 연락처 형식에서 하이픈(-) 삭제시켜주는 유틸함수
 * @param phone
 * @return 하이픈(-) 삭제된 문자열 반환
 */
export const removeHyphen = (phone = "") => {
  return phone.toString().replaceAll("-", "");
};

/**
 * 사업자 번호 형식으로 바꿔주는 유틸 함수
 * @param bizNumber
 * @return 사업자 번호 형식으로 변환된 문자열 반환
 */
export const toBizNumber = (bizNumber = "") => {
  return bizNumber
    .toString()
    .replace(/[^0-9]/g, "")
    .replace(/([0-9]{3})([0-9]+)?([0-9]{5})$/, "$1-$2-$3")
    .replace("--", "-");
};

/**
 * 세자리 숫자마다 콤마(,)가 추가된 문자열로 바꿔주는 유틸함수
 * @param value 세자리 숫자마다 콤마(,)를 추가할 문자열
 * @returns 세자리 숫자마다 콤마(,)가 추가된 문자열 반환
 */
export const addComma = (value = "") => {
  if (!value) return "";
  const removedStringValue = value.replace(/[^0-9]/g, "");
  const removedCommaValue = Number(removedStringValue.replaceAll(",", ""));
  return removedCommaValue.toLocaleString();
};

/**
 * 콤마(,)가 삭제된 문자열로 바꿔주는 유틸함수
 * @param value 콤마(,)를 삭제할 문자열
 * @returns 콤마(,)가 삭제된 문자열 반환
 */
export const removeComma = (value = "") => {
  const removedStringValue = value.replace(/[^0-9]/g, "");
  const removedCommaValue = removedStringValue.replaceAll(",", "");
  return removedCommaValue;
};

/**
 * 로그인 아이디에 입력 가능한 문자열만 입력 가능하도록 변경하는 유틸함수
 * @param value
 */
export const toLoginId = (value = "") => {
  const formattedValue = value.replace(/[^ㄱ-ㅎ가-힣a-z0-9-,_]/gi, "");
  return formattedValue;
};
