import { dateKit } from '@lani.ground/kits';
import { DatePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/DatePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';
import PickerTrigger from '../components/picker/PickerTrigger';

export default function DatePickerPage() {
  const { formatDate } = dateKit;

  // DatePicker
  const [basicDate, setBasicDate] = useState<Date | null>(null);
  const [basicDateOpen, setBasicDateOpen] = useState(false);
  const [multipleDate, setMultipleDate] = useState<Date | null>(null);
  const [multipleDateOpen, setMultipleDateOpen] = useState(false);
  const [scrollDate, setScrollDate] = useState<Date | null>(null);
  const [scrollDateOpen, setScrollDateOpen] = useState(false);

  const holidays = [
    new Date('2025-01-01'), // 신정
    new Date('2025-02-09'), // 설날
    new Date('2025-03-01'), // 삼일절
    new Date('2025-05-05'), // 어린이날
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="DatePicker">
        <div>
          <p className="mb-2 text-base font-bold">DatePicker - Default</p>
          <PickerTrigger
            onClick={() => {
              setBasicDateOpen(true);
            }}
            placeholder="날짜를 선택하세요"
            value={formatDate(basicDate, 'YYYY년 MM월 DD일 (ddd)')}
          />
          <DatePicker
            date={basicDate}
            onChange={setBasicDate}
            isOpen={basicDateOpen}
            holidays={holidays}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={(open) => setBasicDateOpen(open)}
          />
        </div>
        <div>
          <p className="mb-2 text-base font-bold">DatePicker - Multiple</p>
          <PickerTrigger
            onClick={() => {
              setMultipleDateOpen(true);
            }}
            placeholder="날짜를 선택하세요"
            value={formatDate(multipleDate, 'YYYY년 MM월 DD일 (ddd)')}
          />
          <DatePicker
            date={multipleDate}
            calendarType="multiple"
            onChange={setMultipleDate}
            isOpen={multipleDateOpen}
            holidays={holidays}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={(open) => setMultipleDateOpen(open)}
          />
        </div>
        <div>
          <p className="mb-2 text-base font-bold">DatePicker - Scroll</p>
          <PickerTrigger
            onClick={() => {
              setScrollDateOpen(true);
            }}
            placeholder="날짜를 선택하세요"
            value={formatDate(scrollDate, 'YYYY년 MM월 DD일 (ddd)')}
          />
          <DatePicker
            date={scrollDate}
            calendarType="scroll"
            onChange={setScrollDate}
            isOpen={scrollDateOpen}
            holidays={holidays}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={(open) => setScrollDateOpen(open)}
          />
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
