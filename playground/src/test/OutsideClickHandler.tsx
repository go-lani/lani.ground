import { OutsideClickHandler } from '@lani.ground/react-outside-click-handler';
import { useState } from 'react';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

export default function OutsideClickHandlerPage() {
  const [number, setNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const examples = [
    {
      title: 'Dropdown Menu',
      description:
        '외부 클릭을 감지하여 자동으로 닫히는 드롭다운 메뉴입니다. 사용자 경험을 향상시키는 필수 기능입니다.',
      icon: '👆',
      color: 'from-violet-500 to-indigo-500',
      bgColor: 'bg-violet-500/5',
      borderColor: 'border-violet-500/20',
      features: ['외부 클릭 감지', '자동 닫기'],
    },
  ];

  return (
    <ContentLayout packageName="react-outside-click-handler">
      <ExampleSection title="OutsideClickHandler Examples">
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
                    선택된 번호:
                  </span>
                  <div
                    className={`rounded-lg border ${example.borderColor} w-full bg-neutral-800/30 px-3 py-2 font-mono text-xs sm:w-auto sm:text-sm`}
                  >
                    {number || 'none'}
                  </div>
                </div>

                {/* 드롭다운 데모 */}
                <div className="relative">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border sm:justify-start sm:gap-3 sm:rounded-xl ${example.borderColor} bg-gradient-to-r ${example.color} px-4 py-3 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:px-6`}
                    onMouseDown={() => {
                      setIsVisible(!isVisible);
                    }}
                  >
                    <span className="flex-shrink-0 text-base sm:text-lg">
                      🔽
                    </span>
                    <span className="text-sm font-medium sm:text-base">
                      드롭다운 메뉴 열기
                    </span>
                    <svg
                      className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 sm:h-5 sm:w-5 ${
                        isVisible ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isVisible && (
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setIsVisible(false);
                      }}
                    >
                      <div className="absolute left-0 top-full z-10 mt-2 w-full min-w-[200px] overflow-hidden rounded-lg border border-neutral-700/50 bg-neutral-800 shadow-2xl sm:rounded-xl">
                        <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 p-2 sm:p-3">
                          <h4 className="text-xs font-medium text-gray-300 sm:text-sm">
                            숫자를 선택하세요
                          </h4>
                        </div>
                        <div className="p-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              type="button"
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-violet-500/20 sm:gap-3 sm:px-4 sm:py-3 ${
                                number === num
                                  ? 'bg-violet-500/20 text-violet-400'
                                  : 'text-gray-300'
                              }`}
                              onClick={() => {
                                setNumber(num);
                                setIsVisible(false);
                              }}
                            >
                              <div
                                className={`h-1.5 w-1.5 flex-shrink-0 rounded-full sm:h-2 sm:w-2 ${
                                  number === num
                                    ? 'bg-violet-400'
                                    : 'bg-gray-600'
                                }`}
                              />
                              <span className="text-xs font-medium sm:text-sm">
                                옵션 {num}
                              </span>
                              {number === num && (
                                <svg
                                  className="ml-auto h-3 w-3 flex-shrink-0 text-violet-400 sm:h-4 sm:w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </OutsideClickHandler>
                  )}
                </div>

                <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
                  <h4 className="mb-2 text-xs font-medium text-gray-300 sm:mb-3 sm:text-sm">
                    사용법 안내
                  </h4>
                  <div className="space-y-1 text-xs text-gray-400 sm:space-y-2 sm:text-sm">
                    <p>• 위 버튼을 클릭하여 드롭다운 메뉴를 열어보세요</p>
                    <p>
                      • 메뉴 항목을 클릭하거나 외부 영역을 클릭하면 메뉴가
                      닫힙니다
                    </p>
                    <p>• 현재 선택된 값이 위에 표시됩니다</p>
                  </div>
                </div>

                {/* 기능 설명 */}
                <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
                  <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                    주요 기능
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {example.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                        />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExampleSection>

      {/* 추가 사용 예시 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="활용 예시">
          <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 sm:rounded-xl sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-sm sm:h-8 sm:w-8 sm:text-lg">
                  📋
                </div>
                <div className="min-w-0 space-y-1 sm:space-y-2">
                  <h3 className="text-sm font-bold leading-tight text-emerald-400 sm:text-base">
                    메뉴 & 드롭다운
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                    네비게이션 메뉴, 셀렉트 박스, 컨텍스트 메뉴 등
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 sm:rounded-xl sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-sm sm:h-8 sm:w-8 sm:text-lg">
                  🪟
                </div>
                <div className="min-w-0 space-y-1 sm:space-y-2">
                  <h3 className="text-sm font-bold leading-tight text-blue-400 sm:text-base">
                    모달 & 팝업
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                    툴팁, 팝오버, 다이얼로그의 외부 클릭 처리
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 sm:rounded-xl sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-sm sm:h-8 sm:w-8 sm:text-lg">
                  ✏️
                </div>
                <div className="min-w-0 space-y-1 sm:space-y-2">
                  <h3 className="text-sm font-bold leading-tight text-purple-400 sm:text-base">
                    인라인 편집
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                    인라인 에디터의 저장/취소 처리
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4 sm:rounded-xl sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-sm sm:h-8 sm:w-8 sm:text-lg">
                  🎛️
                </div>
                <div className="min-w-0 space-y-1 sm:space-y-2">
                  <h3 className="text-sm font-bold leading-tight text-orange-400 sm:text-base">
                    설정 패널
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                    사이드바, 설정 드로어의 닫기 처리
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ExampleSection>
      </div>

      {/* Props 정의 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="OutsideClickHandler Props">
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
                          children
                        </td>
                        <td className="py-2 pr-4 font-mono">React.ReactNode</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">
                          외부 클릭 감지가 적용될 자식 컴포넌트
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          onOutsideClick
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(e: MouseEvent) => void`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">
                          외부 영역 클릭 시 호출되는 콜백
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          disabled
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          외부 클릭 감지 비활성화 여부 (기본값: false)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-purple-400">
                          capture
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          이벤트 캡처링 사용 여부 (기본값: true)
                        </td>
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
