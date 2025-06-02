import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CalendarCore } from './components/CalendarCore';
import { getInitialViewMonth } from './utils/date';

export type TimeStep = 1 | 5 | 10 | 15 | 30;
export type CalendarType = 'scroll' | 'default';
export type AmPm = 'AM' | 'PM';

interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
  holidays?: Date[];
  weekendColor?: string;
  holidayColor?: string;
  calendarType?: CalendarType;
  ampm?: boolean;
  minuteStep?: TimeStep;
  secondStep?: TimeStep;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  isOpen,
  onOpenChange,
  minDate,
  maxDate,
  weekendColor,
  holidayColor,
  className,
  holidays = [],
  calendarType = 'default',
  ampm = false,
  minuteStep = 1,
  secondStep = 1,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(value);
  const [shouldWrap, setShouldWrap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarsRef = useRef<HTMLDivElement>(null);
  const isScroll = calendarType === 'scroll';

  // 달력 관련 상태
  const [currentMonth, setCurrentMonth] = useState(() => {
    return getInitialViewMonth(value, minDate, maxDate);
  });

  // 선택된 날짜가 변경될 때 currentMonth 업데이트
  useEffect(() => {
    if (selectedDateTime) {
      setCurrentMonth(
        new Date(
          selectedDateTime.getFullYear(),
          selectedDateTime.getMonth(),
          1,
        ),
      );
    }
  }, [selectedDateTime]);

  // 팝업이 열릴 때 초기 월 설정
  useEffect(() => {
    if (!isOpen) return;

    const newCurrentMonth = getInitialViewMonth(
      selectedDateTime,
      minDate,
      maxDate,
    );
    setCurrentMonth(newCurrentMonth);
  }, [isOpen, selectedDateTime, minDate, maxDate]);

  // 시간 관련 상태
  const [selectedHour, setSelectedHour] = useState(() => {
    return value
      ? ampm
        ? value.getHours() % 12 || 12
        : value.getHours()
      : ampm
        ? 12
        : 0;
  });
  const [selectedMinute, setSelectedMinute] = useState(() => {
    return value ? value.getMinutes() : 0;
  });
  const [selectedSecond, setSelectedSecond] = useState(() => {
    return value ? value.getSeconds() : 0;
  });
  const [selectedAmPm, setSelectedAmPm] = useState<AmPm>(() => {
    if (!value) return 'AM';
    return value.getHours() >= 12 ? 'PM' : 'AM';
  });

  // 년도 변경 핸들러 추가
  const handleYearChange = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setFullYear(newMonth.getFullYear() - 1);
    } else {
      newMonth.setFullYear(newMonth.getFullYear() + 1);
    }
    // 월을 1월(0)로 설정
    newMonth.setMonth(0);
    setCurrentMonth(newMonth);
  };

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
      const targetMonthIndex = currentMonth.getMonth();
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
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, isScroll, currentMonth]);

  // 시간 옵션 생성
  const hours = useMemo(() => {
    if (ampm) {
      return Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1).padStart(2, '0'),
      }));
    }
    return Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: String(i).padStart(2, '0'),
    }));
  }, [ampm]);

  const minutes = useMemo(() => {
    return Array.from({ length: 60 / minuteStep }, (_, i) => ({
      value: i * minuteStep,
      label: String(i * minuteStep).padStart(2, '0'),
    }));
  }, [minuteStep]);

  const seconds = useMemo(() => {
    return Array.from({ length: 60 / secondStep }, (_, i) => ({
      value: i * secondStep,
      label: String(i * secondStep).padStart(2, '0'),
    }));
  }, [secondStep]);

  const handleConfirmClick = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // 날짜 변경 핸들러
  const handleDateSelect = (date: Date) => {
    const newDateTime = new Date(date);
    if (ampm) {
      const hour = selectedHour === 12 ? 0 : selectedHour;
      newDateTime.setHours(selectedAmPm === 'PM' ? hour + 12 : hour);
    } else {
      newDateTime.setHours(selectedHour);
    }
    newDateTime.setMinutes(selectedMinute);
    newDateTime.setSeconds(selectedSecond);

    setSelectedDateTime(newDateTime);
    onChange?.(newDateTime);
  };

  // 시간 변경 핸들러
  const handleTimeChange = (
    value: number | AmPm,
    type: 'hour' | 'minute' | 'second' | 'ampm',
  ) => {
    if (!selectedDateTime) {
      const now = new Date();
      setSelectedDateTime(now);
    }

    const newDateTime = new Date(selectedDateTime || new Date());

    switch (type) {
      case 'hour':
        if (typeof value === 'number') {
          if (ampm) {
            const hour = value === 12 ? 0 : value;
            newDateTime.setHours(selectedAmPm === 'PM' ? hour + 12 : hour);
            setSelectedHour(value);
          } else {
            newDateTime.setHours(value);
            setSelectedHour(value);
          }
        }
        break;
      case 'minute':
        if (typeof value === 'number') {
          newDateTime.setMinutes(value);
          setSelectedMinute(value);
        }
        break;
      case 'second':
        if (typeof value === 'number') {
          newDateTime.setSeconds(value);
          setSelectedSecond(value);
        }
        break;
      case 'ampm':
        if (typeof value === 'string') {
          const hour = selectedHour === 12 ? 0 : selectedHour;
          newDateTime.setHours(value === 'PM' ? hour + 12 : hour);
          setSelectedAmPm(value);
        }
        break;
    }

    setSelectedDateTime(newDateTime);
    onChange?.(newDateTime);
  };

  // 레이아웃 체크 함수
  const checkLayout = useCallback(() => {
    if (!containerRef.current || !isOpen) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const availableWidth = viewportWidth - containerRect.left - 32;

    // 실제 요소들의 너비를 계산
    const calendarSection =
      containerRef.current.querySelector('.calendar-section');
    const timeSection = containerRef.current.querySelector('.time-section');

    if (!calendarSection || !timeSection) return;

    const calendarWidth = calendarSection.getBoundingClientRect().width;
    const timeWidth = timeSection.getBoundingClientRect().width;
    const totalWidth = calendarWidth + timeWidth + 32;

    const shouldWrapNow = totalWidth > availableWidth;
    setShouldWrap(shouldWrapNow);
  }, [isOpen]);

  // 레이아웃 체크 이벤트 리스너
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

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`datetime-picker ${calendarType} ${shouldWrap ? 'wrap' : ''} ${className || ''}`}
    >
      <div className="picker-popup">
        <div className="picker-container">
          <div className="calendar-section" ref={calendarsRef}>
            <CalendarCore
              baseViewMonth={currentMonth}
              selectedDate={selectedDateTime || undefined}
              onDateClick={handleDateSelect}
              onPrevMonth={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() - 1);
                setCurrentMonth(newMonth);
              }}
              onNextMonth={() => {
                const newMonth = new Date(currentMonth);
                newMonth.setMonth(newMonth.getMonth() + 1);
                setCurrentMonth(newMonth);
              }}
              minDate={minDate}
              maxDate={maxDate}
              holidays={holidays}
              weekendColor={weekendColor}
              holidayColor={holidayColor}
              scrollMode={isScroll}
              onYearChange={handleYearChange}
              isCustom={false}
            />
          </div>
          <div className="time-section">
            <div className="time-container">
              {ampm && (
                <div className="time-column">
                  <div className="time-label no-padding">AM/PM</div>
                  <div className="time-options">
                    {(['AM', 'PM'] as const).map((value) => (
                      <div
                        key={value}
                        className={`time-option ${
                          selectedAmPm === value ? 'selected' : ''
                        }`}
                        onClick={() => handleTimeChange(value, 'ampm')}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="time-column">
                <div className="time-label">시</div>
                <div className="time-options">
                  {hours.map((hour) => (
                    <div
                      key={hour.value}
                      className={`time-option ${
                        selectedHour === hour.value ? 'selected' : ''
                      }`}
                      onClick={() => handleTimeChange(hour.value, 'hour')}
                    >
                      {hour.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="time-column">
                <div
                  className={`time-label ${minutes.length < 4 ? 'no-padding' : ''}`}
                >
                  분
                </div>
                <div className="time-options">
                  {minutes.map((minute) => (
                    <div
                      key={minute.value}
                      className={`time-option ${
                        selectedMinute === minute.value ? 'selected' : ''
                      }`}
                      onClick={() => handleTimeChange(minute.value, 'minute')}
                    >
                      {minute.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="time-column">
                <div
                  className={`time-label ${seconds.length < 4 ? 'no-padding' : ''}`}
                >
                  초
                </div>
                <div className="time-options">
                  {seconds.map((second) => (
                    <div
                      key={second.value}
                      className={`time-option ${
                        selectedSecond === second.value ? 'selected' : ''
                      }`}
                      onClick={() => handleTimeChange(second.value, 'second')}
                    >
                      {second.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="picker-footer">
          <button
            className="quick-option confirm-option"
            onClick={handleConfirmClick}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
