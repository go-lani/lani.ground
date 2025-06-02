import {
  useCookies,
  useString,
  useVisibleElement,
  useWindowScroll,
} from '@lani.ground/react-hooks';
import { useMemo, useState } from 'react';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

export default function HooksPage() {
  const { ellipsis } = useString();
  const { getCookie, setCookie, hasCookie, deleteCookie } = useCookies();
  const { lockScroll, unlockScroll } = useWindowScroll();
  const { ref, activeElement, activeKey } = useVisibleElement();
  const [flag, setFlag] = useState(false);

  const setTestCookie = () => {
    const day = new Date();
    day.setMinutes(day.getMinutes() + 1);
    setCookie('test', 'true', { expires: 'today' });
    setFlag(!flag);
  };

  const checkCookie = () => {
    const hasTest = hasCookie('test');
    console.log('hasTest', hasTest); // true | false
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = useMemo(() => getCookie('test'), [flag]);

  const examples = [
    {
      title: 'useCookies',
      description:
        '쿠키를 쉽게 관리할 수 있는 hook입니다. 설정, 확인, 삭제 기능을 제공합니다.',
      icon: '🍪',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="flex-shrink-0 text-xs font-medium text-gray-300 sm:text-sm">
              현재 쿠키(key: test) 값:
            </span>
            <div className="w-full rounded-lg border border-emerald-500/20 bg-neutral-800/30 px-3 py-2 text-xs sm:w-auto sm:text-sm">
              {String(cookie) || 'undefined'}
            </div>
          </div>

          <div className="xs:grid-cols-3 grid grid-cols-1 gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400 transition-colors hover:bg-emerald-500/20 sm:px-4 sm:text-sm"
              onClick={() => checkCookie()}
            >
              🔍 쿠키 확인
            </button>
            <button
              type="button"
              className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-400 transition-colors hover:bg-blue-500/20 sm:px-4 sm:text-sm"
              onClick={() => setTestCookie()}
            >
              ✅ 쿠키 설정
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/20 sm:px-4 sm:text-sm"
              onClick={() => {
                deleteCookie('test');
                setFlag(!flag);
              }}
            >
              🗑️ 쿠키 삭제
            </button>
          </div>
        </div>
      ),
      features: [
        '쿠키 설정/조회/삭제',
        '만료일 설정',
        '브라우저 호환성',
        '타입 안전성',
      ],
    },
    {
      title: 'useString',
      description:
        '문자열 조작을 위한 유틸리티 hook입니다. 생략 표시(ellipsis) 기능을 제공합니다.',
      icon: '✂️',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
            <h4 className="mb-2 text-xs font-medium text-gray-300 sm:mb-3 sm:text-sm">
              텍스트 생략 예시
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="xs:flex-row xs:justify-between xs:gap-2 flex flex-col gap-1">
                <span className="flex-shrink-0 text-gray-400">원본:</span>
                <span className="break-all font-mono">"안녕하세요 세상!"</span>
              </div>
              <div className="xs:flex-row xs:justify-between xs:gap-2 flex flex-col gap-1">
                <span className="flex-shrink-0 text-gray-400">왼쪽 생략:</span>
                <span className="break-all font-mono text-purple-400">
                  "
                  {ellipsis({
                    value: '안녕하세요 세상!',
                    length: 6,
                    dir: 'left',
                  })}
                  "
                </span>
              </div>
              <div className="xs:flex-row xs:justify-between xs:gap-2 flex flex-col gap-1">
                <span className="flex-shrink-0 text-gray-400">
                  오른쪽 생략:
                </span>
                <span className="break-all font-mono text-purple-400">
                  "
                  {ellipsis({
                    value: '안녕하세요 세상!',
                    length: 6,
                    dir: 'right',
                  })}
                  "
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      features: [
        '문자열 생략',
        '방향 선택 (좌/우)',
        '길이 제한',
        '유니코드 지원',
      ],
    },
    {
      title: 'useWindowScroll',
      description:
        '윈도우 스크롤을 제어하는 hook입니다. 스크롤 잠금/해제 기능을 제공합니다.',
      icon: '📜',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-xs leading-relaxed text-gray-400 sm:text-sm">
            페이지 스크롤을 잠그거나 해제할 수 있습니다. 모달이나 팝업에서
            유용합니다.
          </div>

          <div className="xs:grid-cols-2 grid grid-cols-1 gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400 transition-colors hover:bg-red-500/20 sm:px-4 sm:text-sm"
              onClick={lockScroll}
            >
              🔒 스크롤 잠금
            </button>
            <button
              type="button"
              className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs text-green-400 transition-colors hover:bg-green-500/20 sm:px-4 sm:text-sm"
              onClick={unlockScroll}
            >
              🔓 스크롤 해제
            </button>
          </div>
        </div>
      ),
      features: [
        '스크롤 잠금/해제',
        '모달 지원',
        '브라우저 호환성',
        '상태 관리',
      ],
    },
    {
      title: 'useVisibleElement',
      description:
        '화면에 보이는 요소를 감지하는 hook입니다. Intersection Observer API를 활용합니다.',
      icon: '👁️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/5',
      borderColor: 'border-orange-500/20',
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="sticky top-0 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 sm:p-4">
            <h4 className="mb-2 text-xs font-medium text-yellow-400 sm:text-sm">
              현재 보이는 요소
            </h4>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="xs:flex-row xs:items-center xs:gap-2 flex flex-col gap-1">
                <span className="flex-shrink-0 text-gray-400">Active Key:</span>
                <span className="break-all font-mono text-yellow-400">
                  {activeKey || 'none'}
                </span>
              </div>
              <div className="xs:flex-row xs:items-center xs:gap-2 flex flex-col gap-1">
                <span className="flex-shrink-0 text-gray-400">Element:</span>
                <span className="break-all font-mono text-xs text-yellow-400">
                  {activeElement?.tagName || 'none'}
                </span>
              </div>
            </div>
          </div>

          <div ref={ref} className="space-y-3 sm:space-y-4">
            <div className="flex h-[30vh] items-center justify-center rounded-lg border border-red-500/20 bg-gradient-to-br from-red-500/20 to-pink-500/20 sm:h-[40vh] sm:rounded-xl lg:h-[50vh]">
              <h3 className="text-lg font-bold text-red-400 sm:text-xl">
                Section 1
              </h3>
            </div>
            <div className="flex h-[30vh] items-center justify-center rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 sm:h-[40vh] sm:rounded-xl lg:h-[50vh]">
              <h3 className="text-lg font-bold text-green-400 sm:text-xl">
                Section 2
              </h3>
            </div>
            <div className="flex h-[30vh] items-center justify-center rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 sm:h-[40vh] sm:rounded-xl lg:h-[50vh]">
              <h3 className="text-lg font-bold text-blue-400 sm:text-xl">
                Section 3
              </h3>
            </div>
            <div className="flex h-[30vh] items-center justify-center rounded-lg border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 sm:h-[40vh] sm:rounded-xl lg:h-[50vh]">
              <h3 className="text-lg font-bold text-purple-400 sm:text-xl">
                Section 4
              </h3>
            </div>
          </div>
        </div>
      ),
      features: [
        'Intersection Observer',
        '가시성 감지',
        '스크롤 이벤트',
        '성능 최적화',
      ],
    },
  ];

  return (
    <ContentLayout packageName="react-hooks">
      <ExampleSection title="Hooks Examples">
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

              {/* 내용 */}
              <div className="mb-3 sm:mb-4">{example.content}</div>

              {/* 기능 설명 */}
              <div className="mt-3 rounded-lg bg-neutral-800/30 p-3 sm:mt-4 sm:p-4">
                <h4 className="mb-2 text-xs font-medium text-gray-300 sm:text-sm">
                  주요 기능
                </h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  {example.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div
                        className={`h-1 w-1 rounded-full bg-gradient-to-r sm:h-1.5 sm:w-1.5 ${example.color} flex-shrink-0`}
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* useVisibleElement 데모 섹션 */}
          <div className="space-y-3 sm:space-y-4" ref={ref}>
            <h3 className="text-base font-bold text-white sm:text-lg">
              useVisibleElement 데모
            </h3>
            <div className="grid gap-2 sm:gap-3">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  data-visible-key={`demo-${i + 1}`}
                  className={`rounded-lg border p-3 transition-all duration-300 sm:p-4 ${
                    activeElement?.getAttribute('data-visible-key') ===
                    `demo-${i + 1}`
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-neutral-700 bg-neutral-800/30 text-gray-400'
                  }`}
                >
                  <h4 className="text-sm font-medium sm:text-base">
                    데모 항목 {i + 1}
                  </h4>
                  <p className="mt-1 text-xs opacity-70 sm:text-sm">
                    이 요소가 화면에 보이면 하이라이트됩니다.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
