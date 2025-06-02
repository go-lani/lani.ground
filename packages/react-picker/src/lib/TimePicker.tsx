import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TimePickerPopup } from './components/TimePickerPopup';
import { formatDate, setStartOfDay } from './utils/date';
import { findClosestTimeItem, scrollToCenter } from './utils/time';

const CONSTANTS = {
  TIME_ITEM_HEIGHT: 40,
  SCROLL_DEBOUNCE_TIME: 100,
  PANEL_ANIMATION_DURATION: 300,
  MAX_UPWARD_DRAG: -50,
  DRAG_CLOSE_THRESHOLD: 0.1,
  INITIAL_SCROLL_DELAY: 50,
} as const;

export type TimeStep = 1 | 5 | 10 | 15 | 30;
export type TimePickerMode = 'default' | 'panel';
export type TimeUnit = 'hour' | 'minute' | 'second' | 'ampm';

interface BaseTimePickerProps {
  minuteStep?: TimeStep;
  secondStep?: TimeStep;
  className?: string;
  disabled?: boolean;
  mode?: TimePickerMode;
  enableSnap?: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  timeUnits?: TimeUnit[];
}

interface DateTimePickerProps extends BaseTimePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

interface StringTimePickerProps extends BaseTimePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export type TimePickerProps = DateTimePickerProps | StringTimePickerProps;

interface TimeElementsRef {
  hourEl: HTMLElement | null;
  minuteEl: HTMLElement | null;
  secondEl: HTMLElement | null;
  ampmEl: HTMLElement | null;
}

/**
 * 시간 문자열의 포맷을 감지하는 함수
 */
const detectTimeFormat = (value: string | null): string => {
  if (!value) return 'hh:mm:ss aa'; // 기본 포맷

  // AM/PM이 앞에 있는 경우 (예: "PM 12:30:00")
  if (/^(AM|PM|am|pm)\s+\d{1,2}:\d{1,2}(:\d{1,2})?/.test(value)) {
    return 'aa hh:mm:ss';
  }

  // AM/PM이 뒤에 있는 경우 (예: "12:30:00 PM")
  if (/\d{1,2}:\d{1,2}(:\d{1,2})?\s+(AM|PM|am|pm)/.test(value)) {
    return 'hh:mm:ss aa';
  }

  // AM/PM이 없는 경우
  return 'HH:mm:ss';
};

/**
 * 시간 선택기 초기값을 설정하는 함수
 */
const initializeSelectedTime = (
  value: Date | string | null | undefined,
  ampm?: boolean,
): Date | null => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    try {
      // AM/PM 위치에 따른 정규식 패턴
      const timePatterns = [
        /^(AM|PM|am|pm)\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/, // "PM 12:30:00"
        /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s+(AM|PM|am|pm)$/, // "12:30:00 PM"
        /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/, // "12:30:00"
      ];

      let matches: RegExpMatchArray | null = null;
      let pattern = -1;

      for (let i = 0; i < timePatterns.length; i++) {
        matches = value.match(timePatterns[i]);
        if (matches) {
          pattern = i;
          break;
        }
      }

      if (!matches) return null;

      let hours: number,
        minutes: number,
        seconds: number = 0,
        period: string | undefined;

      switch (pattern) {
        case 0: // "PM 12:30:00"
          period = matches[1];
          hours = parseInt(matches[2], 10);
          minutes = parseInt(matches[3], 10);
          seconds = matches[4] ? parseInt(matches[4], 10) : 0;
          break;
        case 1: // "12:30:00 PM"
          hours = parseInt(matches[1], 10);
          minutes = parseInt(matches[2], 10);
          seconds = matches[3] ? parseInt(matches[3], 10) : 0;
          period = matches[4];
          break;
        default: // "12:30:00"
          hours = parseInt(matches[1], 10);
          minutes = parseInt(matches[2], 10);
          seconds = matches[3] ? parseInt(matches[3], 10) : 0;
      }

      // 유효성 검사
      if (
        isNaN(hours) ||
        isNaN(minutes) ||
        isNaN(seconds) ||
        minutes >= 60 ||
        seconds >= 60 ||
        (ampm && (hours < 1 || hours > 12)) ||
        (!ampm && hours >= 24)
      ) {
        return null;
      }

      const date = setStartOfDay(new Date());

      if (ampm && period) {
        const isPM = period.toUpperCase() === 'PM';
        const hour12 = hours % 12;
        date.setHours(
          isPM ? (hour12 === 0 ? 12 : hour12 + 12) : hour12 === 12 ? 0 : hour12,
        );
      } else {
        date.setHours(hours);
      }

      date.setMinutes(minutes);
      date.setSeconds(seconds);
      return date;
    } catch (error) {
      console.error('시간 문자열 파싱 중 오류 발생:', error);
      return null;
    }
  }
  return null;
};

