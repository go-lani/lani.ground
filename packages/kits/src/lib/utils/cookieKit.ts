interface CookieOptions {
  path?: string;
  expires?: Date | string | 'today';
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  maxAge?: number;
}
/**
 * 쿠키와 관련된 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} setCookie - 쿠키를 설정합니다.
 * @property {Function} getCookie - 지정된 이름의 쿠키 값을 가져옵니다.
 * @property {Function} deleteCookie - 지정된 이름의 쿠키를 삭제합니다.
 * @property {Function} hasCookie - 지정된 이름의 쿠키가 존재하는지 확인합니다.
 */
const cookieKit = {
  /**
   * 쿠키를 설정합니다.
   *
   * @param {string} name - 쿠키의 이름
   * @param {string} value - 쿠키의 값
   * @param {CookieOptions} [options={}] - 쿠키 설정 옵션
   * @param {string} [options.path='/'] - 쿠키의 경로
   * @param {Date|string|'today'} [options.expires] - 쿠키의 만료 날짜, 'today'일 경우 오늘 자정으로 설정
   * @param {string} [options.domain] - 쿠키의 도메인
   * @param {boolean} [options.secure] - 보안 쿠키인지 여부
   * @param {boolean} [options.httpOnly] - HttpOnly 쿠키인지 여부
   * @param {number} [options.maxAge] - 쿠키의 최대 수명(초)
   */
  setCookie: (name: string, value: string, options: CookieOptions = {}) => {
    options = {
      path: '/',
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    if (options.expires === 'today') {
      const today = new Date();
      today.setHours(24, 0, 0, 0);
      options.expires = today.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      const key = optionKey as keyof typeof options;

      updatedCookie += '; ' + key;

      let optionValue = options[key];

      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  },

  /**
   * 지정된 이름의 쿠키 값을 가져옵니다.
   *
   * @param {string} name - 가져올 쿠키의 이름
   * @returns {string|undefined} - 쿠키의 값 또는 쿠키가 존재하지 않으면 undefined
   */
  getCookie: (name: string): string | undefined => {
    if (typeof window === 'undefined') return;

    const cookieName = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }

    return;
  },

  /**
   * 지정된 이름의 쿠키를 삭제합니다.
   *
   * @param {string} name - 삭제할 쿠키의 이름
   */
  deleteCookie: (name: string) => {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    cookieKit.setCookie(name, '', {
      expires: date,
    });
  },

  /**
   * 지정된 이름의 쿠키가 존재하는지 확인합니다.
   *
   * @param {string} name - 확인할 쿠키의 이름
   * @returns {boolean} - 쿠키가 존재하면 true, 그렇지 않으면 false
   */
  hasCookie: (name: string): boolean => {
    return !!cookieKit.getCookie(name);
  },
};
export default cookieKit;
