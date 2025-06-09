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

      {/* Props 정의 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="RangePicker Props">
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
                  Props 정의
                </h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-neutral-700">
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Name
                        </th>
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Type
                        </th>
                        <th className="py-2 pr-4 text-left font-medium text-gray-300">
                          Required
                        </th>
                        <th className="py-2 text-left font-medium text-gray-300">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          range
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          [Date | null, Date | null]
                        </td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">
                          선택된 날짜 범위 [시작일, 종료일]
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          onChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(range: [Date | null, Date | null]) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">범위 변경 시 호출되는 콜백</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          isOpen
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">달력 열림/닫힘 상태</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          onOpenChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(isOpen: boolean) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">달력 열림/닫힘 상태 변경 콜백</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          calendarType
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          'default' | 'multiple' | 'scroll'
                        </td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          달력 표시 형태 (기본값: 'default')
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          activeInput
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          'start' | 'end' | null
                        </td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">현재 활성화된 입력 필드</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          onActiveInputChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(activeInput: 'start' | 'end' | null) => void`}</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">활성 입력 필드 변경 콜백</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          quickSelectOptions
                        </td>
                        <td className="py-2 pr-4 font-mono">{`{ label: string; days: number }[]`}</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">빠른 선택 옵션 목록</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          enableReset
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">범위 초기화 버튼 표시 여부</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          weekDays
                        </td>
                        <td className="py-2 pr-4 font-mono">string[]</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          요일 표시 형태 (기본값: ['일', '월', '화', '수', '목',
                          '금', '토'])
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          minDate
                        </td>
                        <td className="py-2 pr-4 font-mono">Date</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">선택 가능한 최소 날짜</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          maxDate
                        </td>
                        <td className="py-2 pr-4 font-mono">Date</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">선택 가능한 최대 날짜</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          weekendColor
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">주말 날짜 색상</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          holidayColor
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">휴일 날짜 색상</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          holidays
                        </td>
                        <td className="py-2 pr-4 font-mono">Date[]</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">휴일 날짜 목록</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          autoClose
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          날짜 선택 시 자동으로 달력을 닫을지 여부 (기본값:
                          false)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          className
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">추가 CSS 클래스명</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ExampleSection>
      </div>
    </ContentLayout>
  );
}
