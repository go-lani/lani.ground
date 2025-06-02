import React, { useCallback, useEffect, useState } from 'react';
import {
  getInitialViewMonth,
  isSameDay,
  setEndOfDay,
  setStartOfDay,
} from '../utils/date';
import { CalendarCore } from './CalendarCore';

const CALENDAR_CONSTANTS = {
  MONTHS_IN_YEAR: 12,
  LAST_MONTH_INDEX: 11,
  FIRST_MONTH_INDEX: 0,
  FIRST_DAY_OF_MONTH: 1,
} as const;

interface CalendarProps {
  // 타입에 따른 값
  type?: 'date' | 'range';

  // 단일 날짜 선택용
  date?: Date | null;
  onDateChange?: (date: Date | null) => void;

  // 범위 선택용
  range?: [Date | null, Date | null];
  onRangeChange?: (range: [Date | null, Date | null]) => void;

  // 선택적 props (기본값 제공)
  calendarType?: 'default' | 'multiple' | 'scroll';
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  weekDays?: string[];
  weekendColor?: string;
  holidayColor?: string;
  holidays?: Date[];
  quickSelectOptions?: {
    label: string;
    days: number;
  }[];
  enableReset?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  type = 'date',
  date,
  onDateChange,
  range = [null, null],
  onRangeChange,
  calendarType = 'default',
  className,
  minDate,
  maxDate,
  weekDays,
  weekendColor,
  holidayColor,
  holidays,
  quickSelectOptions,
  enableReset,
}) => {
  const isScroll = calendarType === 'scroll';
  const isDateMode = type === 'date';

  // 요구사항에 따른 초기 baseViewMonth 설정
  const [baseViewMonth, setBaseViewMonth] = useState(() =>
    getInitialViewMonth(date, minDate, maxDate),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    isDateMode ? (date ? setStartOfDay(date) : null) : null,
  );
  const [startDate, setStartDate] = useState<Date | null>(
    !isDateMode && range?.[0] ? setStartOfDay(range[0]) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    !isDateMode && range?.[1] ? setStartOfDay(range[1]) : null,
  );
  const [selectedQuickOption, setSelectedQuickOption] = useState<{
    label: string;
    days: number;
  } | null>(null);

  const handleNextMonth = useCallback(() => {
    setBaseViewMonth((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      const nextYear =
        prevDate.getFullYear() +
        Math.floor(nextMonth / CALENDAR_CONSTANTS.MONTHS_IN_YEAR);
      return new Date(
        nextYear,
        nextMonth % CALENDAR_CONSTANTS.MONTHS_IN_YEAR,
        CALENDAR_CONSTANTS.FIRST_DAY_OF_MONTH,
      );
    });
  }, []);

  const handleYearChange = useCallback(
    (direction: 'prev' | 'next', targetMonth?: number) => {
      setBaseViewMonth((prev) => {
        const currentYear = prev.getFullYear();
        const newMonth =
          targetMonth !== undefined
            ? targetMonth
            : direction === 'prev'
            ? 11
            : 0;
        const newYear = currentYear + (direction === 'prev' ? -1 : 1);
        return new Date(newYear, newMonth, 1);
      });
    },
    [],
  );

  const handleDateClick = useCallback(
    (day: Date) => {
      const normalizedDay = setStartOfDay(day);

      // 날짜가 유효 범위를 벗어났는지 확인
      const isBeforeMinDate = minDate && normalizedDay < setStartOfDay(minDate);
      const isAfterMaxDate = maxDate && normalizedDay > setStartOfDay(maxDate);

      if (isBeforeMinDate || isAfterMaxDate) {
        return;
      }

      if (isDateMode) {
        // 단일 날짜 선택 모드
        setSelectedDate(normalizedDay);
        onDateChange?.(normalizedDay);
      } else {
        // 범위 선택 모드
        // 빠른 선택 옵션이 선택된 상태에서 날짜 클릭
        if (selectedQuickOption) {
          const optionDays = selectedQuickOption.days;

          // 클릭한 날짜를 기준으로 이전 n일 자동 설정 (endDate 기준)
          const endDateValue = normalizedDay;
          let startDateValue = new Date(normalizedDay);
          startDateValue.setDate(startDateValue.getDate() - (optionDays - 1));

          // minDate/maxDate 체크 및 조정
          if (minDate && startDateValue < setStartOfDay(minDate)) {
            startDateValue = new Date(setStartOfDay(minDate));
          }

          let adjustedEndDate = endDateValue;
          if (maxDate && adjustedEndDate > setStartOfDay(maxDate)) {
            adjustedEndDate = new Date(setStartOfDay(maxDate));
          }

          setStartDate(setStartOfDay(startDateValue));
          setEndDate(setEndOfDay(adjustedEndDate));
          setSelectedQuickOption(null); // 옵션 선택 해제
          onRangeChange?.([
            setStartOfDay(startDateValue),
            setEndOfDay(adjustedEndDate),
          ]);
          return;
        }

        if (!startDate || (startDate && endDate) || normalizedDay < startDate) {
          // 시작일 선택
          setStartDate(normalizedDay);
          setEndDate(null);
          onRangeChange?.([normalizedDay, null]);
        } else {
          // 종료일 선택
          const normalizedStartDate = setStartOfDay(startDate);
          const normalizedEndDate = isSameDay(
            normalizedStartDate,
            normalizedDay,
          )
            ? setEndOfDay(normalizedDay)
            : normalizedDay;

          setEndDate(normalizedEndDate);
          onRangeChange?.([normalizedStartDate, normalizedEndDate]);
        }
      }
    },
    [
      isDateMode,
      startDate,
      endDate,
      onDateChange,
      onRangeChange,
      minDate,
      maxDate,
      selectedQuickOption,
    ],
  );

  const handleQuickOptionClick = useCallback(
    (option: { label: string; days: number }) => {
      if (!isDateMode) {
        if (startDate && !endDate) {
          // startDate가 선택된 상태에서 빠른 옵션 클릭: 옵션에 따른 endDate 설정
          const optionDays = option.days;
          let endDateValue = new Date(startDate);
          endDateValue.setDate(endDateValue.getDate() + (optionDays - 1));

          // maxDate 체크 및 조정
          if (maxDate && endDateValue > maxDate) {
            endDateValue = new Date(maxDate);
          }

          setEndDate(setEndOfDay(endDateValue));
          setSelectedQuickOption(null);
          onRangeChange?.([startDate, setEndOfDay(endDateValue)]);
        } else {
          // 빠른 옵션만 선택된 상태: 다음 날짜 클릭을 기다림
          setSelectedQuickOption(option);
          setStartDate(null);
          setEndDate(null);
          onRangeChange?.([null, null]);
        }
      }
    },
    [isDateMode, startDate, endDate, onRangeChange, maxDate],
  );

  const handleClearClick = useCallback(() => {
    if (isDateMode) {
      setSelectedDate(null);
      onDateChange?.(null);
    } else {
      setStartDate(null);
      setEndDate(null);
      setSelectedQuickOption(null);
      onRangeChange?.([null, null]);
    }
  }, [isDateMode, onDateChange, onRangeChange]);

  const handlePrevMonth = useCallback(() => {
    setBaseViewMonth((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      const prevYear =
        prevDate.getFullYear() +
        Math.floor(prevMonth / CALENDAR_CONSTANTS.MONTHS_IN_YEAR);
      return new Date(
        prevYear,
        prevMonth < CALENDAR_CONSTANTS.FIRST_MONTH_INDEX
          ? CALENDAR_CONSTANTS.LAST_MONTH_INDEX
          : prevMonth,
        CALENDAR_CONSTANTS.FIRST_DAY_OF_MONTH,
      );
    });
  }, []);

  // props 변경 시 내부 상태 업데이트 (selectedDate, startDate, endDate만)
  useEffect(() => {
    if (isDateMode) {
      setSelectedDate(date ? setStartOfDay(date) : null);
    } else {
      setStartDate(range?.[0] ? setStartOfDay(range[0]) : null);
      setEndDate(range?.[1] ? setStartOfDay(range[1]) : null);
    }
  }, [
    date?.getTime(),
    isDateMode,
    range?.[0]?.getTime(),
    range?.[1]?.getTime(),
  ]);

  return (
    <div className="calendar-container">
      <CalendarCore
        className={className}
        baseViewMonth={baseViewMonth}
        selectedDate={isDateMode ? selectedDate || undefined : undefined}
        startDate={!isDateMode ? startDate || undefined : undefined}
        endDate={!isDateMode ? endDate || undefined : undefined}
        onDateClick={handleDateClick}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        type={type}
        minDate={minDate}
        maxDate={maxDate}
        weekDays={weekDays}
        weekendColor={weekendColor}
        holidayColor={holidayColor}
        holidays={holidays}
        scrollMode={isScroll}
        onYearChange={handleYearChange}
        isCustom={true}
      />
      {(!quickSelectOptions || quickSelectOptions.length === 0) &&
        enableReset && (
          <div className="quick-select-options">
            <button
              className="quick-option clear-option"
              onClick={handleClearClick}
            >
              초기화
            </button>
          </div>
        )}
      {type === 'range' &&
        quickSelectOptions &&
        quickSelectOptions.length > 0 && (
          <div className="quick-select-options">
            {enableReset && (
              <button
                className="quick-option clear-option"
                onClick={handleClearClick}
              >
                초기화
              </button>
            )}
            {quickSelectOptions.map((option, index) => (
              <button
                key={index}
                className={`quick-option ${
                  selectedQuickOption?.days === option.days ? 'selected' : ''
                }`}
                onClick={() => handleQuickOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
    </div>
  );
};

export default Calendar;
