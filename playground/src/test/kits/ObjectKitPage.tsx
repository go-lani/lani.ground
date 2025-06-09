import { objectKit } from '@lani.ground/kits';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function ObjectKitPage() {
  const examples = [
    {
      title: 'isEmptyObject - 빈 객체 체크',
      description: '주어진 객체가 빈 객체인지 확인합니다.',
      icon: '🧩',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      interactive: false,
      code: `objectKit.isEmptyObject({})`,
      result: `빈 객체: ${objectKit.isEmptyObject({})}`,
      additionalExamples: [
        {
          code: `objectKit.isEmptyObject({ a: 1 })`,
          result: `값이 있는 객체: ${objectKit.isEmptyObject({ a: 1 })}`,
        },
      ],
    },
    {
      title: 'getCompleteObject - 완전한 객체 반환',
      description:
        '값이 undefined이거나 null인 키를 제거하여 완전한 객체를 반환합니다.',
      icon: '🔧',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      interactive: false,
      code: `objectKit.getCompleteObject({ a: 1, b: null, c: 'test', d: undefined })`,
      result: JSON.stringify(
        objectKit.getCompleteObject({
          a: 1,
          b: null,
          c: 'test',
          d: undefined,
        }),
        null,
        2,
      ),
    },
    {
      title: 'getObjectKeyByValue - 값으로 키 찾기',
      description: '객체에서 특정 값에 해당하는 키를 찾습니다.',
      icon: '🔍',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      interactive: false,
      code: `objectKit.getObjectKeyByValue({ red: '#ff0000', blue: '#0000ff' }, '#ff0000')`,
      result: objectKit.getObjectKeyByValue(
        { red: '#ff0000', blue: '#0000ff' },
        '#ff0000',
      ),
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="objectKit Examples">
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

              {/* 추가 예시들 */}
              {example.additionalExamples && (
                <div className="mt-4 space-y-2">
                  {example.additionalExamples.map((addExample, idx) => (
                    <div key={idx} className="rounded bg-neutral-800/30 p-3">
                      <div className="mb-2 rounded bg-neutral-900/50 p-2">
                        <code className="text-xs text-green-400">
                          {addExample.code}
                        </code>
                      </div>
                      <div className="rounded bg-neutral-900/80 p-2">
                        <div className="text-xs text-gray-300">결과:</div>
                        <pre className="mt-1 whitespace-pre-wrap text-xs text-cyan-400">
                          {addExample.result}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
