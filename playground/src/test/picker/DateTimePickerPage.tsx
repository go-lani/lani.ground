import { dateKit } from '@lani.ground/kits';
import { DateTimePicker } from '@lani.ground/react-picker';
import '@lani.ground/react-picker/styles/DateTimePicker.css';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

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

  const examples = [
    {
      title: 'DateTimePicker - Default',
      description:
        '날짜와 시간을 함께 선택할 수 있는 통합 선택기입니다. 스크롤 달력과 시간 선택기가 결합된 형태로 제공됩니다.',
      icon: '🕐',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      value: basicDateTime,
      isOpen: basicDateTimeOpen,
      onToggle: () => setBasicDateTimeOpen(true),
      onChange: setBasicDateTime,
      onOpenChange: setBasicDateTimeOpen,
      format: 'YYYY년 MM월 DD일 HH:mm:ss',
      placeholder: '날짜와 시간을 선택하세요',
    },
  ];

  return (
    <ContentLayout packageName="react-picker">
      <ExampleSection title="DateTimePicker Examples">
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
                    선택된 날짜/시간:
                  </span>
                  <button
                    onClick={example.onToggle}
                    className={`cursor-pointer rounded-lg border ${example.borderColor} w-full min-w-0 bg-neutral-800/30 px-3 py-2 text-center text-xs transition-all duration-200 hover:border-opacity-60 hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 sm:w-auto sm:text-left sm:text-sm`}
                  >
                    <span className="block truncate">
                      {formatDate(example.value, example.format) ||
                        example.placeholder}
                    </span>
                  </button>
                </div>

                <DateTimePicker
                  calendarType="scroll"
                  value={example.value}
                  onChange={example.onChange}
                  isOpen={example.isOpen}
                  holidays={holidays}
                  weekendColor="#6B8EFF"
                  holidayColor="#FF8B8B"
                  onOpenChange={example.onOpenChange}
                  ampm
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
                        날짜와 시간 동시 선택
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        스크롤 형태의 달력 UI
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">
                        AM/PM 12시간 형식 지원
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
        <ExampleSection title="DateTimePicker Props">
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
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
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          value
                        </td>
                        <td className="py-2 pr-4 font-mono">Date | null</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">선택된 날짜와 시간</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          onChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(date: Date | null) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">
                          날짜/시간 변경 시 호출되는 콜백
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          isOpen
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">
                          날짜/시간 선택기 열림/닫힘 상태
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          onOpenChange
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(open: boolean) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">열림/닫힘 상태 변경 콜백</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          calendarType
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          'scroll' | 'default'
                        </td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          달력 표시 형태 (기본값: 'default')
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          ampm
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          AM/PM 형식 사용 여부 (기본값: false)
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          minuteStep
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          1 | 5 | 10 | 15 | 30
                        </td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">분 단위 스텝 (기본값: 1)</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          secondStep
                        </td>
                        <td className="py-2 pr-4 font-mono">
                          1 | 5 | 10 | 15 | 30
                        </td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">초 단위 스텝 (기본값: 1)</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          minDate
                        </td>
                        <td className="py-2 pr-4 font-mono">Date</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">선택 가능한 최소 날짜</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          maxDate
                        </td>
                        <td className="py-2 pr-4 font-mono">Date</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">선택 가능한 최대 날짜</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          weekendColor
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">주말 날짜 색상</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          holidayColor
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">휴일 날짜 색상</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          holidays
                        </td>
                        <td className="py-2 pr-4 font-mono">Date[]</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">휴일 날짜 목록</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-purple-400">
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
