import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarCore } from './components/CalendarCore';
import {
  getInitialViewMonth,
  isSameDay,
  setEndOfDay,
  setStartOfDay,
} from './utils/date';

const CALENDAR_CONSTANTS = {
  SINGLE_CALENDAR_WIDTH: 320,
  CALENDAR_PADDING: 16,
  MONTHS_IN_YEAR: 12,
  LAST_MONTH_INDEX: 11,
  FIRST_MONTH_INDEX: 0,
  FIRST_DAY_OF_MONTH: 1,
  DEFAULT_FORMAT: 'YYYY-MM-DD',
} as const;

interface RangePickerProps {
  range: [Date | null, Date | null];
  onChange: (range: [Date | null, Date | null]) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  calendarType?: 'default' | 'multiple' | 'scroll';
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  weekDays?: string[];
  weekendColor?: string;
  holidayColor?: string;
  holidays?: Date[];
  disabled?: boolean;
  activeInput?: 'start' | 'end' | null;
  onActiveInputChange?: (activeInput: 'start' | 'end' | null) => void;
  quickSelectOptions?: {
    label: string;
    days: number;
  }[];
  enableReset?: boolean;
  autoClose?: boolean;
}

const RangePickerComponent: React.FC<RangePickerProps> = ({
  range,
  onChange,
  isOpen,
  onOpenChange,
  className,
  minDate,
  maxDate,
  weekDays,
  weekendColor,
  holidayColor,
  holidays,
  onActiveInputChange,
  calendarType = 'default',
  disabled,
  activeInput = null,
  quickSelectOptions,
  enableReset,
  autoClose = false,
}) => {
  const isMultiple = calendarType === 'multiple';
  const isScroll = calendarType === 'scroll';

  const [baseViewMonth, setBaseViewMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(
    range?.[0] ? setStartOfDay(range[0]) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    range?.[1] ? setStartOfDay(range[1]) : null,
  );
  const [shouldWrap, setShouldWrap] = useState(false);
  const [selectedQuickOption, setSelectedQuickOption] = useState<{
    label: string;
    days: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const calendarsRef = useRef<HTMLDivElement>(null);

  const checkLayout = useCallback(() => {
    if (!isMultiple || !containerRef.current || !isOpen) return;

    const singleCalendarWidth =
      CALENDAR_CONSTANTS.SINGLE_CALENDAR_WIDTH +
      CALENDAR_CONSTANTS.CALENDAR_PADDING;
    const totalCalendarWidth = singleCalendarWidth * 2;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const availableWidth = viewportWidth - containerRect.left;
    const shouldWrapNow = totalCalendarWidth > availableWidth;

    setShouldWrap(shouldWrapNow);
  }, [isMultiple, isOpen]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onOpenChange?.(false);
        onActiveInputChange?.(null);
      }
    },
    [onOpenChange, onActiveInputChange],
  );

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
        // 현재 년도
        const currentYear = prev.getFullYear();

        // 타겟 월 (지정된 경우 사용, 아니면 방향에 따라 설정)
        // 이전 버튼: 현재 보이는 월 유지, 다음 버튼: 현재 보이는 월 유지
        const newMonth =
          targetMonth !== undefined
            ? targetMonth
            : direction === 'prev'
              ? 11
              : 0;

        // 년도 변경 (항상 +1 또는 -1)
        const newYear = currentYear + (direction === 'prev' ? -1 : 1);

        // 새 날짜 생성
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
        onActiveInputChange?.(null);
        if (autoClose) {
          onOpenChange?.(false);
        }
        onChange?.([
          setStartOfDay(startDateValue),
          setEndOfDay(adjustedEndDate),
        ]);
        return;
      }

      if (!startDate || (startDate && endDate) || normalizedDay < startDate) {
        // 시작일 선택
        setStartDate(normalizedDay);
        setEndDate(null);
        onActiveInputChange?.('end');
        onChange?.([normalizedDay, null]);
      } else {
        // 종료일 선택
        const normalizedStartDate = setStartOfDay(startDate);
        const normalizedEndDate = isSameDay(normalizedStartDate, normalizedDay)
          ? setEndOfDay(normalizedDay)
          : normalizedDay;

        setEndDate(normalizedEndDate);
        onActiveInputChange?.(null);
        if (autoClose) {
          onOpenChange?.(false);
        }
        onChange?.([normalizedStartDate, normalizedEndDate]);
      }
    },
    [
      startDate,
      endDate,
      onChange,
      minDate,
      maxDate,
      onActiveInputChange,
      onOpenChange,
      selectedQuickOption,
      autoClose,
    ],
  );

  const handleQuickOptionClick = useCallback(
    (option: { label: string; days: number }) => {
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
        onActiveInputChange?.(null);
        if (autoClose) {
          onOpenChange?.(false);
        }
        onChange?.([startDate, setEndOfDay(endDateValue)]);
      } else {
        // 빠른 옵션만 선택된 상태: 다음 날짜 클릭을 기다림
        setSelectedQuickOption(option);
        setStartDate(null);
        setEndDate(null);
        onActiveInputChange?.(null);
        onChange?.([null, null]);
      }
    },
    [
      startDate,
      endDate,
      onChange,
      onActiveInputChange,
      maxDate,
      autoClose,
      onOpenChange,
    ],
  );

  const handleClearClick = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectedQuickOption(null);
    onActiveInputChange?.(null);
    onChange?.([null, null]);
  }, [onChange, onActiveInputChange]);

  const handleConfirmClick = useCallback(() => {
    onOpenChange?.(false);
    onActiveInputChange?.(null);
  }, [onOpenChange, onActiveInputChange]);

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

  useEffect(() => {
    setStartDate(range?.[0] ? setStartOfDay(range[0]) : null);
    setEndDate(range?.[1] ? setStartOfDay(range[1]) : null);

    // range 값 변경 시 baseViewMonth 업데이트
    let newBaseViewDate: Date;

    if (range?.[1]) {
      // endDate가 있으면 endDate 기준
      newBaseViewDate = new Date(
        range[1].getFullYear(),
        range[1].getMonth(),
        1,
      );
    } else if (range?.[0]) {
      // endDate가 없고 startDate가 있으면 startDate 기준
      newBaseViewDate = new Date(
        range[0].getFullYear(),
        range[0].getMonth(),
        1,
      );
    } else if (minDate && maxDate) {
      // range가 null이고 minDate와 maxDate가 둘 다 있으면
      newBaseViewDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    } else if (minDate && minDate > new Date()) {
      // minDate만 있고 오늘보다 이후면 minDate 기준
      newBaseViewDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    } else if (maxDate && maxDate < new Date()) {
      // maxDate만 있고 오늘보다 이전이면 maxDate 기준
      newBaseViewDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    } else {
      // 모든 조건에 해당하지 않으면 현재 날짜 기준
      const now = new Date();
      newBaseViewDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    setBaseViewMonth(newBaseViewDate);
  }, [range, minDate, maxDate]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(checkLayout, 0);
    const resizeObserver = new ResizeObserver(() => {
      checkLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', checkLayout);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkLayout);
    };
  }, [checkLayout, isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // 팝업이 열릴 때 startDate와 endDate가 모두 있으면 기본적으로 startDate 필드에 active 클래스 적용
  useEffect(() => {
    if (isOpen && startDate && endDate && !activeInput) {
      onActiveInputChange?.('start');
    }
  }, [isOpen, startDate, endDate, activeInput, onActiveInputChange]);

  // 팝업 열릴 때 초기 월 설정
  useEffect(() => {
    if (!isOpen) return;

    let newBaseViewDate: Date;

    // 값이 설정되어 있는 경우 우선순위: endDate > startDate
    if (endDate) {
      newBaseViewDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    } else if (startDate) {
      newBaseViewDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1,
      );
    } else {
      // 값이 설정되어 있지 않은 경우 요구사항에 따른 설정
      newBaseViewDate = getInitialViewMonth(null, minDate, maxDate);
    }

    setBaseViewMonth(newBaseViewDate);
  }, [isOpen, startDate, endDate, minDate, maxDate]);

  // 스크롤 모드에서 특정 월로 스크롤 위치 조정
  useEffect(() => {
    if (!isOpen || !isScroll || !calendarsRef.current) return;

    // DOM이 완전히 업데이트될 때까지 대기
    const timer = setTimeout(() => {
      // 스크롤 컨테이너 찾기
      const scrollContainer = calendarsRef.current?.querySelector(
        '.calendar-scroll-container',
      );
      if (!scrollContainer) return;

      // 타겟 월 찾기
      const targetMonthIndex = baseViewMonth.getMonth();
      const monthContainers = scrollContainer.querySelectorAll(
        '.calendar-month-container',
      );

      if (monthContainers.length === 0) return;

      // 타겟 월 컨테이너 찾기
      let targetContainer: HTMLElement | null = null;
      Array.from(monthContainers).forEach((container) => {
        const el = container as HTMLElement;
        const monthHeader = el.querySelector('.calendar-month-header');
        if (monthHeader) {
          const monthText = monthHeader.textContent || '';
          const monthMatch = monthText.match(/(\d+)월/);
          if (
            monthMatch &&
            monthMatch[1] &&
            parseInt(monthMatch[1], 10) - 1 === targetMonthIndex
          ) {
            targetContainer = el;
          }
        }
      });

      // 스크롤 위치 조정
      if (targetContainer) {
        let scrollPosition = 0;
        const allMonths = Array.from(monthContainers) as HTMLElement[];
        const targetIndex = allMonths.indexOf(targetContainer);

        for (let i = 0; i < targetIndex; i++) {
          scrollPosition += allMonths[i].offsetHeight;
        }

        // 1월이면 스크롤을 살짝 아래로 이동시켜 이전 년도로 넘어가는 동작을 부드럽게 함
        const isJanuary = targetMonthIndex === 0;
        if (isJanuary) {
          scrollPosition += 20;
        }

        // 스크롤 위치 설정
        (scrollContainer as HTMLElement).scrollTop = scrollPosition;
      }
    }, 150); // DOM 업데이트를 위한 충분한 대기 시간

    return () => clearTimeout(timer);
  }, [isOpen, isScroll, baseViewMonth]);

  if (!isOpen || disabled) return null;

  return (
    <div
      className={`range-picker ${calendarType} ${className || ''}`}
      ref={containerRef}
    >
      <div
        className={`picker-popup ${isMultiple ? 'multiple' : ''} ${shouldWrap ? 'wrap' : ''}`}
        ref={popupRef}
      >
        <div className="picker-popup-content">
          <div ref={calendarsRef} className="calendars-container">
            {!isScroll &&
              Array.from({ length: isMultiple ? 2 : 1 }, (_, i) => (
                <div key={i} className="calendar-wrapper">
                  <CalendarCore
                    baseViewMonth={baseViewMonth}
                    startDate={startDate}
                    endDate={endDate}
                    offset={i}
                    multipleCalendars={isMultiple}
                    onDateClick={handleDateClick}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                    type="range"
                    minDate={minDate}
                    maxDate={maxDate}
                    weekDays={weekDays}
                    weekendColor={weekendColor}
                    holidayColor={holidayColor}
                    holidays={holidays}
                    scrollMode={false}
                    isCustom={false}
                  />
                </div>
              ))}
            {isScroll && (
              <div className="calendar-wrapper">
                <CalendarCore
                  baseViewMonth={baseViewMonth}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                  type="range"
                  minDate={minDate}
                  maxDate={maxDate}
                  weekDays={weekDays}
                  weekendColor={weekendColor}
                  holidayColor={holidayColor}
                  holidays={holidays}
                  scrollMode={true}
                  onYearChange={handleYearChange}
                  isCustom={false}
                />
              </div>
            )}
          </div>
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
          {quickSelectOptions && quickSelectOptions.length > 0 && (
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
                  className={`quick-option ${selectedQuickOption?.days === option.days ? 'selected' : ''}`}
                  onClick={() => handleQuickOptionClick(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          {!autoClose && (
            <div className="picker-footer">
              <button
                className="quick-option confirm-option"
                onClick={handleConfirmClick}
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const RangePicker = React.memo(
  RangePickerComponent,
  (prevProps, nextProps) => {
    if (
      (prevProps.range?.[0]?.getTime() === nextProps.range?.[0]?.getTime() ||
        (prevProps.range?.[0] === null && nextProps.range?.[0] === null)) &&
      (prevProps.range?.[1]?.getTime() === nextProps.range?.[1]?.getTime() ||
        (prevProps.range?.[1] === null && nextProps.range?.[1] === null))
    ) {
      return prevProps.isOpen === nextProps.isOpen;
    }
    return false;
  },
);

export default RangePicker;
