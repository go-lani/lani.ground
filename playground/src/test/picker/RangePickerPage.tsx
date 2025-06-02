import { dateKit } from '@lani.ground/kits';
import { RangePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/RangePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

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

  const examples = [
    {
      title: 'RangePicker - Default',
      description:
        '빠른 선택 옵션이 포함된 기본 범위 선택기입니다. 미리 정의된 기간을 쉽게 선택할 수 있습니다.',
      icon: '📊',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      range: quickSelectRange,
      isOpen: quickSelectRangeOpen,
      activeInput: quickSelectRangeActiveInput,
      onStartClick: () => {
        setQuickSelectRangeOpen(true);
        setQuickSelectRangeActiveInput('start');
      },
      onEndClick: () => {
        setQuickSelectRangeOpen(true);
        setQuickSelectRangeActiveInput('end');
      },
      onChange: setQuickSelectRange,
      onOpenChange: setQuickSelectRangeOpen,
      onActiveInputChange: setQuickSelectRangeActiveInput,
      calendarType: undefined,
      quickSelect: true,
    },
    {
      title: 'RangePicker - Multiple',
      description:
        '여러 달을 동시에 표시하는 범위 선택기입니다. 넓은 범위의 기간을 한눈에 보고 선택할 수 있습니다.',
      icon: '📅',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      range: multipleCalendarRange,
      isOpen: multipleRangeOpen,
      activeInput: multipleRangeActiveInput,
      onStartClick: () => {
        setMultipleRangeOpen(true);
        setMultipleRangeActiveInput('start');
      },
      onEndClick: () => {
        setMultipleRangeOpen(true);
        setMultipleRangeActiveInput('end');
      },
      onChange: setMultipleCalendarRange,
      onOpenChange: setMultipleRangeOpen,
      onActiveInputChange: setMultipleRangeActiveInput,
      calendarType: 'multiple' as const,
      quickSelect: false,
    },
    {
      title: 'RangePicker - Scroll',
      description:
        '스크롤 형태의 범위 선택기로, 연속적인 월 탐색이 가능합니다. 모바일에서 특히 유용한 UI입니다.',
      icon: '📜',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      range: scrollRange,
      isOpen: scrollRangeOpen,
      activeInput: scrollRangeActiveInput,
      onStartClick: () => {
        setScrollRangeOpen(true);
        setScrollRangeActiveInput('start');
      },
      onEndClick: () => {
        setScrollRangeOpen(true);
        setScrollRangeActiveInput('end');
      },
      onChange: setScrollRange,
      onOpenChange: setScrollRangeOpen,
      onActiveInputChange: setScrollRangeActiveInput,
      calendarType: 'scroll' as const,
      quickSelect: false,
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="RangePicker Examples">
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
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-gray-300 sm:text-sm">
                    선택된 기간:
                  </span>
                  <div className="xs:flex-row xs:items-center flex flex-col items-stretch gap-2">
                    <button
                      onClick={example.onStartClick}
                      className={`cursor-pointer rounded-lg border ${
                        example.activeInput === 'start'
                          ? 'border-blue-500 ring-2 ring-blue-500/20'
                          : example.borderColor
                      } xs:flex-initial min-w-0 flex-1 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:text-sm`}
                    >
                      <span className="block truncate">
                        {formatDate(example.range[0], 'YYYY.MM.DD') || '시작일'}
                      </span>
                    </button>
                    <span className="xs:text-left flex-shrink-0 text-center text-xs text-gray-400 sm:text-sm">
                      ~
                    </span>
                    <button
                      onClick={example.onEndClick}
                      className={`cursor-pointer rounded-lg border ${
                        example.activeInput === 'end'
                          ? 'border-blue-500 ring-2 ring-blue-500/20'
                          : example.borderColor
                      } xs:flex-initial min-w-0 flex-1 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:text-sm`}
                    >
                      <span className="block truncate">
                        {formatDate(example.range[1], 'YYYY.MM.DD') || '종료일'}
                      </span>
                    </button>
                  </div>
                </div>

                <RangePicker
                  range={example.range}
                  onChange={example.onChange}
                  calendarType={example.calendarType}
                  quickSelectOptions={
                    example.quickSelect ? quickSelectOptions : undefined
                  }
                  isOpen={example.isOpen}
                  onOpenChange={example.onOpenChange}
                  activeInput={example.activeInput}
                  weekendColor="#6B8EFF"
                  holidayColor="#FF8B8B"
                  onActiveInputChange={example.onActiveInputChange}
                  enableReset={example.quickSelect}
                />

                {/* 기능 설명 */}
                <div className="mt-3 rounded-lg bg-neutral-800/30 p-3 sm:mt-4 sm:p-4">
                  <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                    주요 기능
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {example.quickSelect && (
                      <li className="flex items-center gap-2">
                        <div
                          className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                        />
                        <span className="leading-relaxed">
                          빠른 선택 옵션 (7일, 14일, 28일, 3개월)
                        </span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        시작일/종료일 독립적 선택
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        휴일 및 주말 색상 커스터마이징
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        반응형 디자인 지원
                      </span>
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
