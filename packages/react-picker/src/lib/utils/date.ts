export const getDaysInMonth = (year: number, month: number) => {
  // 0을 넣으면 해당 설정 달의 이전 달에 마지막 날을 지목
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isSameMonth = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const formatDate = (
  date: Date | null | undefined,
  format: string = 'YYYY-MM-DD',
) => {
  if (!date) return '';

  const year = date.getFullYear();
  const shortYear = String(year).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 패턴 매칭을 위한 정규식
  const patterns = {
    YYYY: String(year),
    YY: shortYear,
    MM: month,
    DD: day,
    HH: String(hours24).padStart(2, '0'),
    hh: String(hours12).padStart(2, '0'),
    mm: minutes,
    ss: seconds,
    aa: ampm,
  };

  // 패턴을 순서대로 정렬하여 긴 패턴부터 치환
  return Object.entries(patterns)
    .sort(([a], [b]) => b.length - a.length)
    .reduce((result, [pattern, value]) => {
      return result.replace(new RegExp(pattern, 'g'), value);
    }, format);
};

export const adjustMonthIndex = (month: number) => {
  if (month < 0) return 11;
  if (month > 11) return 0;
  return month;
};

export const setStartOfDay = (date: Date) => {
  const newDate = new Date(date);

  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const setEndOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * 캘린더에 표시할 날짜 배열을 생성합니다.
 * @param year 년도
 * @param month 월 (0-11)
 * @returns 캘린더에 표시할 날짜 배열
 */
export const generateCalendarDays = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // 이전 달의 날짜들
  const prevMonth = month - 1;
  const prevYear = year + Math.floor(prevMonth / 12);
  const adjustedPrevMonth = prevMonth < 0 ? 11 : prevMonth;
  const prevMonthDays = getDaysInMonth(prevYear, adjustedPrevMonth);

  const prevMonthDates = Array.from(
    { length: firstDayOfMonth },
    (_, i) =>
      new Date(prevYear, adjustMonthIndex(prevMonth), prevMonthDays - i),
  ).reverse();

  // 현재 달의 날짜들
  const currentMonthDates = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );

  // 다음 달의 날짜들 (총 35개 셀 채우기)
  const nextMonth = month + 1;
  const nextYear = year + Math.floor(nextMonth / 12);
  const remainingDays = 35 - (prevMonthDates.length + currentMonthDates.length);

  const nextMonthDates = Array.from(
    { length: remainingDays },
    (_, i) => new Date(nextYear, nextMonth % 12, i + 1),
  );

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

/**
 * 날짜가 범위 내에 있는지 확인합니다.
 * @param day 확인할 날짜
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 범위 내 여부
 */
export const isInRange = (
  day: Date,
  startDate: Date | null,
  endDate: Date | null,
) => {
  if (!startDate || !endDate) return false;
  return day >= startDate && day <= endDate;
};

/**
 * 날짜가 선택 불가능한지 확인합니다.
 * @param day 확인할 날짜
 * @param minDate 최소 날짜
 * @param maxDate 최대 날짜
 * @returns 비활성화 여부
 */
export const isDisabled = (day: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate && day < setStartOfDay(minDate)) return true;
  if (maxDate && day > setStartOfDay(maxDate)) return true;
  return false;
};

/**
 * 날짜가 휴일인지 확인합니다.
 * @param day 확인할 날짜
 * @param holidays 휴일 배열
 * @returns 휴일 여부
 */
export const isHoliday = (day: Date, holidays?: Date[]) => {
  if (!holidays || holidays.length === 0) return false;

  return holidays.some(
    (holiday) =>
      holiday.getDate() === day.getDate() &&
      holiday.getMonth() === day.getMonth() &&
      holiday.getFullYear() === day.getFullYear(),
  );
};

/**
 * 날짜가 토요일인지 확인합니다.
 * @param day 확인할 날짜
 * @returns 토요일 여부
 */
