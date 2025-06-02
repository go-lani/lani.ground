const REGEX = {
  email:
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  phone: /^01[0-9]-\d{4}-\d{4}$/,
};

/**
 * 데이터 형식 검증을 위한 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} isValidFormat - 주어진 값이 지정된 형식에 맞는지 확인합니다.
 */

const validateKit = {
  /**
   * 주어진 값이 지정된 형식에 맞는지 확인합니다.
   *
   * @param {Object} params - 검증에 사용할 매개변수 객체
   * @param {'phone'|'email'} params.format - 검증할 형식. 'phone' 또는 'email'을 선택합니다.
   * @param {string} params.value - 검증할 값
   * @returns {boolean} - 값이 지정된 형식에 맞으면 true, 그렇지 않으면 false
   */
  isValidFormat: ({
    format,
    value,
  }: {
    format: 'phone' | 'email';
    value: string;
  }) => {
    return REGEX[format].test(value);
  },
};

export default validateKit;
