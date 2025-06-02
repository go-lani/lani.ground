import { dateKit } from '@lani.ground/kits';
import { DateTimePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/DateTimePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';
import PickerTrigger from '../components/picker/PickerTrigger';

export default function DateTimePickerPage() {
  const { formatDate } = dateKit;

  // DateTimePicker
  const [basicDateTime, setBasicDateTime] = useState<Date | null>(null);
  const [basicDateTimeOpen, setBasicDateTimeOpen] = useState(false);

  const holidays = [
    new Date('2025-01-01'), // 신정
    new Date('2025-02-09'), // 설날
    new Date('2025-03-01'), // 삼일절
    new Date('2025-05-05'), // 어린이날
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="DateTimePicker">
        <div>
          <p className="mb-2 text-base font-bold">DateTimePicker - Default</p>
          <PickerTrigger
            onClick={() => setBasicDateTimeOpen(true)}
            placeholder="날짜와 시간을 선택하세요"
            value={formatDate(basicDateTime, 'YYYY년 MM월 DD일 HH:mm:ss')}
          />
          <DateTimePicker
            calendarType="scroll"
            value={basicDateTime}
            onChange={setBasicDateTime}
            isOpen={basicDateTimeOpen}
            holidays={holidays}
            weekendColor="#6B8EFF"
            holidayColor="#FF8B8B"
            onOpenChange={(open) => {
              setBasicDateTimeOpen(open);
            }}
            ampm
          />
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
