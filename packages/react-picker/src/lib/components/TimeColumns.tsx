import React from 'react';
import { TimeUnit } from '../TimePicker';
import { TimeColumn } from './TimeColumn';

interface TimeColumnConfig {
  label: string;
  format: string;
  values: number[] | string[];
  selectedValue: number | string | null;
  onChange: (value: number | string) => void;
  ref: React.RefObject<HTMLDivElement>;
}

interface TimeColumnsProps {
  hours: number[];
  minutes: number[];
  seconds: number[];
  ampmOptions: string[];
  selectedTime: Date | null;
  enableSnap: boolean;
  timeUnits: TimeUnit[];
  onHourChange: (value: number | string) => void;
  onMinuteChange: (value: number | string) => void;
  onSecondChange: (value: number | string) => void;
  onAmpmChange: (value: number | string) => void;
  hoursRef: React.RefObject<HTMLDivElement>;
  minutesRef: React.RefObject<HTMLDivElement>;
  secondsRef: React.RefObject<HTMLDivElement>;
  ampmRef: React.RefObject<HTMLDivElement>;
}

export const TimeColumns: React.FC<TimeColumnsProps> = ({
  hours,
  minutes,
  seconds,
  ampmOptions,
  selectedTime,
  enableSnap,
  timeUnits,
  onHourChange,
  onMinuteChange,
  onSecondChange,
  onAmpmChange,
  hoursRef,
  minutesRef,
  secondsRef,
  ampmRef,
}) => {
  const timeColumns: TimeColumnConfig[] = [];

  // AM/PM 컬럼 추가 (제일 먼저)
  if (timeUnits.includes('ampm')) {
    timeColumns.push({
      label: 'AM/PM',
      format: 'aa',
      values: ampmOptions,
      selectedValue: selectedTime
        ? selectedTime.getHours() >= 12
          ? 'PM'
          : 'AM'
        : null,
      onChange: onAmpmChange,
      ref: ampmRef,
    });
  }

  // 시간 컬럼 추가 (24시간제 또는 12시간제)
  if (timeUnits.includes('hour')) {
    timeColumns.push({
      label: '시',
      format: timeUnits.includes('ampm') ? 'hh' : 'HH',
      values: hours,
      selectedValue: selectedTime
        ? timeUnits.includes('ampm')
          ? selectedTime.getHours() % 12 || 12
          : selectedTime.getHours()
        : null,
      onChange: onHourChange,
      ref: hoursRef,
    });
  }

  // 분 컬럼 추가
  if (timeUnits.includes('minute')) {
    timeColumns.push({
      label: '분',
      format: 'mm',
      values: minutes,
      selectedValue: selectedTime?.getMinutes() ?? null,
      onChange: onMinuteChange,
      ref: minutesRef,
    });
  }

  // 초 컬럼 추가
  if (timeUnits.includes('second')) {
    timeColumns.push({
      label: '초',
      format: 'ss',
      values: seconds,
      selectedValue: selectedTime?.getSeconds() ?? null,
      onChange: onSecondChange,
      ref: secondsRef,
    });
  }

  return (
    <div className="time-picker-container">
      {timeColumns.map(
        ({ label, format, values, selectedValue, onChange, ref }) => (
          <TimeColumn
            key={format}
            label={label}
            values={values}
            selectedValue={selectedValue}
            onChange={onChange}
            columnRef={ref}
          />
        ),
      )}
      {enableSnap && <div className="time-picker-indicator" />}
    </div>
  );
};
