import { validateKit } from '@lani.ground/kits';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function ValidateKitPage() {
  const [emailInput, setEmailInput] = useState('test@example.com');
  const [phoneInput, setPhoneInput] = useState('010-1234-5678');

  const examples = [
    {
      title: 'isValidFormat',
      description:
        '주어진 값이 지정된 형식(이메일, 전화번호)에 맞는지 검증합니다.',
      icon: '✅',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
      interactive: true,
      inputValue: emailInput,
      onInputChange: setEmailInput,
      placeholder: '이메일을 입력하세요',
      secondaryInput: {
        value: phoneInput,
        onChange: setPhoneInput,
        placeholder: '전화번호를 입력하세요 (010-0000-0000)',
      },
      code: `validateKit.isValidFormat({ format: 'email', value: '${emailInput}' })`,
      result: `${emailInput}: ${
        validateKit.isValidFormat({ format: 'email', value: emailInput })
          ? '유효함 ✅'
          : '유효하지 않음 ❌'
      }`,
      testCaseGroups: [
        {
          title: '📧 이메일 검증',
          cases: [
            {
              input: 'test@example.com',
              format: 'email',
              label: '일반적인 이메일',
            },
            { input: 'invalid-email', format: 'email', label: '잘못된 형식' },
            {
              input: 'user.name+tag@domain.co.kr',
              format: 'email',
              label: '복잡한 이메일',
            },
            { input: '@domain.com', format: 'email', label: '사용자명 누락' },
            { input: 'user@', format: 'email', label: '도메인 누락' },
            {
              input: 'user@domain',
              format: 'email',
              label: '최상위 도메인 누락',
            },
          ],
        },
        {
          title: '📱 전화번호 검증',
          cases: [
            { input: '010-1234-5678', format: 'phone', label: '올바른 형식' },
            { input: '01012345678', format: 'phone', label: '하이픈 없음' },
            { input: '010-123-5678', format: 'phone', label: '자릿수 틀림' },
            { input: '02-1234-5678', format: 'phone', label: '지역번호 형식' },
            { input: '011-1234-5678', format: 'phone', label: '011 번호' },
            { input: '010-12345-678', format: 'phone', label: '잘못된 자릿수' },
          ],
        },
      ],
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="validateKit Examples">
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
                            const isValid = validateKit.isValidFormat({
                              format: testCase.format as 'email' | 'phone',
                              value: testCase.input,
                            });
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between rounded bg-neutral-900/50 p-3"
                              >
                                <div>
                                  <code className="text-xs text-yellow-400">
                                    isValidFormat(
                                    {`{ format: '${testCase.format}', value: '${testCase.input}' }`}
                                    )
                                  </code>
                                  <p className="text-xs text-gray-400">
                                    {testCase.label}
                                  </p>
                                </div>
                                <div
                                  className={`text-xs font-medium ${
                                    isValid ? 'text-green-400' : 'text-red-400'
                                  }`}
                                >
                                  {isValid ? '유효함 ✅' : '유효하지 않음 ❌'}
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
