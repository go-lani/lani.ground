import React from 'react';
import { TimeUnit } from '../TimePicker';
import { TimeColumns } from './TimeColumns';

interface TimePickerPopupProps {
  mode: 'default' | 'panel';
  isClosing?: boolean;
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
  onClose: () => void;
  onDragStart: (e: React.TouchEvent | React.MouseEvent) => void;
  hoursRef: React.RefObject<HTMLDivElement>;
  minutesRef: React.RefObject<HTMLDivElement>;
  secondsRef: React.RefObject<HTMLDivElement>;
  ampmRef: React.RefObject<HTMLDivElement>;
  popupRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
}

export const TimePickerPopup: React.FC<TimePickerPopupProps> = ({
  mode,
  isClosing = false,
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
  onClose,
  onDragStart,
  hoursRef,
  minutesRef,
  secondsRef,
  ampmRef,
  popupRef,
  handleRef,
}) => {
  return (
    <>
      <div
        className={`picker-popup ${isClosing ? 'closing' : ''}`}
        ref={popupRef}
      >
        {mode === 'panel' && (
          <div
            className="panel-handle"
            ref={handleRef}
            onClick={onClose}
            onTouchStart={onDragStart}
            onMouseDown={onDragStart}
          />
        )}
        <TimeColumns
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          ampmOptions={ampmOptions}
          selectedTime={selectedTime}
          enableSnap={enableSnap}
          timeUnits={timeUnits}
          onHourChange={onHourChange}
          onMinuteChange={onMinuteChange}
          onSecondChange={onSecondChange}
          onAmpmChange={onAmpmChange}
          hoursRef={hoursRef}
          minutesRef={minutesRef}
          secondsRef={secondsRef}
          ampmRef={ampmRef}
        />
      </div>
      {mode === 'panel' && (
        <div
          className={`picker-overlay ${isClosing ? 'closing' : ''}`}
          onClick={onClose}
        />
      )}
    </>
  );
};