export const isWeekend = (day: Date) => {
  return day.getDay() === 6; // 토요일만 weekend로 처리
};

/**
 * 날짜가 일요일인지 확인합니다.
 * @param day 확인할 날짜
 * @returns 일요일 여부
 */
export const isSunday = (day: Date) => {
  return day.getDay() === 0;
};

/**
 * 날짜에 적용할 색상을 결정합니다.
 * @param day 확인할 날짜
 * @param year 현재 표시 중인 년도
 * @param month 현재 표시 중인 월
 * @param options 추가 옵션
 * @returns 적용할 색상
 */
export const getDayColor = (
  day: Date,
  year: number,
  month: number,
  options: {
    type?: 'date' | 'range';
    selectedDate?: Date;
    startDate?: Date | null;
    endDate?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    weekendColor?: string;
    holidayColor?: string;
    holidays?: Date[];
    scrollMode?: boolean;
  },
) => {
  const {
    type = 'date',
    selectedDate,
    startDate,
    endDate,
    minDate,
    maxDate,
    weekendColor,
    holidayColor,
    holidays,
    scrollMode = false,
  } = options;

  // 비활성화된 날짜인 경우 색상 적용하지 않음
  if (isDisabled(day, minDate, maxDate)) return undefined;

  // 비활성 월 날짜 체크
  const currentMonth = scrollMode ? day.getMonth() : month;
  const currentYear = scrollMode ? day.getFullYear() : year;
  const isOtherMonth = !isSameMonth(
    day,
    new Date(currentYear, currentMonth, 1),
  );

  // 비활성 월 날짜는 색상 적용하지 않음
  if (isOtherMonth) return undefined;

  // 선택된 날짜인 경우 색상 적용하지 않음
  if (
    (type === 'range' &&
      ((startDate && isSameDay(day, startDate)) ||
        (endDate && isSameDay(day, endDate)))) ||
    (type === 'date' && selectedDate && isSameDay(day, selectedDate))
  ) {
    return undefined;
  }

  // 색상 우선순위: 공휴일 > 일요일 > 토요일
  if (holidayColor && (isHoliday(day, holidays) || isSunday(day))) {
    return holidayColor;
  }

  if (weekendColor && isWeekend(day)) {
    return weekendColor;
  }

  return undefined;
};

/**
 * 요구사항에 따른 초기 캘린더 월을 계산합니다.
 * @param currentDate 현재 선택된 날짜 (있으면 해당 월로)
 * @param minDate 최소 날짜
 * @param maxDate 최대 날짜
 * @returns 초기 월 Date 객체
 */
export const getInitialViewMonth = (
  currentDate?: Date | null,
  minDate?: Date,
  maxDate?: Date,
): Date => {
  // 선택된 날짜가 있으면 해당 월로 설정
  if (currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  // 요구사항에 따른 baseViewMonth 설정
  const now = new Date();
  const nowMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (minDate && maxDate) {
    const minDateMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

    if (minDate > now) {
      // 1. minDate가 현재 일자보다 미래라면 minDate의 월
      return minDateMonth;
    } else if (maxDate < now) {
      // 2. maxDate가 현재 일자보다 과거라면 minDate의 월
      return minDateMonth;
    } else {
      // 3. 현재 날짜가 minDate와 maxDate 사이라면 현재 날짜의 월
      return nowMonth;
    }
  } else if (minDate) {
    const minDateMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    if (minDate > now) {
      // minDate가 현재보다 미래면 minDate의 월
      return minDateMonth;
    } else {
      // 현재 날짜가 minDate 이후면 현재 월
      return nowMonth;
    }
  } else if (maxDate) {
    const maxDateMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    if (maxDate < now) {
      // maxDate가 현재보다 과거면 maxDate의 월
      return maxDateMonth;
    } else {
      // 현재 날짜가 maxDate 이전이면 현재 월
      return nowMonth;
    }
  } else {
    // minDate/maxDate가 없으면 현재 월
    return nowMonth;
  }
};
