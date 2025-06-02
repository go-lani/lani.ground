type Ellipsis = {
  value: string;
  length: number;
  dir?: 'right' | 'left';
};

/**
 * 문자열과 관련된 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} getCutString - 문자열을 지정된 길이로 잘라서 '...'을 추가합니다.
 * @property {Function} transformToQueryString - 객체를 쿼리 문자열로 변환합니다.
 * @property {Function} transformFirstCharUpperCase - 문자열의 첫 문자를 대문자로 변환합니다.
 */
const stringKit = {
  /**
   * 문자열을 지정된 길이로 잘라서 '...'을 추가합니다.
   *
   * @param {string} params.value - 자를 문자열
   * @param {number} params.length - 자를 길이
   * @param {'right'|'left'} [params.dir='right'] - 자를 방향 ('right' 또는 'left')
   * @returns {string} - 잘라진 문자열
   */
  getCutString: ({ value, length, dir = 'right' }: Ellipsis) => {
    if (value.length > length) {
      if (dir === 'left') return '...' + value.slice(value.length - length);
      return value.slice(0, length) + '...';
    }
    return value;
  },

  /**
   * 객체를 쿼리 문자열로 변환합니다.
   *
   * @param {Record<string, unknown>|undefined} params - 쿼리 문자열로 변환할 객체
   * @param {Object} options - 옵션 객체
   * @param {boolean} [options.encode] - 인코딩 여부
   * @returns {string} - 쿼리 문자열
   * @throws {Error} - 객체가 값으로 포함된 경우 에러를 발생시킵니다.
   */
  transformToQueryString: (
    params: Record<string, unknown> | undefined,
    options: {
      encode?: boolean;
    } = { encode: false },
  ): string => {
    const queryParts: string[] = [];

    if (!params) return '';

    Object.entries(params).forEach(([key, initialValue]) => {
      const value =
        typeof initialValue === 'boolean' || typeof initialValue === 'number'
          ? JSON.stringify(initialValue)
          : initialValue;
      const isObject = initialValue?.constructor === Object;

      if (!value) return;
      if (isObject) throw new Error(`객체는 올 수 없습니다.`);

      if (Array.isArray(value)) {
        const uniqueValue = Array.from(new Set(value));
        const encodedValues = options.encode
          ? uniqueValue.map((v) => encodeURIComponent(String(v)))
          : uniqueValue;
        queryParts.push(`${key}=${encodedValues.join(`&${key}=`)}`);
        return;
      }
      const encodedValue = options.encode
        ? encodeURIComponent(String(value))
        : value;

      queryParts.push(`${key}=${encodedValue}`);
    });

    return queryParts.length ? `?${queryParts.join('&')}` : '';
  },

  /**
   * 문자열의 첫 문자를 대문자로 변환합니다.
   *
   * @param {string} str - 변환할 문자열
   * @returns {string} - 첫 문자가 대문자로 변환된 문자열
   */
  transformFirstCharUpperCase: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * 문자열의 중간 부분을 '*' 문자로 마스킹 처리합니다.
   * @param input 마스킹할 문자열
   * @returns 마스킹된 문자열
   * @example
   * maskString('홍길동') // '홍*동'
   * maskString('김철수') // '김*수'
   * maskString('A') // 'A'
   * maskString('AB') // 'A*'
   */
  maskString(input: string): string {
    if (input.length === 2) return input[0] + '*';
    if (input.length < 2) return input;
    return input[0] + '*'.repeat(input.length - 2) + input[input.length - 1];
  },
};

export default stringKit;
