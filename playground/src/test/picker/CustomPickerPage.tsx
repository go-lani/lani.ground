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

  const examples = [
    {
      title: 'Custom Picker',
      description:
        'Calendar와 TimePicker를 조합한 커스텀 picker 예시입니다. 모달 형태로 제공되며 날짜와 시간 범위를 함께 선택할 수 있습니다.',
      icon: '🎨',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
      isOpen: isCustomCalendarOpen,
      onToggle: () => setIsCustomCalendarOpen(true),
      onClose: () => setIsCustomCalendarOpen(false),
      range,
      customState,
      placeholder: '날짜 범위를 선택하세요',
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="Custom Picker Examples">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-1 lg:gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`rounded-lg border sm:rounded-xl ${example.borderColor} ${example.bgColor} p-4 transition-all duration-300 hover:shadow-lg sm:p-6`}
            >
              {/* 헤더 */}
              <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                  {example.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`bg-gradient-to-r text-base font-bold sm:text-lg ${example.color} bg-clip-text leading-tight text-transparent`}
                  >
                    {example.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                    {example.description}
                  </p>
                </div>
              </div>

              {/* 인터랙션 영역 */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex-shrink-0 text-xs font-medium text-gray-300 sm:text-sm">
                    선택된 범위:
                  </span>
                  <button
                    onClick={example.onToggle}
                    className={`cursor-pointer rounded-lg border ${example.borderColor} w-full min-w-0 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:w-auto sm:min-w-[250px] sm:text-left sm:text-sm`}
                  >
                    <span className="block truncate">
                      {example.range[0] && example.range[1]
                        ? `${formatDate(
                            example.range[0],
                            'YYYY-MM-DD HH:mm',
                          )} ~ ${formatDate(
                            example.range[1],
                            'YYYY-MM-DD HH:mm',
                          )}`
                        : example.placeholder}
                    </span>
                  </button>
                </div>

                {/* 모달 컴포넌트 */}
                <Modal
                  name="custom-picker"
                  component={(closeModal) => (
                    <CustomPickerModal
                      rangeState={example.customState}
                      closeModal={closeModal}
                    />
                  )}
                  onClose={example.onClose}
                  animation={{
                    className: 'sample',
                    duration: 300,
                  }}
                  isOpen={example.isOpen}
                  centerMode
                />

                {/* 기능 설명 */}
                <div className="mt-3 rounded-lg bg-neutral-800/30 p-3 sm:mt-4 sm:p-4">
                  <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                    주요 기능
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        Calendar + TimePicker 조합
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">모달 형태의 UI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        날짜 + 시간 범위 선택
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        커스텀 UI 구성 예제
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">애니메이션 효과</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
