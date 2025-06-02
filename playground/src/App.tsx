import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Lnb from './test/common/Lnb';

function App() {
  const location = useLocation();

  return (
    <main className="relative flex min-h-[100dvh] flex-col gap-[20px] bg-neutral-900 p-4 text-white md:flex-row md:items-start md:justify-center md:p-8">
      <nav className="mb-14 w-full md:sticky md:top-8 md:mb-0 md:mr-auto md:max-w-[320px]">
        <Lnb />
      </nav>
      <div className="mr-auto w-full md:max-w-[800px]">
        {location.key === 'default' && (
          <div className="mb-14 overflow-hidden rounded-2xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/30 to-neutral-900/50 p-12 backdrop-blur-sm">
            {/* 배경 패턴 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

            <div className="relative text-center">
              {/* 메인 타이틀 */}
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-xl">
                  🚀
                </div>
                <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent">
                  @lani.ground
                </h1>
              </div>

              {/* 서브타이틀 */}
              <p className="mb-8 text-xl text-gray-300">
                Modern React Component Library
              </p>

              {/* 설명 */}
              <p className="mb-8 leading-relaxed text-gray-400">
                프로덕션 레디 React 컴포넌트들을 탐색해보세요. <br />각 패키지는
                TypeScript를 지원하며, 현대적인 웹 애플리케이션을 위해
                설계되었습니다.
              </p>

              {/* 기능 배지들 */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-blue-400 backdrop-blur-sm">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">TypeScript</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-purple-400 backdrop-blur-sm">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">모듈형 디자인</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400 backdrop-blur-sm">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">테스트 완료</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-orange-400 backdrop-blur-sm">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" />
                  </svg>
                  <span className="text-sm font-medium">반응형</span>
                </div>
              </div>

              {/* 시작 안내 */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  ← 왼쪽 메뉴에서 원하는 패키지를 선택해서 시작하세요
                </p>
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </main>
  );
}

export default App;
