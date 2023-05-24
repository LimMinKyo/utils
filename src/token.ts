import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const TOKEN = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  CSRF_TOKEN: "CSRF-TOKEN",
} as const;
type TOKEN = (typeof TOKEN)[keyof typeof TOKEN];

class UtilsToken {
  setAccessToken(accessToken: string) {
    localStorage.setItem(TOKEN.ACCESS_TOKEN, accessToken);
  }
  setRefreshToken(refreshToken: string) {
    localStorage.setItem(TOKEN.REFRESH_TOKEN, refreshToken);
  }
  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(TOKEN.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN.REFRESH_TOKEN, refreshToken);
  }
  getAccessToken() {
    return localStorage.getItem(TOKEN.ACCESS_TOKEN);
  }
  getRefreshToken() {
    return localStorage.getItem(TOKEN.REFRESH_TOKEN);
  }
  getCsrfToken() {
    return Cookies.get(TOKEN.CSRF_TOKEN);
  }
  removeTokens() {
    localStorage.removeItem(TOKEN.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN.REFRESH_TOKEN);
  }
  getIsExpired(accessToken: string) {
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  }
  /**
   * 리프레쉬 토큰을 이용할 시간이 됐는지 체크 (만료시간이 1시간 안쪽으로 남았을 경우)
   * @param accessToken
   */
  getIsRefreshTime(accessToken: string) {
    const decoded = jwtDecode<{ exp: number }>(accessToken);

    const expiredTime = decoded.exp; // second(초) 기준
    const NOW = Date.now() / 1000; // second(초) 기준
    const ONE_HOUR = 1 * 60 * 60; // second(초) 기준

    const isRefreshTime = expiredTime - NOW < ONE_HOUR;

    if (isRefreshTime) {
      return true;
    }
    return false;
  }
}

export const utilsToken = new UtilsToken();
