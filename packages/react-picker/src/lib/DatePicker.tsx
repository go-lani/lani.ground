import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarCore } from './components/CalendarCore';
import { getInitialViewMonth, setStartOfDay } from './utils/date';

// 캘린더 관련 상수
const CALENDAR_CONSTANTS = {
  SINGLE_CALENDAR_WIDTH: 320,
  CALENDAR_PADDING: 16,
  DEFAULT_FORMAT: 'YYYY-MM-DD',
} as const;

interface DatePickerProps {
  date: Date | null;
  onChange: (date: Date) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  calendarType?: 'default' | 'multiple' | 'scroll';
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  weekDays?: string[];
  weekendColor?: string;
  holidayColor?: string;
  holidays?: Date[];
  disabled?: boolean;
  autoClose?: boolean;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  date,
  onChange,
  isOpen,
  onOpenChange,
  minDate,
  maxDate,
  className,
  weekDays,
  weekendColor,
  holidayColor,
  holidays,
  disabled,
  calendarType = 'default',
  autoClose = false,
}) => {
  const isMultiple = calendarType === 'multiple';
  const isScroll = calendarType === 'scroll';

  const [baseViewMonth, setBaseViewMonth] = useState(() => {
    const initialDate = date ? new Date(date) : new Date();
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date ? setStartOfDay(date) : null,
  );
  const [shouldWrap, setShouldWrap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const calendarsRef = useRef<HTMLDivElement>(null);

  // 팝업 열릴 때 초기 월 설정
  useEffect(() => {
    if (!isOpen) return;

    const newBaseViewDate = getInitialViewMonth(selectedDate, minDate, maxDate);
    setBaseViewMonth(newBaseViewDate);
  }, [isOpen, selectedDate, minDate, maxDate]);

  // date prop이 변경되었을 때 상태 업데이트
  useEffect(() => {
    setSelectedDate(date ? setStartOfDay(date) : null);

    // date가 설정되었을 때 baseViewMonth 업데이트
    if (date) {
      const newBaseViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      setBaseViewMonth(newBaseViewDate);
    }
    // date가 null로 설정되었을 때 baseViewMonth를 현재 날짜로 재설정
    else if (date === null) {
      const now = new Date();
      setBaseViewMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    }
  }, [date]);

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

  const handleDateClick = useCallback(
    (date: Date) => {
      const normalizedDate = setStartOfDay(date);

      // 날짜가 유효 범위를 벗어났는지 확인
      const isBeforeMinDate =
        minDate && normalizedDate < setStartOfDay(minDate);
      const isAfterMaxDate = maxDate && normalizedDate > setStartOfDay(maxDate);

      if (isBeforeMinDate || isAfterMaxDate) {
        return;
      }

      setSelectedDate(normalizedDate);
      onChange?.(normalizedDate);
      if (autoClose) {
        onOpenChange?.(false);
      }
    },
    [onChange, minDate, maxDate, onOpenChange, autoClose],
  );

  const handleConfirmClick = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handlePrevMonth = useCallback(() => {
    setBaseViewMonth((prev) => {
      const prevMonth = prev.getMonth() - 1;
      const prevYear = prev.getFullYear() + Math.floor(prevMonth / 12);
      return new Date(prevYear, (prevMonth + 12) % 12, 1);
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setBaseViewMonth((prev) => {
      const nextMonth = prev.getMonth() + 1;
      const nextYear = prev.getFullYear() + Math.floor(nextMonth / 12);
      return new Date(nextYear, nextMonth % 12, 1);
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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onOpenChange?.(false);
      }
    },
    [onOpenChange],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const checkLayout = useCallback(() => {
    if (!isMultiple || !containerRef.current || !isOpen) return;

    // 캘린더 하나의 최소 너비 + 패딩과 여백
    const singleCalendarWidth =
      CALENDAR_CONSTANTS.SINGLE_CALENDAR_WIDTH +
      CALENDAR_CONSTANTS.CALENDAR_PADDING;
    // 두 개의 캘린더 총 너비
    const totalCalendarWidth = singleCalendarWidth * 2;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;

    // 컨테이너의 왼쪽 위치부터 필요한 총 너비가 뷰포트를 벗어나는지 확인
    const availableWidth = viewportWidth - containerRect.left;
    const shouldWrapNow = totalCalendarWidth > availableWidth;

    setShouldWrap(shouldWrapNow);
  }, [isMultiple, isOpen]);

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

  if (!isOpen || disabled) return null;

  return (
    <div
      className={`date-picker ${calendarType} ${className || ''}`}
      ref={containerRef}
    >
      <div
        className={`picker-popup ${isMultiple ? 'multiple' : ''} ${shouldWrap ? 'wrap' : ''}`}
        ref={popupRef}
      >
        <div ref={calendarsRef} className="calendars-container">
          {!isScroll &&
            Array.from({ length: isMultiple ? 2 : 1 }, (_, i) => (
              <div key={i} className="calendar-wrapper">
                <CalendarCore
                  baseViewMonth={baseViewMonth}
                  selectedDate={selectedDate || undefined}
                  offset={i}
                  multipleCalendars={isMultiple}
                  onDateClick={handleDateClick}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
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
                selectedDate={selectedDate || undefined}
                onDateClick={handleDateClick}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
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
  );
};

export const DatePicker = React.memo(
  DatePickerComponent,
  (prevProps, nextProps) => {
    if (prevProps.date === null && nextProps.date === null) {
      return prevProps.isOpen === nextProps.isOpen;
    }
    if (prevProps.date?.getTime() !== nextProps.date?.getTime()) {
      return false;
    }
    return prevProps.isOpen === nextProps.isOpen;
  },
);

export default DatePicker;
