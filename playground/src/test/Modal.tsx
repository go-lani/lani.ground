import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';
import { useEffect, useState } from 'react';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';
import DummyComponent from './mock/DummyComponent';

export default function ModalPage() {
  const [isVaild, setIsValid] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(!!Math.round(Math.random()));
  }, []);

  const examples = [
    {
      title: 'Direct Modal',
      description:
        '항상 열려있는 다이렉트 모달입니다. 페이지 로드 시 바로 표시됩니다.',
      icon: '🪟',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      isOpen: true,
      component: (closeModal: () => void) => (
        <div className="rounded-lg bg-white p-8 text-black">
          <h3 className="mb-4 text-xl font-bold">Direct Modal</h3>
          <p className="mb-4 text-gray-600">
            이것은 항상 열려있는 다이렉트 모달입니다.
          </p>
          <button
            type="button"
            className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      ),
      features: [
        '항상 열림',
        '다이렉트 렌더링',
        '스크롤 잠금 해제',
        '즉시 표시',
      ],
    },
    {
      title: 'Basic Modal',
      description:
        '기본적인 모달 컴포넌트입니다. 버튼을 클릭해서 열고 닫을 수 있습니다.',
      icon: '📱',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/5',
      borderColor: 'border-indigo-500/20',
      isOpen: isOpen1,
      onToggle: () => setIsOpen1(true),
      onClose: () => setIsOpen1(false),
      component: (closeModal: () => void) => (
        <div className="rounded-lg bg-white p-8 text-black">
          <h3 className="mb-4 text-xl font-bold">Basic Modal</h3>
          <p className="mb-4 text-gray-600">
            이것은 기본적인 모달 컴포넌트입니다.
          </p>
          <button
            type="button"
            className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      ),
      features: ['버튼으로 열기/닫기', '중앙 정렬', '딤 배경', '애니메이션'],
    },

    {
      title: 'Conditional Modal',
      description:
        '조건부 렌더링이 가능한 모달입니다. 랜덤하게 유/무효 팝업을 보여줍니다.',
      icon: '🎲',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      isOpen: isOpen2,
      onToggle: () => {
        setIsValid(!!Math.round(Math.random()));
        setIsOpen2(true);
      },
      onClose: () => setIsOpen2(false),
      component: () => {
        if (isVaild) {
          return (
            <div className="rounded-lg bg-white p-8 text-black">
              <div className="text-center">
                <div className="mb-4 text-4xl">✅</div>
                <p className="text-gray-600">유효한 상태입니다.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="rounded-lg bg-white p-8 text-black">
            <div className="text-center">
              <div className="mb-4 text-4xl">❌</div>
              <p className="text-gray-600">유효하지 않은 상태입니다.</p>
            </div>
          </div>
        );
      },
      features: ['조건부 렌더링', '랜덤 상태', '자동 닫기', '상태 표시'],
    },
    {
      title: 'Advanced Modal',
      description:
        '고급 기능이 포함된 모달입니다. 외부 클릭 비활성화, 컨테이너 패딩, 복잡한 컴포넌트를 포함합니다.',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      isOpen: isOpen3,
      onToggle: () => setIsOpen3(true),
      onClose: () => setIsOpen3(false),
      component: (closeModal: () => Promise<void>) => (
        <DummyComponent closeModal={closeModal} />
      ),
      features: [
        '외부 클릭 비활성화',
        '컨테이너 패딩',
        '복잡한 UI',
        '중앙 정렬',
      ],
    },
  ];

  return (
    <ContentLayout packageName="react-modal">
      <ExampleSection title="Modal Examples">
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
                {example.onToggle && (
                  <button
                    type="button"
                    className={`w-full rounded-lg border sm:rounded-xl ${example.borderColor} bg-gradient-to-r ${example.color} p-3 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:p-4`}
                    onClick={example.onToggle}
                  >
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <span className="flex-shrink-0 text-base sm:text-lg">
                        {example.icon}
                      </span>
                      <span className="text-sm font-medium sm:text-base">
                        모달 열기
                      </span>
                      <svg
                        className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </button>
                )}

                {/* 모달 컴포넌트 */}
                <Modal
                  component={example.component}
                  onClose={example.onClose || (() => console.log('close'))}
                  animation={{
                    className: 'sample',
                    duration: 300,
                  }}
                  dim="rgba(0, 0, 0, 0.8)"
                  isOpen={example.isOpen}
                  centerMode
                  isUnlockScroll={index === 1}
                  containerPadding={index === 3 ? '20px' : undefined}
                  disabledOutsideClose={index === 3}
                />

                {/* 기능 설명 */}
                <div className="mt-3 rounded-lg bg-neutral-800/30 p-3 sm:mt-4 sm:p-4">
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

      {/* Props 정의 섹션 */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ExampleSection title="Modal Props">
          <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
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
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          component
                        </td>
                        <td className="py-2 pr-4 font-mono">{`(closeModal: () => Promise<void>) => JSX.Element`}</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">모달 안에 렌더링될 컴포넌트</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          isOpen
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-red-400">Required</td>
                        <td className="py-2">모달 열림/닫힘 상태</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          onClose
                        </td>
                        <td className="py-2 pr-4 font-mono">{`() => unknown`}</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">모달 닫힐 때 호출되는 콜백</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          name
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">모달 식별자 (기본값: 'modal')</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          dim
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          배경 딤 색상 (예: 'rgba(0, 0, 0, 0.8)')
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          centerMode
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          모달을 화면 중앙에 배치할지 여부 (기본값: false)
                        </td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          animation
                        </td>
                        <td className="py-2 pr-4 font-mono">{`{ className?: string; duration: number }`}</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">애니메이션 설정</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          containerPadding
                        </td>
                        <td className="py-2 pr-4 font-mono">string</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">모달 컨테이너 패딩</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          isUnlockScroll
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          스크롤 잠금 해제 여부 (기본값: false)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-violet-400">
                          disabledOutsideClose
                        </td>
                        <td className="py-2 pr-4 font-mono">boolean</td>
                        <td className="py-2 pr-4 text-gray-500">Optional</td>
                        <td className="py-2">
                          외부 클릭으로 닫기 비활성화 여부 (기본값: false)
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
