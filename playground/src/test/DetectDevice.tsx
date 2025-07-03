import { useDeviceDetect } from '@lani.ground/react-device-detector';
import { useEffect, useState } from 'react';
import ContentLayout from './common/ContentLayout';
import ExampleSection from './common/ExampleSection';

function DeviceInfoCard() {
  const deviceInfo = useDeviceDetect();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getDeviceIcon = () => {
    if (deviceInfo.isPhone) return '📱';
    if (deviceInfo.isTablet) return '📱';
    return '💻';
  };

  const getDeviceType = () => {
    if (deviceInfo.isPhone) return 'Phone';
    if (deviceInfo.isTablet) return 'Tablet';
    if (deviceInfo.isSmallDesktop) return 'Small Desktop';
    return 'Desktop';
  };

  const getDeviceColor = () => {
    if (deviceInfo.isPhone)
      return 'bg-green-100 text-green-800 border-green-200';
    if (deviceInfo.isTablet) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (deviceInfo.isSmallDesktop)
      return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 transition-all duration-300 hover:shadow-lg sm:rounded-xl sm:p-6">
        <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
            {getDeviceIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
              현재 디바이스 정보
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
              실시간으로 감지된 디바이스 정보를 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            {getDeviceType()}
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-300 sm:text-base">
                디바이스 상태
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">📱 Phone:</span>
                  <span
                    className={
                      deviceInfo.isPhone
                        ? 'font-medium text-green-400'
                        : 'text-gray-500'
                    }
                  >
                    {deviceInfo.isPhone ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">📱 Tablet:</span>
                  <span
                    className={
                      deviceInfo.isTablet
                        ? 'font-medium text-blue-400'
                        : 'text-gray-500'
                    }
                  >
                    {deviceInfo.isTablet ? '✓' : '✗'}
                  </span>
                </div>
                {deviceInfo.isSmallDesktop !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">💻 Small Desktop:</span>
                    <span
                      className={
                        deviceInfo.isSmallDesktop
                          ? 'font-medium text-purple-400'
                          : 'text-gray-500'
                      }
                    >
                      {deviceInfo.isSmallDesktop ? '✓' : '✗'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">🖥️ Desktop:</span>
                  <span
                    className={
                      deviceInfo.isDesktop
                        ? 'font-medium text-gray-300'
                        : 'text-gray-500'
                    }
                  >
                    {deviceInfo.isDesktop ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-300 sm:text-base">
                창 크기
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">너비:</span>
                  <span className="font-mono text-blue-400">
                    {windowSize.width}px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">높이:</span>
                  <span className="font-mono text-blue-400">
                    {windowSize.height}px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 sm:rounded-xl sm:p-6">
        <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
            🔄
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
              실시간 테스트
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
              창 크기를 조절해보세요! 브레이크포인트에 따라 디바이스 유형이
              실시간으로 변경됩니다.
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-neutral-800/30 p-3 sm:p-4">
          <div className="text-xs text-gray-400 sm:text-sm">
            📱 Phone: ≤ 720px | 📱 Tablet: ≤ 1024px | 💻 Desktop: &gt; 1024px
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeExamples() {
  const examples = [
    {
      title: '기본 사용법',
      description:
        'DeviceDetectorProvider로 앱을 감싸고 useDeviceDetect hook을 사용합니다.',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/5',
      borderColor: 'border-blue-500/20',
      code: `import { DeviceDetectorProvider, useDeviceDetect } from '@lani.ground/react-device-detector';

function App() {
  return (
    <DeviceDetectorProvider>
      <MyComponent />
    </DeviceDetectorProvider>
  );
}

function MyComponent() {
  const deviceInfo = useDeviceDetect();

  return (
    <div>
      {deviceInfo.isPhone && <div>📱 모바일 UI</div>}
      {deviceInfo.isTablet && <div>📱 태블릿 UI</div>}
      {deviceInfo.isDesktop && <div>💻 데스크톱 UI</div>}
    </div>
  );
}`,
    },
    {
      title: '커스텀 브레이크포인트',
      description: '사용자 정의 브레이크포인트를 설정할 수 있습니다.',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/5',
      borderColor: 'border-purple-500/20',
      code: `import { DeviceDetectorProvider } from '@lani.ground/react-device-detector';

const customBreakpoints = {
  PHONE: 600,        // 600px 이하는 Phone
  TABLET: 900,       // 900px 이하는 Tablet
  SMALL_DESKTOP: 1200 // 1200px 이하는 Small Desktop
};

function App() {
  return (
    <DeviceDetectorProvider breakPoints={customBreakpoints}>
      <MyComponent />
    </DeviceDetectorProvider>
  );
}`,
    },
    {
      title: '조건부 렌더링',
      description: '디바이스 타입에 따라 다른 컴포넌트를 렌더링합니다.',
      icon: '🎯',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/5',
      borderColor: 'border-emerald-500/20',
      code: `function ResponsiveComponent() {
  const { isPhone, isTablet, isDesktop, isSmallDesktop } = useDeviceDetect();

  if (isPhone) {
    return <MobileLayout />;
  }

  if (isTablet) {
    return <TabletLayout />;
  }

  if (isSmallDesktop) {
    return <SmallDesktopLayout />;
  }

  return <DesktopLayout />;
}`,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
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

          {/* 코드 블록 */}
          <div className="rounded-lg bg-neutral-900/50 p-3 sm:p-4">
            <pre className="overflow-x-auto">
              <code className="text-xs text-green-400 sm:text-sm">
                {example.code}
              </code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DetectDevicePage() {
  return (
    <ContentLayout packageName="react-device-detector">
      <ExampleSection title="Device Detector Examples">
        <DeviceInfoCard />
      </ExampleSection>

      <ExampleSection title="Code Examples">
        <CodeExamples />
      </ExampleSection>

      {/* API 문서 섹션 */}
      <ExampleSection title="API Documentation">
        <div className="space-y-4 sm:space-y-6">
          {/* useDeviceDetect Hook */}
          <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                🔧
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
                  useDeviceDetect Hook
                </h3>
                <div className="mt-3">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      반환값:
                    </h4>
                    <div className="rounded bg-neutral-900/50 p-3">
                      <code className="text-xs text-green-400">{`{
  isPhone: boolean,
  isTablet: boolean,
  isDesktop: boolean,
  isSmallDesktop?: boolean
}`}</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      Device Types:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-neutral-700">
                            <th className="py-2 pr-4 text-left font-medium text-gray-300">
                              Property
                            </th>
                            <th className="py-2 pr-4 text-left font-medium text-gray-300">
                              Type
                            </th>
                            <th className="py-2 text-left font-medium text-gray-300">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-400">
                          <tr className="border-b border-neutral-800">
                            <td className="py-2 pr-4 font-mono text-orange-400">
                              isPhone
                            </td>
                            <td className="py-2 pr-4 font-mono">boolean</td>
                            <td className="py-2">
                              화면 너비가 720px 이하인지 여부
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-800">
                            <td className="py-2 pr-4 font-mono text-orange-400">
                              isTablet
                            </td>
                            <td className="py-2 pr-4 font-mono">boolean</td>
                            <td className="py-2">
                              화면 너비가 1024px 이하인지 여부
                            </td>
                          </tr>
                          <tr className="border-b border-neutral-800">
                            <td className="py-2 pr-4 font-mono text-orange-400">
                              isDesktop
                            </td>
                            <td className="py-2 pr-4 font-mono">boolean</td>
                            <td className="py-2">
                              화면 너비가 1024px 초과인지 여부
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-mono text-orange-400">
                              isSmallDesktop
                            </td>
                            <td className="py-2 pr-4 font-mono">boolean?</td>
                            <td className="py-2">
                              커스텀 브레이크포인트 설정 시 제공
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DeviceDetectorProvider */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 sm:rounded-xl sm:p-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/50 text-lg sm:h-10 sm:w-10 sm:text-xl">
                🏭
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-base font-bold leading-tight text-transparent sm:text-lg">
                  DeviceDetectorProvider
                </h3>
                <div className="mt-3">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      Props:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-neutral-700">
                            <th className="py-2 pr-4 text-left font-medium text-gray-300">
                              Property
                            </th>
                            <th className="py-2 pr-4 text-left font-medium text-gray-300">
                              Type
                            </th>
                            <th className="py-2 text-left font-medium text-gray-300">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-400">
                          <tr className="border-b border-neutral-800">
                            <td className="py-2 pr-4 font-mono text-blue-400">
                              children
                            </td>
                            <td className="py-2 pr-4 font-mono">ReactNode</td>
                            <td className="py-2">하위 컴포넌트들</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-mono text-blue-400">
                              breakPoints
                            </td>
                            <td className="py-2 pr-4 font-mono">
                              BreakPoints?
                            </td>
                            <td className="py-2">커스텀 브레이크포인트 설정</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-300">
                      BreakPoints Interface:
                    </h4>
                    <div className="rounded bg-neutral-900/50 p-3">
                      <code className="text-xs text-green-400">{`interface BreakPoints {
  PHONE?: number;           // 기본값: 720
  TABLET?: number;          // 기본값: 1024
  SMALL_DESKTOP?: number;   // 선택사항
}`}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ExampleSection>
    </ContentLayout>
  );
}
