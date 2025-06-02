import React from 'react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  isPrevMonthDisabled: boolean;
  isNextMonthDisabled: boolean;
  scrollMode?: boolean;
  multipleCalendars?: boolean;
  offset?: number;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

/**
 * 캘린더 헤더 컴포넌트
 */
export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  isPrevMonthDisabled,
  isNextMonthDisabled,
  scrollMode = false,
  multipleCalendars = false,
  offset = 0,
  onPrevButtonClick,
  onNextButtonClick,
}) => {
  const prevClassName =
    multipleCalendars && offset === 1 ? 'prev inactive' : 'prev';
  const nextClassName =
    multipleCalendars && offset === 0 ? 'next inactive' : 'next';

  const headerTitle = scrollMode ? `${year}년` : `${year}년 ${month + 1}월`;

  return (
    <div className="calendar-header">
      <button
        onClick={onPrevButtonClick}
        className={prevClassName}
        disabled={isPrevMonthDisabled}
        aria-label={scrollMode ? '이전 년도' : '이전 월'}
      >
        &lt;
      </button>
      <span>{headerTitle}</span>
      <button
        onClick={onNextButtonClick}
        className={nextClassName}
        disabled={isNextMonthDisabled}
        aria-label={scrollMode ? '다음 년도' : '다음 월'}
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarHeader;
