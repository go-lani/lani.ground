import { dateKit } from '@lani.ground/kits';
import { DatePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/DatePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

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

  const examples = [
    {
      title: 'DatePicker - Default',
      description:
        '기본적인 단일 달력 형태의 날짜 선택기입니다. 간단하고 직관적인 UI를 제공합니다.',
      icon: '📅',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      value: basicDate,
      isOpen: basicDateOpen,
      onToggle: () => setBasicDateOpen(true),
      onChange: setBasicDate,
      onOpenChange: setBasicDateOpen,
      calendarType: undefined,
      placeholder: '날짜를 선택하세요',
    },
    {
      title: 'DatePicker - Multiple',
      description:
        '여러 달을 동시에 표시하는 달력입니다. 넓은 범위의 날짜를 한눈에 볼 수 있습니다.',
      icon: '📊',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      value: multipleDate,
      isOpen: multipleDateOpen,
      onToggle: () => setMultipleDateOpen(true),
      onChange: setMultipleDate,
      onOpenChange: setMultipleDateOpen,
      calendarType: 'multiple' as const,
      placeholder: '날짜를 선택하세요',
    },
    {
      title: 'DatePicker - Scroll',
      description:
        '스크롤 형태의 달력으로, 연속적인 월 탐색이 가능합니다. 모바일에서 특히 유용합니다.',
      icon: '📜',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      value: scrollDate,
      isOpen: scrollDateOpen,
      onToggle: () => setScrollDateOpen(true),
      onChange: setScrollDate,
      onOpenChange: setScrollDateOpen,
      calendarType: 'scroll' as const,
      placeholder: '날짜를 선택하세요',
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="DatePicker Examples">
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
                    선택된 날짜:
                  </span>
                  <button
                    onClick={example.onToggle}
                    className={`cursor-pointer rounded-lg border ${example.borderColor} w-full min-w-0 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:w-auto sm:text-left sm:text-sm`}
                  >
                    <span className="block truncate">
                      {formatDate(example.value, 'YYYY년 MM월 DD일 (ddd)') ||
                        example.placeholder}
                    </span>
                  </button>
                </div>

                <DatePicker
                  date={example.value}
                  calendarType={example.calendarType}
                  onChange={example.onChange}
                  isOpen={example.isOpen}
                  holidays={holidays}
                  weekendColor="#6B8EFF"
                  holidayColor="#FF8B8B"
                  onOpenChange={(open) => example.onOpenChange(open)}
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
                        휴일 및 주말 색상 커스터마이징
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
