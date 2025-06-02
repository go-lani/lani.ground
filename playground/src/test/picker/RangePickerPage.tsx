import { dateKit } from '@lani.ground/kits';
import { RangePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/RangePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';
import RangePickerTrigger from '../components/picker/RangePickerTrigger';

export default function RangePickerPage() {
  const { formatDate } = dateKit;

  // RangePicker
  const [quickSelectRange, setQuickSelectRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [quickSelectRangeOpen, setQuickSelectRangeOpen] = useState(false);
  const [quickSelectRangeActiveInput, setQuickSelectRangeActiveInput] =
    useState<'start' | 'end' | null>(null);
  const [multipleCalendarRange, setMultipleCalendarRange] = useState<
    [Date | null, Date | null]
  >([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
  const [multipleRangeOpen, setMultipleRangeOpen] = useState(false);
  const [multipleRangeActiveInput, setMultipleRangeActiveInput] = useState<
    'start' | 'end' | null
  >(null);
  const [scrollRange, setScrollRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [scrollRangeOpen, setScrollRangeOpen] = useState(false);
  const [scrollRangeActiveInput, setScrollRangeActiveInput] = useState<
    'start' | 'end' | null
  >(null);

  const quickSelectOptions = [
    { label: '7일', days: 7 },
    { label: '14일', days: 14 },
    { label: '28일', days: 28 },
    { label: '3개월', days: 90 },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="RangePicker">
        <div>
          <p className="mb-2 text-base font-bold">RangePicker - Default</p>
          <RangePickerTrigger
            startValue={formatDate(quickSelectRange[0], 'YYYY.MM.DD')}
            endValue={formatDate(quickSelectRange[1], 'YYYY.MM.DD')}
            startPlaceholder="시작일"
            endPlaceholder="종료일"
            onStartClick={() => {
              setQuickSelectRangeOpen(true);
              setQuickSelectRangeActiveInput('start');
            }}
            onEndClick={() => {
              setQuickSelectRangeOpen(true);
              setQuickSelectRangeActiveInput('end');
            }}
            activeInput={quickSelectRangeActiveInput}
          />
          <RangePicker
            range={quickSelectRange}
            onChange={setQuickSelectRange}
            quickSelectOptions={quickSelectOptions}
            isOpen={quickSelectRangeOpen}
            onOpenChange={setQuickSelectRangeOpen}
            activeInput={quickSelectRangeActiveInput}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onActiveInputChange={setQuickSelectRangeActiveInput}
            enableReset
          />
        </div>
        <div>
          <p className="mb-2 text-base font-bold">RangePicker - Multiple</p>
          <RangePickerTrigger
            startValue={formatDate(
              multipleCalendarRange[0],
              'YYYY년 MM월 DD일 (ddd)',
            )}
            endValue={formatDate(
              multipleCalendarRange[1],
              'YYYY년 MM월 DD일 (ddd)',
            )}
            startPlaceholder="시작일"
            endPlaceholder="종료일"
            onStartClick={() => {
              setMultipleRangeOpen(true);
              setMultipleRangeActiveInput('start');
            }}
            onEndClick={() => {
              setMultipleRangeOpen(true);
              setMultipleRangeActiveInput('end');
            }}
            activeInput={multipleRangeActiveInput}
          />
          <RangePicker
            range={multipleCalendarRange}
            onChange={setMultipleCalendarRange}
            calendarType="multiple"
            isOpen={multipleRangeOpen}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={setMultipleRangeOpen}
            activeInput={multipleRangeActiveInput}
            onActiveInputChange={setMultipleRangeActiveInput}
          />
        </div>
        <div>
          <p className="mb-2 text-base font-bold">RangePicker - Scroll</p>
          <RangePickerTrigger
            startValue={formatDate(scrollRange[0], 'YYYY년 MM월 DD일 (ddd)')}
            endValue={formatDate(scrollRange[1], 'YYYY년 MM월 DD일 (ddd)')}
            startPlaceholder="시작일"
            endPlaceholder="종료일"
            onStartClick={() => {
              setScrollRangeOpen(true);
              setScrollRangeActiveInput('start');
            }}
            onEndClick={() => {
              setScrollRangeOpen(true);
              setScrollRangeActiveInput('end');
            }}
            activeInput={scrollRangeActiveInput}
          />
          <RangePicker
            range={scrollRange}
            onChange={setScrollRange}
            calendarType="scroll"
            isOpen={scrollRangeOpen}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={setScrollRangeOpen}
            activeInput={scrollRangeActiveInput}
            onActiveInputChange={setScrollRangeActiveInput}
          />
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
