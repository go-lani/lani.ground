import { dateKit } from '@lani.ground/kits';
import { Calendar, TimePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/Calendar.css';
import { useState } from 'react';

export default function CustomPickerModal({
  rangeState,
  closeModal,
}: {
  rangeState: [
    [Date | null, Date | null],
    React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>,
  ];
  closeModal: () => void;
}) {
  const { formatDate } = dateKit;
  const [range, setRange] = rangeState;
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [editingDateType, setEditingDateType] = useState<
    'start' | 'end' | null
  >(null);
  const [localRange, setLocalRange] =
    useState<[Date | null, Date | null]>(range);

  // 빠른 선택 옵션 정의
  const quickSelectOptions = [
    { label: '7일', days: 7 },
    { label: '14일', days: 14 },
    { label: '28일', days: 28 },
  ];

  const handleRangeChange = (newRange: [Date | null, Date | null]) => {
    setLocalRange(newRange);
  };

  const handleTimePickerOpen = (type: 'start' | 'end') => {
    setEditingDateType(type);
    setTimePickerOpen(true);
  };

  const handleTimeChange = (value: Date | null) => {
    const updatedRange = {
      start: [value, localRange[1]] as [Date | null, Date | null],
      end: [localRange[0], value] as [Date | null, Date | null],
    };

    if (editingDateType && updatedRange[editingDateType]) {
      setLocalRange(updatedRange[editingDateType]);
    }
  };

  const getCurrentTimeValue = () => {
    const valueMap = {
      start: localRange[0],
      end: localRange[1],
    };

    return editingDateType ? valueMap[editingDateType] : null;
  };

  return (
    <div className="flex h-full w-full items-start justify-center bg-[#27272a] pt-2">
      <div className="w-full max-w-[400px]">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="rounded px-4 py-2 text-sm text-white"
          >
            닫기
          </button>
        </div>

        <Calendar
          type="range"
          range={range}
          onRangeChange={handleRangeChange}
          calendarType="scroll"
          weekendColor="#6B8EFF"
          holidayColor="#FF8B8B"
          quickSelectOptions={quickSelectOptions}
          enableReset
        />

        <div className="border-t-[1px] border-t-gray-500 py-3">
          <div className="flex">
            <div className="w-full p-4">
              <p className="text-sm text-gray-400">시작 날짜</p>
              {localRange[0] ? (
                <>
                  <p className="mt-2 text-sm text-white">
                    {formatDate(localRange[0], 'MM월 DD일')}
                  </p>
                  <button
                    type="button"
                    className="text-lg font-bold text-white"
                    onClick={() => handleTimePickerOpen('start')}
                  >
                    {formatDate(localRange[0], 'HH시 mm분')}
                  </button>
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-400">
                  날짜를 선택해주세요
                </p>
              )}
            </div>
            <div className="w-full border-l-[1px] border-l-gray-500 p-4">
              <p className="text-sm text-gray-400">종료 날짜</p>
              {localRange[1] ? (
                <>
                  <p className="mt-2 text-sm text-white">
                    {formatDate(localRange[1], 'MM월 DD일')}
                  </p>
                  <button
                    type="button"
                    className="text-lg font-bold text-white"
                    onClick={() => handleTimePickerOpen('end')}
                  >
                    {formatDate(localRange[1], 'HH시 mm분')}
                  </button>
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-400">
                  날짜를 선택해주세요
                </p>
              )}
            </div>
          </div>
        </div>

        <TimePicker
          mode="panel"
          value={getCurrentTimeValue()}
          onChange={handleTimeChange}
          isOpen={timePickerOpen}
          timeUnits={['hour', 'minute']}
          onOpenChange={setTimePickerOpen}
          enableSnap
        />

        <button
          type="button"
          onClick={() => {
            setRange(localRange);
            closeModal();
          }}
          className="w-full rounded bg-neutral-500 px-4 py-2 text-sm font-bold text-white"
        >
          조회
        </button>
      </div>
    </div>
  );
}
