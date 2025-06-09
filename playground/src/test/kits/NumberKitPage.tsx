import { numberKit } from '@lani.ground/kits';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function NumberKitPage() {
  const [numberInput, setNumberInput] = useState('1234567.89123');
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [dividerInput, setDividerInput] = useState('1234567');

  const examples = [
    {
      title: 'divideNumberToDigits - 천 단위 구분자',
      description: '숫자를 지정된 자리수마다 구분자로 나누어 표시합니다.',
      icon: '🔢',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      interactive: true,
      inputValue: dividerInput,
      onInputChange: setDividerInput,
      placeholder: '숫자를 입력하세요',
      code: `numberKit.divideNumberToDigits(${dividerInput})`,
      result: numberKit.divideNumberToDigits(Number(dividerInput)),
    },
    {
      title: 'formatDecimalNumber',
      description:
        '숫자를 소수점 이하 지정된 자리수까지 포맷팅하고, removeTrailingZeros 옵션으로 불필요한 0을 제거할 수 있습니다.',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      interactive: true,
      inputValue: numberInput,
      onInputChange: setNumberInput,
      placeholder: '숫자를 입력하세요',
      secondaryInput: {
        value: decimalPlaces,
        onChange: setDecimalPlaces,
        placeholder: '소수점 자리수',
      },
      code: `numberKit.formatDecimalNumber('${numberInput}', ${decimalPlaces})`,
      result: numberKit.formatDecimalNumber(numberInput, Number(decimalPlaces)),
      testCaseGroups: [
        {
          title: '📊 기본 소수점 포맷팅',
          cases: [
            {
              input: '1234567.89123',
              decimal: 2,
              removeZeros: false,
              label: '기본 소수점 포맷팅 (2자리)',
            },
            {
              input: '999.999',
              decimal: 2,
              removeZeros: false,
              label: '반올림 처리',
            },
            {
              input: '0.000123',
              decimal: 6,
              removeZeros: false,
              label: '작은 소수점 (6자리)',
            },
            {
              input: '1000000',
              decimal: 0,
              removeZeros: false,
              label: '정수 포맷팅',
            },
            {
              input: '-1234.567',
              decimal: 2,
              removeZeros: false,
              label: '음수 처리',
            },
            {
              input: '1.23e-7',
              decimal: 10,
              removeZeros: false,
              label: '지수 표기법',
            },
          ],
        },
        {
          title: '✂️ removeTrailingZeros 옵션',
          cases: [
            {
              input: '123.4500',
              decimal: 4,
              removeZeros: false,
              label: '끝자리 0 유지 (false)',
            },
            {
              input: '123.4500',
              decimal: 4,
              removeZeros: true,
              label: '끝자리 0 제거 (true)',
            },
            {
              input: '100.0000',
              decimal: 4,
              removeZeros: false,
              label: '모든 소수점 0 유지 (false)',
            },
            {
              input: '100.0000',
              decimal: 4,
              removeZeros: true,
              label: '모든 소수점 0 제거 (true)',
            },
            {
              input: '999.1010',
              decimal: 4,
              removeZeros: true,
              label: '중간 0은 유지, 끝 0만 제거',
            },
            {
              input: '0.5000',
              decimal: 4,
              removeZeros: true,
              label: '0.5 형태로 정리',
            },
          ],
        },
      ],
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="numberKit Examples">
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

              {/* 테스트 케이스들 */}
              {example.testCaseGroups && (
                <div className="mt-4 rounded-lg bg-neutral-800/30 p-4">
                  <div className="grid gap-2">
                    {example.testCaseGroups.map((group, idx) => (
                      <div key={idx} className="rounded bg-neutral-900/50 p-3">
                        <h5 className="mb-2 text-sm font-medium text-white">
                          {group.title}
                        </h5>
                        <div className="grid gap-2">
                          {group.cases.map((testCase, idx) => {
                            const result = numberKit.formatDecimalNumber(
                              testCase.input,
                              testCase.decimal,
                              testCase.removeZeros,
                            );
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded bg-neutral-900/50 p-3"
                              >
                                <div>
                                  <code className="text-xs text-yellow-400">
                                    formatDecimalNumber('{testCase.input}',{' '}
                                    {testCase.decimal}
                                    {testCase.removeZeros ? ', true' : ''})
                                  </code>
                                  <p className="text-xs text-gray-400">
                                    {testCase.label}
                                  </p>
                                </div>
                                <div className="text-xs font-medium text-cyan-400">
                                  {result}
                                </div>
                              </div>
                            );
                          })}
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
