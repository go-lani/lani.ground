import React from 'react';

interface TimeColumnProps {
  label: string;
  values: number[] | string[];
  selectedValue: number | string | null;
  onChange: (value: number | string) => void;
  columnRef: React.RefObject<HTMLDivElement>;
}

export const TimeColumn: React.FC<TimeColumnProps> = ({
  label,
  values,
  selectedValue,
  onChange,
  columnRef,
}) => {
  return (
    <div>
      <div className="time-column-label">{label}</div>
      <div className="time-column" ref={columnRef}>
        <div className="time-column-padding" />
        {values.map((value) => (
          <button
            key={value}
            className={`time-option ${selectedValue === value ? 'selected' : ''}`}
            onClick={() => onChange(value)}
          >
            {typeof value === 'number'
              ? value.toString().padStart(2, '0')
              : value}
          </button>
        ))}
        <div className="time-column-padding" />
      </div>
    </div>
  );
};
