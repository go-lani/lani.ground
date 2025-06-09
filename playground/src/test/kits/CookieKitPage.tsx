import { cookieKit } from '@lani.ground/kits';
import { useState } from 'react';
import ContentLayout from '../common/ContentLayout';
import ExampleSection from '../common/ExampleSection';

export default function CookieKitPage() {
  const [cookieName, setCookieName] = useState('testCookie');
  const [cookieValue, setCookieValue] = useState('testValue');
  const [checkCookieName, setCheckCookieName] = useState('testCookie');
  const [forceUpdate, setForceUpdate] = useState(0); // 강제 리렌더링용 상태

  // 쿠키 설정 후 리렌더링
  const handleSetCookie = () => {
    cookieKit.setCookie(cookieName, cookieValue);
    setForceUpdate((prev) => prev + 1); // 리렌더링 트리거
  };

  // 쿠키 삭제 후 리렌더링
  const handleDeleteCookie = () => {
    cookieKit.deleteCookie(checkCookieName);
    setForceUpdate((prev) => prev + 1); // 리렌더링 트리거
  };

  const examples = [
    {
      title: 'setCookie - 쿠키 설정',
      description:
        '쿠키를 설정합니다. 경로, 만료시간 등 다양한 옵션을 설정할 수 있습니다.',
      icon: '🍪',
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-500/5',
      borderColor: 'border-amber-500/20',
      interactive: true,
      inputValue: cookieName,
      onInputChange: setCookieName,
      placeholder: '쿠키 이름',
      secondaryInput: {
        value: cookieValue,
        onChange: setCookieValue,
        placeholder: '쿠키 값',
      },
      code: `cookieKit.setCookie('${cookieName}', '${cookieValue}')`,
      result: '쿠키가 설정되었습니다',
      action: handleSetCookie,
    },
    {
      title: 'getCookie - 쿠키 읽기',
      description: '지정된 이름의 쿠키 값을 가져옵니다.',
      icon: '📖',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      interactive: true,
      inputValue: checkCookieName,
      onInputChange: setCheckCookieName,
      placeholder: '확인할 쿠키 이름',
      code: `cookieKit.getCookie('${checkCookieName}')`,
      result: cookieKit.getCookie(checkCookieName) || '쿠키가 없습니다',
    },
    {
      title: 'hasCookie - 쿠키 존재 확인',
      description: '지정된 이름의 쿠키가 존재하는지 확인합니다.',
      icon: '🔍',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      interactive: false,
      code: `cookieKit.hasCookie('${checkCookieName}')`,
      result: `${checkCookieName}: ${
        cookieKit.hasCookie(checkCookieName) ? '존재함 ✅' : '존재하지 않음 ❌'
      }`,
    },
    {
      title: 'deleteCookie - 쿠키 삭제',
      description: '지정된 이름의 쿠키를 삭제합니다.',
      icon: '🗑️',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/5',
      borderColor: 'border-red-500/20',
      interactive: false,
      code: `cookieKit.deleteCookie('${checkCookieName}')`,
      result: '쿠키가 삭제되었습니다',
      action: handleDeleteCookie,
      showButton: true,
    },
  ];

  return (
    <ContentLayout packageName="kits">
      <ExampleSection title="cookieKit Examples">
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
                    {example.action && (
                      <button
                        onClick={example.action}
                        className={`rounded bg-gradient-to-r ${example.color} px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg`}
                      >
                        실행
                      </button>
                    )}
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
              <div className="flex items-center justify-between rounded bg-neutral-900/80 p-3">
                <div>
                  <div className="text-xs text-gray-300">결과:</div>
                  <pre className="mt-1 whitespace-pre-wrap text-xs text-cyan-400">
                    {example.result}
                  </pre>
                </div>
                {example.showButton && example.action && (
                  <button
                    onClick={example.action}
                    className={`rounded bg-gradient-to-r ${example.color} px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg`}
                  >
                    삭제
                  </button>
                )}
              </div>

              {/* 쿠키 설정 예시 */}
              {index === 0 && (
                <div className="mt-4 rounded-lg bg-neutral-800/30 p-4">
                  <h4 className="mb-3 text-sm font-medium text-white">
                    고급 쿠키 설정 예시
                  </h4>
                  <div className="space-y-2">
                    <div className="rounded bg-neutral-900/50 p-3">
                      <code className="text-xs text-green-400">
                        cookieKit.setCookie('token', 'abc123', {'{'}path: '/',
                        expires: 'today'{'}'})
                      </code>
                      <p className="mt-1 text-xs text-gray-400">
                        오늘 자정에 만료되는 쿠키
                      </p>
                    </div>
                    <div className="rounded bg-neutral-900/50 p-3">
                      <code className="text-xs text-green-400">
                        cookieKit.setCookie('session', 'xyz789', {'{'}maxAge:
                        3600{'}'})
                      </code>
                      <p className="mt-1 text-xs text-gray-400">
                        1시간 후 만료되는 쿠키
                      </p>
                    </div>
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
