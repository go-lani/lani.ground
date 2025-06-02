import React from 'react';
import {
  getDayColor,
  isDisabled,
  isInRange,
  isSameDay,
  isSameMonth,
} from '../utils/date';

interface CalendarMonthProps {
  days: Date[];
  year: number;
  month: number;
  type: 'date' | 'range';
  selectedDate?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  weekDays: string[];
  weekendColor?: string;
  holidayColor?: string;
  holidays?: Date[];
  scrollMode?: boolean;
  onDateClick?: (date: Date) => void;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  days,
  year,
  month,
  type,
  selectedDate,
  startDate,
  endDate,
  minDate,
  maxDate,
  weekDays,
  weekendColor,
  holidayColor,
  holidays = [],
  scrollMode = false,
  onDateClick,
}) => {
  const renderWeekDays = () => (
    <div className="week-days">
      {weekDays.map((day, index) => {
        const isHoliday = index === 0 && holidayColor;
        const isWeekend = index === 6 && weekendColor;

        return (
          <div
            key={day}
            className="week-day"
            style={{
              color: isHoliday
                ? holidayColor
                : isWeekend
                  ? weekendColor
                  : undefined,
            }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );

  const renderDaysGrid = () => (
    <div className="days-grid">
      {days.map((day, index) => {
        const isCurrentMonth = isSameMonth(day, new Date(year, month, 1));
        const disabled = isDisabled(day, minDate, maxDate);

        const dayColor = getDayColor(day, year, month, {
          type,
          selectedDate,
          startDate,
          endDate,
          minDate,
          maxDate,
          weekendColor,
          holidayColor,
          holidays,
          scrollMode,
        });

        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
        const isStart = startDate ? isSameDay(day, startDate) : false;
        const isEnd = endDate ? isSameDay(day, endDate) : false;
        const isInRangeDay = isInRange(day, startDate || null, endDate || null);
        const isToday = isSameDay(day, new Date());

        const classNames = [
          'day',
          type === 'date' && isSelected ? 'selected' : '',
          type === 'range' && isStart ? 'start' : '',
          type === 'range' && isEnd ? 'end' : '',
          type === 'range' && isInRangeDay ? 'in-range' : '',
          !isCurrentMonth ? 'other-month' : '',
          isToday ? 'today' : '',
          disabled ? 'disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={index}
            className={classNames}
            onClick={() => isCurrentMonth && !disabled && onDateClick?.(day)}
            disabled={!isCurrentMonth || disabled}
          >
            <span style={{ color: dayColor }}>{day.getDate()}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {renderWeekDays()}
      {renderDaysGrid()}
    </>
  );
};

export default CalendarMonth;
