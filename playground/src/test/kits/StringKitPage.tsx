import { stringKit } from '@lani.ground/kits';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function StringKitPage() {
  const [stringInput, setStringInput] = useState(
    '안녕하세요, 이것은 길고 긴 텍스트입니다.',
  );
  const [cutLength, setCutLength] = useState('10');
  const [directionInput, setDirectionInput] = useState('right');
  const [firstCharInput, setFirstCharInput] = useState('hello world');
  const [maskInput, setMaskInput] = useState('홍길동');

  const examples = [
    {
      title: 'getCutString - 문자열 자르기',
      description: '문자열을 지정된 길이로 잘라서 말줄임표(...)를 추가합니다.',
      icon: '✂️',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      interactive: true,
      inputValue: cutLength,
      onInputChange: setCutLength,
      placeholder: '자를 길이를 입력하세요',
      secondaryInput: {
        value: stringInput,
        onChange: setStringInput,
        placeholder: '텍스트를 입력하세요',
      },
      thirdInput: {
        value: directionInput,
        onChange: setDirectionInput,
        placeholder: '방향 (right/left)',
      },
      code: `stringKit.getCutString({ value: "${stringInput}", length: ${cutLength}, dir: "${directionInput}" })`,
      result: stringKit.getCutString({
        value: stringInput,
        length: Number(cutLength),
        dir: directionInput as 'right' | 'left',
      }),
    },
    {
      title: 'maskString - 문자열 마스킹',
      description: '문자열의 중간 부분을 * 문자로 마스킹 처리합니다.',
      icon: '🎭',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      interactive: true,
      inputValue: maskInput,
      onInputChange: setMaskInput,
      placeholder: '마스킹할 텍스트를 입력하세요',
      code: `stringKit.maskString('${maskInput}')`,
      result: stringKit.maskString(maskInput),
      testCases: [
        { input: '홍길동', label: '3글자 이름' },
        { input: '김철수', label: '3글자 이름' },
        { input: '이유진', label: '3글자 이름' },
        { input: '박서준', label: '3글자 이름' },
        { input: '홍길', label: '2글자 이름' },
        { input: '김', label: '1글자 이름' },
        { input: 'john@example.com', label: '이메일 마스킹' },
        { input: '010-1234-5678', label: '전화번호 마스킹' },
      ],
    },
    {
      title: 'transformToQueryString - 쿼리 문자열 변환',
      description: '객체를 URL 쿼리 문자열로 변환합니다.',
      icon: '🔗',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      interactive: false,
      code: `stringKit.transformToQueryString({ page: 1, limit: 10, search: 'test', tags: ['js', 'react'] })`,
      result: stringKit.transformToQueryString({
        page: 1,
        limit: 10,
        search: 'test',
        tags: ['js', 'react'],
      }),
    },
    {
      title: 'transformFirstCharUpperCase - 첫 글자 대문자',
      description: '문자열의 첫 번째 문자를 대문자로 변환합니다.',
      icon: '🔤',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      interactive: true,
      inputValue: firstCharInput,
      onInputChange: setFirstCharInput,
      placeholder: '변환할 텍스트를 입력하세요',
      code: `stringKit.transformFirstCharUpperCase('${firstCharInput}')`,
      result: stringKit.transformFirstCharUpperCase(firstCharInput),
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="stringKit Examples">
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
                  {example.thirdInput && (
                    <input
                      type="text"
                      value={example.thirdInput.value}
                      onChange={(e) =>
                        example.thirdInput?.onChange?.(e.target.value)
                      }
                      placeholder={example.thirdInput.placeholder}
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
              {example.testCases && (
                <div className="mt-4 rounded-lg bg-neutral-800/30 p-4">
                  <h4 className="mb-3 text-sm font-medium text-white">
                    테스트 케이스
                  </h4>
                  <div className="grid gap-2">
                    {example.testCases.map((testCase, idx) => {
                      const result = stringKit.maskString(testCase.input);
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded bg-neutral-900/50 p-3"
                        >
                          <div>
                            <code className="text-xs text-yellow-400">
                              {testCase.input}
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
              )}
            </div>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