const TimePickerComponent: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  isOpen,
  onOpenChange,
  disabled = false,
  mode = 'default',
  enableSnap = false,
  minuteStep = 1,
  secondStep = 1,
  timeUnits = ['hour', 'minute', 'second'],
}) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(() =>
    initializeSelectedTime(value, timeUnits.includes('ampm')),
  );

  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const ampmRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number | null>(null);
  const dragCurrentYRef = useRef<number>(0);
  const panelHeightRef = useRef<number>(0);
  const handleRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<TimeElementsRef>({
    hourEl: null,
    minuteEl: null,
    secondEl: null,
    ampmEl: null,
  });

  const hours = useMemo(() => {
    return timeUnits.includes('ampm')
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i);
  }, [timeUnits]);

  const minutes = Array.from(
    { length: 60 / minuteStep },
    (_, i) => i * minuteStep,
  );

  const seconds = Array.from(
    { length: 60 / secondStep },
    (_, i) => i * secondStep,
  );

  const ampmOptions = useMemo(() => ['AM', 'PM'], []);

  const handleTimeChange = useCallback(
    (newDate: Date) => {
      const adjustedDate = new Date(newDate);

      // 제외된 시간 단위를 0으로 설정
      if (!timeUnits.includes('hour')) {
        adjustedDate.setHours(0);
      }
      if (!timeUnits.includes('minute')) {
        adjustedDate.setMinutes(0);
      }
      if (!timeUnits.includes('second')) {
        adjustedDate.setSeconds(0);
      }

      setSelectedTime(adjustedDate);

      if (!onChange) return;

      const newValue =
        typeof value === 'string'
          ? formatDate(adjustedDate, detectTimeFormat(value))
          : adjustedDate;

      onChange(newValue as any);
    },
    [onChange, value, timeUnits],
  );

  const handleHourChange = useCallback(
    (value: number | string) => {
      const hour = Number(value);
      const newDate = new Date(selectedTime || setStartOfDay(new Date()));

      if (timeUnits.includes('ampm')) {
        const currentHour = newDate.getHours();
        const isPM = currentHour >= 12;
        const newHour = isPM
          ? hour === 12
            ? 12
            : hour + 12
          : hour === 12
            ? 0
            : hour;
        newDate.setHours(newHour);
      } else {
        newDate.setHours(hour);
      }

      handleTimeChange(newDate);

      if (!hoursRef.current) return;

      const hourIndex = timeUnits.includes('ampm') ? hour - 1 : hour;
      scrollToCenter(
        hoursRef.current,
        hourIndex,
        true,
        isProgrammaticScrollRef,
      );
    },
    [selectedTime, handleTimeChange, timeUnits],
  );

  const handleMinuteChange = useCallback(
    (value: number | string) => {
      const minute = Number(value);
      const newDate = new Date(selectedTime || setStartOfDay(new Date()));

      newDate.setMinutes(minute);
      handleTimeChange(newDate);

      if (!minutesRef.current) return;

      scrollToCenter(
        minutesRef.current,
        minute / minuteStep,
        true,
        isProgrammaticScrollRef,
      );
    },
    [selectedTime, handleTimeChange, minuteStep],
  );

  const handleSecondChange = useCallback(
    (value: number | string) => {
      const second = Number(value);
      const newDate = new Date(selectedTime || setStartOfDay(new Date()));

      newDate.setSeconds(second);
      handleTimeChange(newDate);

      if (!secondsRef.current) return;

      scrollToCenter(
        secondsRef.current,
        second / secondStep,
        true,
        isProgrammaticScrollRef,
      );
    },
    [selectedTime, handleTimeChange, secondStep],
  );

  const handleAmpmChange = useCallback(
    (value: number | string) => {
      const ampm = String(value);
      let newDate: Date;

      if (!selectedTime) {
        newDate = setStartOfDay(new Date());
        newDate.setHours(ampm === 'PM' ? 13 : 1);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
      } else {
        newDate = new Date(selectedTime);
        const currentHour = newDate.getHours();
        const isPM = ampm === 'PM';

        if (currentHour === 0 || currentHour === 12) {
          newDate.setHours(isPM ? 12 : 0);
        } else {
          const hour12 = currentHour % 12;
          if (isPM && currentHour < 12) {
            newDate.setHours(hour12 + 12);
          } else if (!isPM && currentHour >= 12) {
            newDate.setHours(hour12);
          }
        }
      }

      handleTimeChange(newDate);

      if (hoursRef.current) {
        const newHour12 = newDate.getHours() % 12 || 12;
        scrollToCenter(
          hoursRef.current,
          newHour12 - 1,
          true,
          isProgrammaticScrollRef,
        );
      }

      if (ampmRef.current) {
        scrollToCenter(
          ampmRef.current,
          ampm === 'PM' ? 1 : 0,
          true,
          isProgrammaticScrollRef,
        );
      }
    },
    [selectedTime, handleTimeChange],
  );

  const handleScrollComplete = useCallback(
    (element: HTMLElement, type: TimeUnit) => {
      return () => {
        if (!enableSnap) return;

        const closestIndex = findClosestTimeItem(element);
        if (closestIndex === -1) return;

        try {
          if (type === 'hour') {
            handleHourChange(hours[closestIndex]);
          } else if (type === 'minute') {
            handleMinuteChange(minutes[closestIndex]);
          } else if (type === 'second') {
            handleSecondChange(seconds[closestIndex]);
          } else if (type === 'ampm') {
            handleAmpmChange(ampmOptions[closestIndex]);
          }
        } catch (error) {
          console.error('TimePicker 스크롤 처리 오류:', error);
        }
      };
    },
    [
      hours,
      minutes,
      seconds,
      ampmOptions,
      enableSnap,
      handleHourChange,
      handleMinuteChange,
      handleSecondChange,
      handleAmpmChange,
    ],
  );

  const handleScroll = useCallback(
    (element: HTMLElement, type: TimeUnit) => {
      if (!element || !enableSnap || isProgrammaticScrollRef.current) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(
        handleScrollComplete(element, type),
        CONSTANTS.SCROLL_DEBOUNCE_TIME,
      );
    },
    [handleScrollComplete, enableSnap],
  );

  const handleClosePanel = useCallback(() => {
    if (mode === 'panel') {
      // 패널 모드에서는 애니메이션을 위해 isClosing 상태를 설정
      setIsClosing(true);

      // 애니메이션이 끝난 후 상태 변경
      setTimeout(() => {
        onOpenChange?.(false);
        setIsClosing(false);
        document.body.style.overflow = '';
      }, CONSTANTS.PANEL_ANIMATION_DURATION);
    } else {
      onOpenChange?.(false);
    }
  }, [mode, onOpenChange]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        handleClosePanel();
      }
    },
    [handleClosePanel],
  );

  const handleDragStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartYRef.current = y;
      dragCurrentYRef.current = 0;

      if (!popupRef.current) return;

      panelHeightRef.current = popupRef.current.offsetHeight;
      popupRef.current.style.transition = 'none';
      popupRef.current.style.transform = '';

      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('touchmove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    },
    [],
  );

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (dragStartYRef.current === null || !popupRef.current) return;

    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = y - dragStartYRef.current;
    const limitedDeltaY =
      deltaY < 0 ? Math.max(deltaY, CONSTANTS.MAX_UPWARD_DRAG) : deltaY;

    dragCurrentYRef.current = deltaY;
    popupRef.current.style.transform = `translateY(${limitedDeltaY}px)`;
    e.preventDefault();
  }, []);

  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);

      if (!popupRef.current) return;

      popupRef.current.style.transition = `transform ${CONSTANTS.PANEL_ANIMATION_DURATION}ms ease`;

      if (
        dragCurrentYRef.current >
        panelHeightRef.current * CONSTANTS.DRAG_CLOSE_THRESHOLD
      ) {
        setIsClosing(true);
        popupRef.current.style.transform = `translateY(100%)`;
        handleClosePanel();
      } else {
        popupRef.current.style.transform = '';
      }

      dragStartYRef.current = null;
    },
    [handleClosePanel, handleDragMove],
  );

  useEffect(() => {
    if (mode !== 'panel') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [handleClickOutside, mode]);

  useEffect(() => {
    if (isOpen && selectedTime) {
      const scrollToInitialPosition = () => {
        const scrollConfigs = [
          {
            ref: hoursRef.current,
            index: timeUnits.includes('ampm')
              ? (selectedTime.getHours() % 12 || 12) - 1
              : selectedTime.getHours(),
          },
          {
            ref: minutesRef.current,
            index: selectedTime.getMinutes() / minuteStep,
          },
          {
            ref: secondsRef.current,
            index: selectedTime.getSeconds() / secondStep,
          },
          {
            ref: ampmRef.current,
            index: selectedTime.getHours() >= 12 ? 1 : 0,
          },
        ];

        scrollConfigs.forEach(({ ref, index }) => {
          if (ref) {
            scrollToCenter(ref, index, false, isProgrammaticScrollRef);
          }
        });
      };

      const timer = setTimeout(
        scrollToInitialPosition,
        CONSTANTS.INITIAL_SCROLL_DELAY,
      );
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && enableSnap) {
      elementsRef.current = {
        hourEl: hoursRef.current,
        minuteEl: minutesRef.current,
        secondEl: secondsRef.current,
        ampmEl: ampmRef.current,
      };

      // 스크롤 핸들러 객체
      const scrollHandlers = {
        hour: () =>
          elementsRef.current.hourEl &&
          handleScroll(elementsRef.current.hourEl, 'hour'),
        minute: () =>
          elementsRef.current.minuteEl &&
          handleScroll(elementsRef.current.minuteEl, 'minute'),
        second: () =>
          elementsRef.current.secondEl &&
          handleScroll(elementsRef.current.secondEl, 'second'),
        ampm: () =>
          elementsRef.current.ampmEl &&
          handleScroll(elementsRef.current.ampmEl, 'ampm'),
      };

      // 시간 유닛 별 이벤트 처리
      const timeUnitElements = [
        { unit: 'hour', el: elementsRef.current.hourEl },
        { unit: 'minute', el: elementsRef.current.minuteEl },
        { unit: 'second', el: elementsRef.current.secondEl },
        { unit: 'ampm', el: elementsRef.current.ampmEl },
      ] as const;

      // 이벤트 리스너 등록
      timeUnitElements.forEach(({ unit, el }) => {
        if (el) {
          el.addEventListener('scroll', scrollHandlers[unit], {
            passive: true,
          });
        }
      });

      // 터치 이벤트 핸들러
      const handleTouchEnd = () => {
        timeUnitElements.forEach(({ unit, el }) => {
          if (el) {
            handleScroll(el, unit);
          }
        });
      };

      // 터치 이벤트 등록
      const container = document.querySelector('.time-picker-container');
      if (container) {
        container.addEventListener('touchend', handleTouchEnd, {
          passive: true,
        });
      }

      // 클린업 함수
      return () => {
        timeUnitElements.forEach(({ unit, el }) => {
          if (el) {
            el.removeEventListener('scroll', scrollHandlers[unit]);
          }
        });

        if (container) {
          container.removeEventListener('touchend', handleTouchEnd);
        }

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isOpen, handleScroll, enableSnap]);

  useEffect(() => {
    setSelectedTime(initializeSelectedTime(value, timeUnits.includes('ampm')));
  }, [value, timeUnits]);

  useEffect(() => {
    const preventDefaultTouch = (e: TouchEvent) => {
      if (
        isOpen &&
        mode === 'panel' &&
        handleRef.current?.contains(e.target as Node)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefaultTouch, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', preventDefaultTouch);
    };
  }, [isOpen, mode]);

  useEffect(() => {
    const handleEl = handleRef.current;

    if (handleEl && isOpen && mode === 'panel') {
      const touchStartHandler = (e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
          dragStartYRef.current = touch.clientY;
          dragCurrentYRef.current = 0;

          if (popupRef.current) {
            panelHeightRef.current = popupRef.current.offsetHeight;
            popupRef.current.style.transition = 'none';
            popupRef.current.style.transform = '';
          }
        }
      };

      handleEl.addEventListener('touchstart', touchStartHandler, {
        passive: false,
      });

      return () => {
        handleEl.removeEventListener('touchstart', touchStartHandler);
      };
    }
  }, [isOpen, mode]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // 패널 모드일 때 자동으로 패널 스타일 적용
  useEffect(() => {
    if (isOpen && mode === 'panel') {
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && mode === 'panel') {
      document.body.style.overflow = '';
    }
  }, [isOpen, mode]);

  if (!isOpen || disabled) return null;

  return (
    <div
      className={`time-picker ${className || ''} ${mode === 'panel' ? 'panel' : ''}`}
      ref={containerRef}
    >
      <TimePickerPopup
        mode={mode}
        isClosing={isClosing}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        ampmOptions={ampmOptions}
        selectedTime={selectedTime}
        enableSnap={enableSnap}
        timeUnits={timeUnits}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
        onSecondChange={handleSecondChange}
        onAmpmChange={handleAmpmChange}
        onClose={handleClosePanel}
        onDragStart={handleDragStart}
        hoursRef={hoursRef}
        minutesRef={minutesRef}
        secondsRef={secondsRef}
        ampmRef={ampmRef}
        popupRef={popupRef}
        handleRef={handleRef}
      />
    </div>
  );
};

export const TimePicker = React.memo(
  TimePickerComponent,
  (prevProps, nextProps) => {
    if (prevProps.value === null && nextProps.value === null) {
      return prevProps.isOpen === nextProps.isOpen;
    }
    if (prevProps.value instanceof Date && nextProps.value instanceof Date) {
      return (
        prevProps.value.getTime() === nextProps.value.getTime() &&
        prevProps.isOpen === nextProps.isOpen
      );
    }
    if (
      typeof prevProps.value === 'string' &&
      typeof nextProps.value === 'string'
    ) {
      return (
        prevProps.value === nextProps.value &&
        prevProps.isOpen === nextProps.isOpen
      );
    }
    return false;
  },
);

export default TimePicker;
