import { dateKit } from '@lani.ground/kits';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function DateKitPage() {
  // 각 예제를 위한 상태
  const [dateFormatInput, setDateFormatInput] = useState('YYYY-MM-DD HH:mm:ss');
  const [yearInput, setYearInput] = useState('2024');
  const [monthInput, setMonthInput] = useState('2');

  const examples = [
    {
      title: 'formatDate - 날짜 포매팅',
      description: '다양한 형식으로 날짜를 포맷팅할 수 있습니다.',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      interactive: true,
      inputValue: dateFormatInput,
      onInputChange: setDateFormatInput,
      placeholder: '포맷 문자열을 입력하세요',
      code: `dateKit.formatDate(new Date(), '${dateFormatInput}')`,
      result: dateKit.formatDate(new Date(), dateFormatInput),
      examples: [
        { format: 'YYYY-MM-DD', description: '기본 날짜 형식' },
        { format: 'YYYY년 MM월 DD일', description: '한국어 형식' },
        { format: 'MM/DD/YYYY HH:mm:ss', description: '미국식 날짜 시간' },
        { format: 'dddd, MMMM DD, YYYY', description: '영어 전체 형식' },
        { format: 'A hh:mm', description: 'AM/PM 시간' },
      ],
    },
    {
      title: 'getValueByUnit - 날짜 정보 추출',
      description: '날짜 객체에서 년, 월, 일, 시, 분, 초 등을 추출합니다.',
      icon: '🔍',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      interactive: false,
      code: `dateKit.getValueByUnit(new Date())`,
      result: JSON.stringify(dateKit.getValueByUnit(new Date()), null, 2),
    },
    {
      title: 'isLeapYear - 윤년 체크',
      description: '주어진 연도가 윤년인지 확인합니다.',
      icon: '📅',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      interactive: true,
      inputValue: yearInput,
      onInputChange: setYearInput,
      placeholder: '연도를 입력하세요',
      code: `dateKit.isLeapYear(${yearInput})`,
      result: `${yearInput}년: ${
        dateKit.isLeapYear(Number(yearInput)) ? '윤년' : '평년'
      }`,
    },
    {
      title: 'getLastDayOfMonth - 마지막 날',
      description: '주어진 연도와 월의 마지막 날을 반환합니다.',
      icon: '📆',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      interactive: true,
      inputValue: monthInput,
      onInputChange: setMonthInput,
      placeholder: '월을 입력하세요 (1-12)',
      secondaryInput: {
        value: yearInput,
        onChange: setYearInput,
        placeholder: '연도를 입력하세요',
      },
      code: `dateKit.getLastDayOfMonth(${yearInput}, ${monthInput})`,
      result: `${yearInput}년 ${monthInput}월의 마지막 날: ${dateKit.getLastDayOfMonth(
        Number(yearInput),
        Number(monthInput),
      )}일`,
    },
    {
      title: 'getUTC0Info - UTC 날짜 정보',
      description: '주어진 날짜의 UTC0 기준 날짜 정보를 반환합니다.',
      icon: '🌍',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
      interactive: false,
      code: `dateKit.getUTC0Info(new Date())`,
      result: JSON.stringify(dateKit.getUTC0Info(new Date()), null, 2),
    },
    {
      title: 'displayDateFormat - 오프셋 날짜 포맷팅',
      description: '주어진 날짜를 지정된 오프셋 및 포맷으로 포맷팅합니다.',
      icon: '🎯',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-500/5',
      borderColor: 'border-rose-500/20',
      interactive: false,
      code: `dateKit.displayDateFormat({ date: '2024-01-01T12:00:00', offset: '+09:00', format: 'YYYY년 MM월 DD일 HH시' })`,
      result: dateKit.displayDateFormat({
        date: '2024-01-01T12:00:00',
        offset: '+09:00',
        format: 'YYYY년 MM월 DD일 HH시',
      }),
    },
    {
      title: '날짜 비교 함수들',
      description: '날짜 범위 확인 및 전후 비교를 위한 유틸리티 함수들입니다.',
      icon: '📊',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/5',
      borderColor: 'border-indigo-500/20',
      interactive: false,
      code: `다양한 날짜 비교 함수들`,
      result: '아래 예시 참조',
      examples: [
        {
          title: 'isWithinDateRange',
          description: '현재 시간이 범위 내에 있는지 확인',
          code: `dateKit.isWithinDateRange({
  current: new Date(),
  startDT: new Date('2024-01-01'),
  endDT: new Date('2024-12-31')
})`,
          result: dateKit.isWithinDateRange({
            current: new Date(),
            startDT: new Date('2024-01-01'),
            endDT: new Date('2024-12-31'),
          }),
        },
        {
          title: 'isBefore',
          description: '날짜가 특정 날짜보다 이전인지 확인',
          code: `dateKit.isBefore({
  current: new Date('2024-01-01'),
  targetDT: new Date('2024-12-31')
})`,
          result: dateKit.isBefore({
            current: new Date('2024-01-01'),
            targetDT: new Date('2024-12-31'),
          }),
        },
        {
          title: 'isAfter',
          description: '날짜가 특정 날짜보다 이후인지 확인',
          code: `dateKit.isAfter({
  current: new Date(),
  targetDT: new Date('2024-01-01')
})`,
          result: dateKit.isAfter({
            current: new Date(),
            targetDT: new Date('2024-01-01'),
          }),
        },
      ],
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="dateKit Examples">
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

              {/* 인터랙티브 입력 */}
              {example.interactive && (
                <div className="mb-3 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={example.inputValue}
                      onChange={(e) => example.onInputChange?.(e.target.value)}
                      placeholder={example.placeholder}
                      className="flex-1 rounded bg-neutral-700/50 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                    />
                  </div>
                  {example.secondaryInput && (
                    <input
                      type="text"
                      value={example.secondaryInput.value}
                      onChange={(e) =>
                        example.secondaryInput?.onChange?.(e.target.value)
                      }
                      placeholder={example.secondaryInput.placeholder}
                      className="w-full rounded bg-neutral-700/50 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                    />
                  )}
                </div>
              )}

              {/* 코드 */}
              <div className="mb-3 rounded bg-neutral-900/50 p-3">
                <code className="text-xs text-green-400">{example.code}</code>
              </div>

              {/* 결과 */}
              <div className="rounded bg-neutral-900/80 p-3">
                <div className="text-xs text-gray-300">결과:</div>
                <pre className="mt-1 whitespace-pre-wrap text-xs text-cyan-400">
                  {example.result}
                </pre>
              </div>

              {/* 포맷 예시들 (formatDate 예제일 경우) */}
              {example.title === 'formatDate - 날짜 포매팅' &&
                example.examples && (
                  <div className="mt-4 rounded-lg bg-neutral-800/30 p-4">
                    <h4 className="mb-3 text-sm font-medium text-white">
                      포맷 예시
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {example.examples.map((formatExample: any, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded bg-neutral-900/50 p-2"
                        >
                          <div>
                            <code className="text-xs text-yellow-400">
                              {formatExample.format}
                            </code>
                            <p className="text-xs text-gray-400">
                              {formatExample.description}
                            </p>
                          </div>
                          <div className="text-xs text-cyan-400">
                            {dateKit.formatDate(
                              new Date(),
                              formatExample.format,
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 날짜 비교 함수 예시들 */}
              {example.title === '날짜 비교 함수들' && example.examples && (
                <div className="mt-4 rounded-lg bg-neutral-800/30 p-4">
                  <h4 className="mb-3 text-sm font-medium text-white">
                    함수별 예시
                  </h4>
                  <div className="grid gap-3">
                    {example.examples.map((funcExample: any, idx) => (
                      <div key={idx} className="rounded bg-neutral-900/50 p-3">
                        <h5 className="mb-2 text-sm font-medium text-indigo-400">
                          {funcExample.title}
                        </h5>
                        <p className="mb-2 text-xs text-gray-400">
                          {funcExample.description}
                        </p>
                        <div className="mb-2 rounded bg-neutral-800/50 p-2">
                          <code className="text-xs text-green-400">
                            {funcExample.code}
                          </code>
                        </div>
                        <div className="rounded bg-neutral-800/80 p-2">
                          <div className="text-xs text-gray-300">결과:</div>
                          <div className="text-xs font-medium text-cyan-400">
                            {String(funcExample.result)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
