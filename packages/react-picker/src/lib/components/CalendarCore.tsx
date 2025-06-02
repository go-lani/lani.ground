import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generateCalendarDays, setStartOfDay } from '../utils/date';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';

interface CalendarCoreProps {
  className?: string;
  baseViewMonth: Date;
  selectedDate?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  offset?: number;
  multipleCalendars?: boolean;
  onDateClick?: (date: Date) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  type?: 'date' | 'range';
  minDate?: Date;
  maxDate?: Date;
  weekDays?: string[];
  weekendColor?: string;
  holidayColor?: string;
  holidays?: Date[];
  scrollMode?: boolean;
  onYearChange?: (direction: 'prev' | 'next', targetMonth?: number) => void;
  isCustom?: boolean;
}

export const CalendarCore: React.FC<CalendarCoreProps> = ({
  className,
  baseViewMonth,
  selectedDate,
  startDate,
  endDate,
  offset = 0,
  multipleCalendars = false,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  type = 'date',
  minDate,
  maxDate,
  weekDays = ['일', '월', '화', '수', '목', '금', '토'],
  weekendColor,
  holidayColor,
  holidays = [],
  scrollMode = false,
  isCustom = true,
  onYearChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollPositionRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  const [visibleMonthIndex, setVisibleMonthIndex] = useState(
    baseViewMonth.getMonth(),
  );

  // baseViewMonth를 minDate/maxDate 범위에 맞게 조정
  const [adjustedBaseViewMonth, setAdjustedBaseViewMonth] =
    useState(baseViewMonth);

  // baseViewMonth가 변경되면 조정된 월도 업데이트
  useEffect(() => {
    // 사용자가 수동으로 월을 변경한 경우 (prev/next 버튼 클릭)
    // baseViewMonth를 그대로 사용하되, minDate/maxDate 범위를 벗어나지 않도록 제한
    let newAdjustedMonth = baseViewMonth;

    // minDate/maxDate 범위 체크 및 제한
    if (minDate) {
      const minDateMonth = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1,
      );
      if (newAdjustedMonth < minDateMonth) {
        newAdjustedMonth = minDateMonth;
      }
    }

    if (maxDate) {
      const maxDateMonth = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        1,
      );
      if (newAdjustedMonth > maxDateMonth) {
        newAdjustedMonth = maxDateMonth;
      }
    }

    // 현재 adjustedBaseViewMonth와 다를 때만 업데이트
    if (
      adjustedBaseViewMonth.getFullYear() !== newAdjustedMonth.getFullYear() ||
      adjustedBaseViewMonth.getMonth() !== newAdjustedMonth.getMonth()
    ) {
      setAdjustedBaseViewMonth(newAdjustedMonth);
    }
  }, [baseViewMonth, minDate?.getTime(), maxDate?.getTime()]);

  // adjustedBaseViewMonth가 변경되면 visibleMonthIndex도 업데이트
  useEffect(() => {
    setVisibleMonthIndex(adjustedBaseViewMonth.getMonth());
  }, [adjustedBaseViewMonth]);

  const adjustedBaseYear = adjustedBaseViewMonth.getFullYear();

  const isPrevMonthDisabled = useMemo(() => {
    if (!minDate) return false;

    if (scrollMode) {
      // 현재 년도가 minDate의 년도 이하인 경우 이전으로 이동 불가능
      return adjustedBaseYear <= minDate.getFullYear();
    } else {
      const currentMonthIndex =
        offset === 0
          ? adjustedBaseViewMonth.getMonth()
          : adjustedBaseViewMonth.getMonth() - 1;
      const currentYear = adjustedBaseViewMonth.getFullYear();
      const minYear = minDate.getFullYear();
      const minMonth = minDate.getMonth();

      // 년도가 더 작거나, 같은 년도인데 월이 같거나 작으면 비활성화
      return (
        currentYear < minYear ||
        (currentYear === minYear && currentMonthIndex <= minMonth)
      );
    }
  }, [minDate, scrollMode, adjustedBaseYear, adjustedBaseViewMonth, offset]);

  // 다음 월/년 버튼 비활성화 여부 (useMemo 사용)
  const isNextMonthDisabled = useMemo(() => {
    if (!maxDate) return false;

    if (scrollMode) {
      // 현재 년도가 maxDate의 년도 이상인 경우 다음으로 이동 불가능
      return adjustedBaseYear >= maxDate.getFullYear();
    } else {
      const currentMonthIndex =
        offset === 0
          ? adjustedBaseViewMonth.getMonth()
          : adjustedBaseViewMonth.getMonth() + 1;
      const currentYear = adjustedBaseViewMonth.getFullYear();
      const maxYear = maxDate.getFullYear();
      const maxMonth = maxDate.getMonth();

      // 년도가 더 크거나, 같은 년도인데 월이 같거나 크면 비활성화
      return (
        currentYear > maxYear ||
        (currentYear === maxYear && currentMonthIndex >= maxMonth)
      );
    }
  }, [maxDate, scrollMode, adjustedBaseYear, adjustedBaseViewMonth, offset]);

  // 년도 변경 처리 함수 - 스크롤 이벤트에서 호출됨
  const handleYearScroll = useCallback(
    (direction: 'prev' | 'next') => {
      if (!scrollContainerRef.current || isScrollingRef.current) return;

      const container = scrollContainerRef.current;
      isScrollingRef.current = true;

      container.style.scrollBehavior = 'auto';

      // 스크롤 이벤트는 항상 이전 년도의 12월 또는 다음 년도의 1월로 이동
      onYearChange?.(direction);

      setTimeout(() => {
        // 이전/다음 년도에 따라 월 인덱스 설정 (이전: 12월, 다음: 1월)
        setVisibleMonthIndex(direction === 'prev' ? 11 : 0);

        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return;

          // 이전 년도는 아래쪽으로, 다음 년도는 위쪽으로 스크롤
          // 이전 년도로 넘어갈 때 약간 더 여유 있게 스크롤
          const prevYearScrollMargin = 30; // 이전 년도로 넘어갈 때 추가 여백
          const newScrollTop =
            direction === 'prev'
              ? container.scrollHeight -
                container.clientHeight -
                prevYearScrollMargin
              : direction === 'next' && visibleMonthIndex === 11
                ? 25
                : 20;

          container.scrollTop = newScrollTop;
          lastScrollPositionRef.current = newScrollTop;

          setTimeout(() => {
            container.style.scrollBehavior = '';
            isScrollingRef.current = false;
          }, 150);
        });
      }, 200);
    },
    [onYearChange, visibleMonthIndex],
  );

  // 현재 보이는 월 계산 함수
  const calculateVisibleMonth = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const monthContainers = container.querySelectorAll(
      '.calendar-month-container',
    );
    if (monthContainers.length === 0) return;

    let accumulatedHeight = 0;
    let newVisibleMonth = 0;
    let maxVisibleHeight = 0;

    for (let i = 0; i < monthContainers.length; i++) {
      const monthElement = monthContainers[i] as HTMLElement;
      const monthHeight = monthElement.offsetHeight;
      const monthTop = accumulatedHeight;
      const monthBottom = monthTop + monthHeight;

      // 컨테이너의 보이는 영역
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      // 겹치는 영역 계산
      const overlapTop = Math.max(monthTop, containerTop);
      const overlapBottom = Math.min(monthBottom, containerBottom);
      const overlapHeight = Math.max(0, overlapBottom - overlapTop);

      // 가장 많이 보이는 월 선택
      if (overlapHeight > maxVisibleHeight) {
        maxVisibleHeight = overlapHeight;
        newVisibleMonth = i;
      }

      accumulatedHeight += monthHeight;
    }

    if (newVisibleMonth !== visibleMonthIndex) {
      setVisibleMonthIndex(newVisibleMonth);
    }
  }, [visibleMonthIndex]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;

    const container = scrollContainerRef.current;

    lastScrollPositionRef.current = container.scrollTop;

    const isJanuaryVisible = visibleMonthIndex === 0;

    // 스크롤이 맨 위/아래에 도달했는지 확인
    // 1월이 보이는 경우, 스크롤 위치가 10px 미만이면 이전 년도로 이동하도록 임계값 조정
    const topThreshold = isJanuaryVisible ? 10 : 5;
    const isAtTop = container.scrollTop <= topThreshold;
    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 5;

    // 맨 위에 도달 - 이전 년도로 이동
    if (isAtTop) {
      if (isPrevMonthDisabled) {
        // 스크롤 제한: 위로 가지 않도록 복원
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = isJanuaryVisible ? 15 : 10;
          }
        });
        return;
      }

      handleYearScroll('prev');
      return;
    }

    // 맨 아래에 도달 - 다음 년도로 이동
    if (isAtBottom) {
      if (isNextMonthDisabled) {
        // 스크롤 제한: 아래로 가지 않도록 복원
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
              container.scrollHeight - container.clientHeight - 10;
          }
        });
        return;
      }

      handleYearScroll('next');
      return;
    }

    // 일반 스크롤 - 현재 보이는 월 계산
    calculateVisibleMonth();
  }, [
    visibleMonthIndex,
    calculateVisibleMonth,
    handleYearScroll,
    isPrevMonthDisabled,
    isNextMonthDisabled,
  ]);

  // 스크롤 위치 복원 함수
  const restoreScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = lastScrollPositionRef.current;
    }
  }, []);

  // 타겟 월로 스크롤 이동하는 함수
  const scrollToTargetMonth = useCallback((targetMonthIndex: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    if (isScrollingRef.current) return;

    const monthContainers = container.querySelectorAll(
      '.calendar-month-container',
    );
    if (monthContainers.length === 0) return;

    let targetContainer: HTMLElement | null = null;
    Array.from(monthContainers).forEach((containerEl) => {
      const el = containerEl as HTMLElement;
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

    if (targetContainer) {
      isScrollingRef.current = true;

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

      container.scrollTop = scrollPosition;
      lastScrollPositionRef.current = scrollPosition;

      setVisibleMonthIndex(targetMonthIndex);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    }
  }, []);

  // 초기 스크롤 위치 설정 함수
  const scrollToCurrentMonth = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const targetMonthIndex = adjustedBaseViewMonth.getMonth();
    scrollToTargetMonth(targetMonthIndex);
  }, [adjustedBaseViewMonth, scrollToTargetMonth]);

  useEffect(() => {
    if (!scrollMode || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollMode, handleScroll]);

  // 초기 스크롤 위치 설정 (스크롤 컨테이너가 마운트된 후)
  useEffect(() => {
    if (!scrollMode || !scrollContainerRef.current) return;

    if (lastScrollPositionRef.current === 0) {
      setTimeout(scrollToCurrentMonth, 100);
    } else {
      requestAnimationFrame(restoreScrollPosition);
    }
  }, [scrollMode, scrollToCurrentMonth, restoreScrollPosition]);

  // visibleMonthIndex가 변경될 때 스크롤 위치를 복원하는 효과
  useEffect(() => {
    if (!scrollMode || !scrollContainerRef.current) return;

    if (scrollContainerRef.current && !isScrollingRef.current) {
      requestAnimationFrame(restoreScrollPosition);
    }
  }, [visibleMonthIndex, scrollMode, restoreScrollPosition]);

  // baseViewMonth가 변경될 때 스크롤 위치 업데이트
  useEffect(() => {
    if (
      !scrollMode ||
      !scrollContainerRef.current ||
      !adjustedBaseViewMonth ||
      isScrollingRef.current
    )
      return;

    const timer = setTimeout(() => {
      const targetMonthIndex = adjustedBaseViewMonth.getMonth();
      scrollToTargetMonth(targetMonthIndex);
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollMode, adjustedBaseViewMonth, scrollToTargetMonth]);

  const onPrevButtonClick = useCallback(() => {
    if (scrollMode) {
      if (!isPrevMonthDisabled) {
        onYearChange?.('prev', 0);
      }
    } else {
      onPrevMonth?.();
    }
  }, [scrollMode, isPrevMonthDisabled, onYearChange, onPrevMonth]);

  const onNextButtonClick = useCallback(() => {
    if (scrollMode) {
      if (!isNextMonthDisabled) {
        onYearChange?.('next', 0);
      }
    } else {
      onNextMonth?.();
    }
  }, [scrollMode, isNextMonthDisabled, onYearChange, onNextMonth]);

  // 스크롤 모드가 아닌 경우 단일 월 렌더링
  const renderSingleCalendar = () => {
    const baseMonth = adjustedBaseViewMonth.getMonth() + offset;
    const year =
      adjustedBaseViewMonth.getFullYear() + Math.floor(baseMonth / 12);
    const month = baseMonth % 12;
    const days = generateCalendarDays(year, month);

    return (
      <div className={`${isCustom ? 'react-calendar' : 'calendar'}`}>
        <CalendarHeader
          year={year}
          month={month}
          isPrevMonthDisabled={isPrevMonthDisabled}
          isNextMonthDisabled={isNextMonthDisabled}
          scrollMode={scrollMode}
          multipleCalendars={multipleCalendars}
          offset={offset}
          onPrevButtonClick={onPrevButtonClick}
          onNextButtonClick={onNextButtonClick}
        />
        <CalendarMonth
          days={days}
          year={year}
          month={month}
          type={type}
          selectedDate={selectedDate}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          weekDays={weekDays}
          weekendColor={weekendColor}
          holidayColor={holidayColor}
          holidays={holidays}
          scrollMode={scrollMode}
          onDateClick={onDateClick}
        />
      </div>
    );
  };

  const renderScrollCalendar = () => {
    return (
      <div
        className={`${isCustom ? 'react-calendar' : 'calendar'} ${className ?? ''}`}
      >
        <CalendarHeader
          year={adjustedBaseYear}
          month={visibleMonthIndex}
          isPrevMonthDisabled={isPrevMonthDisabled}
          isNextMonthDisabled={isNextMonthDisabled}
          scrollMode={scrollMode}
          multipleCalendars={multipleCalendars}
          offset={offset}
          onPrevButtonClick={onPrevButtonClick}
          onNextButtonClick={onNextButtonClick}
        />
        <div ref={scrollContainerRef} className="calendar-scroll-container">
          {Array.from({ length: 12 }, (_, monthIndex) => {
            const currentMonthFirstDay = new Date(
              adjustedBaseYear,
              monthIndex,
              1,
            );
            const currentMonthLastDay = new Date(
              adjustedBaseYear,
              monthIndex + 1,
              0,
            );

            // minDate가 현재 월의 마지막 날짜보다 크거나 maxDate가 현재 월의 첫 날짜보다 작으면 표시하지 않음
            if (
              (minDate &&
                setStartOfDay(currentMonthLastDay) < setStartOfDay(minDate)) ||
              (maxDate && currentMonthFirstDay > maxDate)
            ) {
              return null;
            }

            const days = generateCalendarDays(adjustedBaseYear, monthIndex);
            return (
              <div key={monthIndex} className="calendar-month-container">
                <div className="calendar-month-header">
                  {`${monthIndex + 1}월`}
                </div>
                <CalendarMonth
                  days={days}
                  year={adjustedBaseYear}
                  month={monthIndex}
                  type={type}
                  selectedDate={selectedDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  weekDays={weekDays}
                  weekendColor={weekendColor}
                  holidayColor={holidayColor}
                  holidays={holidays}
                  scrollMode={scrollMode}
                  onDateClick={onDateClick}
                />
              </div>
            );
          }).filter(Boolean)}
        </div>
      </div>
    );
  };

  // 최종 렌더링
  return scrollMode ? renderScrollCalendar() : renderSingleCalendar();
};
