import { dateKit } from '@lani.ground/kits';
import { Modal } from '@lani.ground/react-modal';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';
import CustomPickerModal from '../components/picker/CustomPickerModal';

export default function CustomPickerPage() {
  const { formatDate } = dateKit;

  // Custom Picker
  const [isCustomCalendarOpen, setIsCustomCalendarOpen] = useState(false);
  const customState = useState<[Date | null, Date | null]>([null, null]);
  const [range] = customState;

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="Custom Picker">
        <div>
          <p className="mb-2 text-base font-bold">
            Custom Picker(used Calendar & TimePicker)
          </p>
          <Modal
            name="custom-picker"
            component={(closeModal) => (
              <CustomPickerModal
                rangeState={customState}
                closeModal={closeModal}
              />
            )}
            onClose={() => {
              setIsCustomCalendarOpen(false);
            }}
            animation={{
              className: 'sample',
              duration: 300,
            }}
            isOpen={isCustomCalendarOpen}
            centerMode
          />

          <button
            type="button"
            className="rounded bg-neutral-500 px-4 py-2 text-sm font-bold text-white"
            onClick={() => {
              setIsCustomCalendarOpen(true);
            }}
          >
            {range[0] && range[1]
              ? `${formatDate(range[0], 'YYYY-MM-DD HH:mm')} ~ ${formatDate(
                  range[1],
                  'YYYY-MM-DD HH:mm',
                )}`
              : '날짜를 선택해주세요'}
          </button>
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
