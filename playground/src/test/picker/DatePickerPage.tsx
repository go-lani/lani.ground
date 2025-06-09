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

      {/* Props 정의 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="DatePicker Props">
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
                          date
                        </td>
                        <td className="py-2 pr-4 font-mono">Date | null</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">선택된 날짜</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          onChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(date: Date) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">날짜 변경 시 호출되는 콜백</td>
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
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-blue-400">
                          disabled
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">비활성화 여부 (기본값: false)</td>
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
