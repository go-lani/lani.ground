/**
 * 숫자와 관련된 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} divideNumberToDigits - 숫자를 지정된 자리수마다 구분자로 나누어 문자열로 반환합니다.
 * @property {Function} truncateDecimal - 숫자 또는 문자열을 소수점 이하 지정된 자리수까지 잘라서 문자열로 반환합니다.
 */

const numberKit = {
  /**
   * 숫자를 지정된 자리수마다 구분자로 나누어 문자열로 반환합니다.
   *
   * @param {number} numbers - 구분자를 적용할 숫자
   * @param {string} [divider=','] - 숫자 사이에 삽입할 구분자
   * @param {number} [replaceIdx=3] - 구분자를 삽입할 자리수
   * @returns {string} - 구분자가 적용된 숫자 문자열
   */
  divideNumberToDigits: (numbers: number, divider = ',', replaceIdx = 3) => {
    const NUMBER_WITH_DIVIDER_REGEX = new RegExp(
      `(\\d)(?=(?:\\d{${replaceIdx}})+(?!\\d))`,
      'g',
    );

    return String(numbers).replace(NUMBER_WITH_DIVIDER_REGEX, `$1${divider}`);
  },

  /**
   * 숫자 또는 문자열을 소수점 이하 지정된 자리수까지 잘라서 문자열로 반환합니다.
   * 천 단위 구분자(쉼표)를 사용하여 큰 숫자를 읽기 쉽게 표시합니다.
   *
   * @param {number|string} number - 잘라낼 숫자 또는 문자열
   * @param {number} [decimalPlaces=4] - 소수점 이하 자리수
   * @param {boolean} [removeTrailingZeros=false] - true일 경우, 소수점 이하의 불필요한 0을 제거
   * @returns {string} - 소수점 이하 지정된 자리수까지 잘린 숫자 문자열
   */
  formatDecimalNumber: (
    number: number | string,
    decimalPlaces = 4,
    removeTrailingZeros = false,
  ) => {
    const NUMBER_WITH_DIVIDER_REGEX = /(\d)(?=(?:\d{3})+(?!\d))/g;

    // 입력값을 문자열로 변환하고 지수 표기법 처리
    let numberString =
      typeof number === 'number'
        ? number.toLocaleString('fullwide', {
            useGrouping: false,
            maximumFractionDigits: 20,
          })
        : number.toString();

    // 지수 표기법 처리
    if (numberString.includes('e')) {
      const [base, exponent] = numberString.split('e');
      const exp = parseInt(exponent);
      if (exp < 0) {
        numberString =
          '0.' + '0'.repeat(Math.abs(exp) - 1) + base.replace('.', '');
      } else {
        numberString = base.replace('.', '') + '0'.repeat(exp);
      }
    }

    // 음수 처리
    const isNegative = numberString.startsWith('-');
    if (isNegative) {
      numberString = numberString.slice(1);
    }

    let [integerPart, fractionalPart = ''] = numberString.split('.');

    // 정수 부분에 천 단위 구분자 추가
    integerPart = integerPart.replace(NUMBER_WITH_DIVIDER_REGEX, '$1,');

    if (!fractionalPart || decimalPlaces === 0) {
      return isNegative ? `-${integerPart}` : integerPart;
    }

    let truncatedFractional = fractionalPart
      .slice(0, decimalPlaces)
      .padEnd(decimalPlaces, '0');

    if (removeTrailingZeros) {
      truncatedFractional = truncatedFractional.replace(/0+$/, '');
      if (truncatedFractional === '') {
        return isNegative ? `-${integerPart}` : integerPart;
      }
    }

    const result = `${integerPart}.${truncatedFractional}`;
    return isNegative ? `-${result}` : result;
  },
};
export default numberKit;
