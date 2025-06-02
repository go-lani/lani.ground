/**
 * 객체와 관련된 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} isEmptyObject - 주어진 객체가 빈 객체인지 확인합니다.
 * @property {Function} getCompleteObject - 값이 undefined이거나 null인 키를 제거하여 완전한 객체를 반환합니다.
 */

const objectKit = {
  /**
   * 주어진 객체가 빈 객체인지 확인합니다.
   * @param {Record<string, unknown>} obj - 체크할 객체
   * @returns {boolean} - 객체가 빈 객체일 경우 true, 그렇지 않으면 false
   */
  isEmptyObject: (obj: Record<string, unknown>): boolean =>
    obj.constructor === Object && Object.keys(obj).length === 0,

  /**
   * 값이 undefined이거나 null인 키를 제거하여 완전한 객체를 반환합니다.
   * @param {Record<string | number, unknown>} obj - 처리할 객체
   * @returns {Record<string | number, unknown>} - 값이 유효한 프로퍼티만 남긴 객체
   */
  getCompleteObject: (
    obj: Record<string | number, unknown>,
  ): Record<string | number, unknown> => {
    for (const key in obj) {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    }
    return obj;
  },

  getObjectKeyByValue<T extends Record<string, string>>(
    obj: T,
    targetValue: string,
  ): keyof T | null {
    return (
      (Object.entries(obj).find(
        ([, value]) => value === targetValue,
      )?.[0] as keyof T) || null
    );
  },
};

export default objectKit;
