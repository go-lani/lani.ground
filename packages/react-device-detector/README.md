# react-device-detector

## Installation

```bash
npm install @lani.ground/react-device-detector

// or

yarn add @lani.ground/react-device-detector
```

## Usage

### 기본 사용법

먼저 앱의 최상위에서 `DeviceDetectorProvider`로 감싸주세요.

```tsx
import {
  DeviceDetectorProvider,
  useDeviceDetect,
} from '@lani.ground/react-device-detector';

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
}
```

### 커스텀 브레이크포인트

기본 브레이크포인트 대신 원하는 값으로 설정할 수 있어요.

```tsx
import { DeviceDetectorProvider } from '@lani.ground/react-device-detector';

const customBreakpoints = {
  PHONE: 600, // 600px 이하는 Phone
  TABLET: 900, // 900px 이하는 Tablet
  SMALL_DESKTOP: 1200, // 1200px 이하는 Small Desktop (선택사항)
};

function App() {
  return (
    <DeviceDetectorProvider breakPoints={customBreakpoints}>
      <MyComponent />
    </DeviceDetectorProvider>
  );
}
```

### 조건부 렌더링 예제

```tsx
function ResponsiveComponent() {
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
}
```

## API Reference

### DeviceDetectorProvider

앱 전체에서 디바이스 정보를 사용할 수 있도록 하는 Context Provider입니다.

#### Props

| Prop          | Type              | Default                        | Description                |
| ------------- | ----------------- | ------------------------------ | -------------------------- |
| `children`    | `React.ReactNode` | -                              | Provider로 감쌀 컴포넌트들 |
| `breakPoints` | `IBreakPoints`    | `{ PHONE: 720, TABLET: 1024 }` | 커스텀 브레이크포인트      |

#### IBreakPoints Interface

```tsx
interface IBreakPoints {
  PHONE: number; // 모바일 최대 너비
  TABLET: number; // 태블릿 최대 너비
  SMALL_DESKTOP?: number; // 소형 데스크톱 최대 너비 (선택사항)
}
```

### useDeviceDetect

현재 디바이스 정보를 반환하는 React Hook입니다.

#### Returns

```tsx
interface IDeviceInfo {
  isPhone: boolean; // 모바일 디바이스 여부
  isTablet: boolean; // 태블릿 디바이스 여부
  isDesktop: boolean; // 데스크톱 디바이스 여부
  isSmallDesktop?: boolean; // 소형 데스크톱 여부 (SMALL_DESKTOP 설정 시)
}
```

## 기본 브레이크포인트

- **Phone**: 720px 이하
- **Tablet**: 721px ~ 1024px
- **Desktop**: 1025px 이상

## 주의사항

- `useDeviceDetect`는 반드시 `DeviceDetectorProvider` 내부에서 사용해야 합니다.
- SSR 환경에서는 초기 렌더링 시 기본값으로 Desktop이 설정되고, 클라이언트에서 실제 값으로 업데이트됩니다.(페이지 전체 effect 적용해서 회피 필요)
