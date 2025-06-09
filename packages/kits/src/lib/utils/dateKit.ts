type TDisplayDate = {
  date: string;
  offset?: string; // offset을 지정하지 않는다면 로컬 시간대를 기준으로 한다.
  format?: string;
};

type TValueByUnit = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

const padStart = (value: number, length: number, pad = '0') => {
  const s = String(value);
  if (!s || s.length >= length) return value;
  return `${Array(length + 1 - s.length).join(pad)}${value}`;
};

/**
 * 날짜와 관련된 유틸리티 함수들을 제공하는 객체입니다.
 *
 * @property {Function} getUTC0Info - 주어진 날짜의 UTC0 기준 날짜 정보를 반환합니다.
 * @property {Function} displayDateFormat - 주어진 날짜를 지정된 형식으로 포맷팅하여 반환합니다.
 */
const dateKit = {
  /**
   * 날짜 문자열에 Zulu 시간을 추가합니다.
   *
   * @param {string} date - 날짜 문자열
   * @returns {string} - Zulu 시간이 추가된 날짜 문자열
   */
  addZuluTime: (date: string) => {
    const hasZuluTime = date.endsWith('Z');

    if (!hasZuluTime) date += 'Z';

    return date;
  },

  /**
   * 날짜 객체에서 연도, 월, 일, 시간, 분, 초, 밀리초 값을 추출하여 반환합니다.
   *
   * @param {Date} date - 날짜 객체
   * @returns {TValueByUnit} - 날짜 구성 요소 객체
   */
  getValueByUnit: (date: Date): TValueByUnit => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  },

  /**
   * 주어진 날짜를 지정된 형식으로 포맷팅합니다.
   *
   * @param {Date|string} date - 포맷팅할 날짜 객체 또는 날짜 문자열
   * @param {string} format - 날짜 형식 문자열
   * @returns {string} - 포맷팅된 날짜 문자열
   */
  formatDate: (date: Date | string | null, format: string) => {
    if (date === null) return '';

    const REGEX_FORMAT =
      /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

    const { year, month, day, hours, minutes, seconds, milliseconds } =
      typeof date === 'string'
        ? dateKit.getValueByUnit(new Date(date.replace('Z', ''))) // UTC-0이 아닌 값에 대한 formatting 대응
        : dateKit.getValueByUnit(date);

    const get12Hours = (num: number) => padStart(hours % 12 || 12, num);

    const getAPM = (hours: number, isLowercase: boolean) => {
      const m = hours < 12 ? 'AM' : 'PM';
      return isLowercase ? m.toLowerCase() : m;
    };

    const matches = (match: string) => {
      switch (match) {
        case 'YY':
          return String(year).slice(-2);
        case 'YYYY':
          return padStart(year, 4);
        case 'M':
          return month;
        case 'MM':
          return padStart(month, 2);
        case 'D':
          return day;
        case 'DD':
          return padStart(day, 2);
        case 'd':
          return new Date(year, month - 1, day).getDay();
        case 'dd':
          return ['일', '월', '화', '수', '목', '금', '토'][
            new Date(year, month - 1, day).getDay()
          ];
        case 'ddd':
          return [
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
          ][new Date(year, month - 1, day).getDay()];
        case 'dddd':
          return [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ][new Date(year, month - 1, day).getDay()];
        case 'H':
          return hours;
        case 'HH':
          return padStart(hours, 2);
        case 'h':
          return get12Hours(1);
        case 'hh':
          return get12Hours(2);
        case 'a':
          return getAPM(hours, true);
        case 'A':
          return getAPM(hours, false);
        case 'm':
          return minutes;
        case 'mm':
          return padStart(minutes, 2);
        case 's':
          return seconds;
        case 'ss':
          return padStart(seconds, 2);
        case 'SSS':
          return padStart(milliseconds, 3);
        default:
          break;
      }

      return null;
    };
    return format.replace(REGEX_FORMAT, (match, $1) => $1 || matches(match));
  },

  /**
   * 오프셋 문자열을 밀리초로 변환합니다.
   *
   * @param {string} offset - 오프셋 문자열, 예: '+03:00', '-07:00'
   * @returns {number} - 밀리초 단위의 오프셋
   * @throws {Error} - 유효하지 않은 오프셋 형식일 경우
   */
  parseOffset: (offset: string): number => {
    const sign = offset.charAt(0) === '-' ? -1 : 1;
    const offsetParts = offset.match(/(\d+)(?::(\d+))?/);

    if (!offsetParts) {
      throw new Error('Invalid offset format');
    }

    const hours = parseInt(offsetParts[1], 10);
    const minutes = parseInt(offsetParts[2] || '0', 10);

    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error('Invalid offset format');
    }

    return sign * (hours * 60 + minutes) * 60 * 1000;
  },

  /**
   * 주어진 날짜를 지정된 오프셋 및 포맷으로 포맷팅하여 반환합니다.
   * date를 string으로 받는 이유는 new Date를 선언하게되면 Locale Offset이 적용되며 Zulu time이 붙는다.
   * Localtime이 적용 안 된 상태에서 Z를 넣음으로서 input데이터가 Z 여부 상관 없이 동일한 output을 낼 수 있게 된다.
   * 주의: new Date로 객체를 만드는 순간 해당 Date 객체는 지역 시간대의 영향을 받게 된다.
   * offset 리스트: https://en.wikipedia.org/wiki/List_of_UTC_offsets
   *
   * @param {TDisplayDate} params - 날짜와 관련된 파라미터 객체
   * @param {string} params.date - 포맷팅할 날짜 문자열
   * @param {string} [params.offset='8'] - 날짜 문자열의 오프셋, 기본값은 '8'
   * @param {string} [params.format='YYYY-MM-DD'] - 날짜 포맷 문자열, 기본값은 'YYYY-MM-DD'
   * @returns {string | undefined} - 포맷팅된 날짜 문자열, 입력된 날짜가 없으면 undefined 반환
   */
  displayDateFormat: ({
    date,
    offset = '8',
    format = 'YYYY-MM-DD',
  }: TDisplayDate) => {
    if (!date) return;

    let updatedDate: Date | string = date;

    const unifiedDateString = offset
      ? date.replace('Z', '')
      : dateKit.addZuluTime(date);
    const timeDiff = offset ? dateKit.parseOffset(offset) : 0;

    const unifiedTimestamp = new Date(unifiedDateString).getTime();

    updatedDate = new Date(unifiedTimestamp + timeDiff);
    return dateKit.formatDate(updatedDate, format);
  },

  /**
   * 주어진 연도가 윤년인지 확인합니다.
   *
   * @param {number} year - 확인할 연도
   * @returns {boolean} - 윤년일 경우 true, 그렇지 않으면 false
   */
  isLeapYear: (year: number) => {
    return new Date(year, 1, 29).getDate() === 29;
  },

  /**
   * 주어진 연도와 월의 마지막 날을 반환합니다.
   *
   * @param {number} year - 연도
   * @param {number} month - 월 (1부터 12까지)
   * @returns {number} - 해당 월의 마지막 날
   */
  getLastDayOfMonth: (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  },

  getUTC0Info: (date: Date, isEndDate = false) => {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate() + Number(isEndDate);

    const lastDayOfMonth = dateKit.getLastDayOfMonth(year, month);

    if (day > lastDayOfMonth) {
      day = 1;
      month += 1;
    }

    if (month > 12) {
      month = 1;
      year += 1;
    }

    return {
      year: String(year),
      month: String(month),
      date: String(day),
      hour: String(date.getUTCHours()),
      minute: String(date.getUTCMinutes()),
      seconds: String(date.getUTCSeconds()),
    };
  },

  /**
   * 현재 시간이 주어진 시작 시간과 종료 시간 사이에 있는지 확인하는 함수
   *
   * @param {Object} params - 파라미터 객체
   * @param {Date | number} params.current - 현재 시간 (new Date() 또는 timestamp)
   * @param {Date} params.startDT - 시작 시간 (ISO 8601 형식의 타임존 오프셋 필수, 예: '224-11-05T00:00:00+08:00' >> UTC+8 기준 0시 0분)
   * @param {Date} params.endDT - 종료 시간 (ISO 8601 형식의 타임존 오프셋 필수, 예: '2024-11-05T10:01:00+08:00' >> UTC+8 기준 1시 0분)
   * @returns {boolean} 현재 시간이 범위 내에 있으면 true, 아니면 false
   *
   * @example
   * const result = isWithinDateRange({
   *   current: new Date(),
   *   startDT: new Date('2024-11-05T00:00:00+08:00'), // UTC+8 기준 00:00:00
   *   endDT: new Date('2024-11-05T10:01:00+08:00'), // UTC+8 기준 10:01:00
   * });
   */
  isWithinDateRange({
    current,
    startDT,
    endDT,
  }: {
    current: Date | number;
    startDT: Date;
    endDT: Date;
  }) {
    const currentTime = current instanceof Date ? current.getTime() : current;

    return currentTime >= startDT.getTime() && currentTime <= endDT.getTime();
  },

  /**
   * 주어진 날짜/시간이 특정 날짜보다 이전인지 확인하는 함수
   * @param {Object} params - 비교할 날짜 정보를 담은 객체
   * @param {Date | number} params.current - 비교할 현재 날짜/시간 (Date 객체 또는 timestamp)
   * @param {Date} params.targetDT - 기준이 되는 날짜(예: new Date('2024-11-27T08:26+08:00') >> UTC+8 기준 8시 25분)
   * @returns {boolean} current가 targetDT보다 이전이면 true, 아니면 false
   * @example
   * const now = new Date();
   * const futureDate = new Date('2024-12-31');
   * isBefore({ current: now, targetDT: futureDate }); // true
   * isBefore({ current: Date.now(), targetDT: futureDate }); // true
   */
  isBefore({ current, targetDT }: { current: Date | number; targetDT: Date }) {
    const currentTime = current instanceof Date ? current.getTime() : current;
    return currentTime < targetDT.getTime();
  },

  /**
   * 주어진 날짜/시간이 특정 날짜보다 이후인지 확인하는 함수
   * @param {Object} params - 비교할 날짜 정보를 담은 객체
   * @param {Date | number} params.current - 비교할 현재 날짜/시간 (Date 객체 또는 timestamp)
   * @param {Date} params.targetDT - 기준이 되는 날짜(예: new Date('2024-11-27T08:26+08:00') >> UTC+8 기준 8시 25분)
   * @returns {boolean} current가 targetDT보다 이후면 true, 아니면 false
   * @example
   * const now = new Date();
   * const pastDate = new Date('2023-12-31');
   * isAfter({ current: now, targetDT: pastDate }); // true
   * isAfter({ current: Date.now(), targetDT: pastDate }); // true
   */
  isAfter({ current, targetDT }: { current: Date | number; targetDT: Date }) {
    const currentTime = current instanceof Date ? current.getTime() : current;
    return currentTime > targetDT.getTime();
  },
};

export default dateKit;
