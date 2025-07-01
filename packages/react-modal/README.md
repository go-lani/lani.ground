# react-modal

React에서 모달을 쉽게 관리할 수 있는 라이브러리입니다. Context API와 훅을 기반으로 하여 간편하고 직관적인 모달 관리가 가능합니다.

## Installation

```bash
npm install @lani.ground/react-modal

# or

yarn add @lani.ground/react-modal
```

### 필수 요구사항

- React 18.0.0 이상
- React DOM 18.0.0 이상

> **참고**: 이 패키지는 React 18의 `startTransition` 기능을 사용하여 최적의 성능과 Next.js 15+ 호환성을 제공합니다.

## Usage

### Next.js App Router에서 사용하기

Next.js App Router 환경에서도 `ModalProvider`를 그대로 사용할 수 있습니다. 라이브러리 내부에서 자동으로 SSR 이슈를 처리합니다:

```tsx
// app/layout.tsx
import { ModalProvider } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
```

### 일반 React 앱에서 사용하기

### 1. 앱에 ModalProvider 설정하기

먼저 앱의 최상위 컴포넌트를 `ModalProvider`로 감싸주세요:

```tsx
import { ModalProvider } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';

function App() {
  return (
    <ModalProvider>
      {/* 여기에 앱 컴포넌트들 */}
      <YourAppComponents />
    </ModalProvider>
  );
}
```

### 2. 모달 컴포넌트 만들기

모달로 표시할 컴포넌트를 만들어주세요:

```tsx
interface MyModalProps {
  closeModal: () => Promise<void>;
}

function MyModal({ closeModal }: MyModalProps) {
  return (
    <div>
      <h2>모달 제목</h2>
      <p>모달 내용입니다.</p>
      <button onClick={closeModal}>
        닫기
      </button>
    </div>
  );
}
```

### 3. useModal 훅으로 모달 제어하기

`useModal` 훅을 사용하여 모달을 열고 닫을 수 있습니다:

```tsx
import { useModal } from '@lani.ground/react-modal';

export default function Component() {
  const modal = useModal();

  const openModal = () => {
    modal.open({
      name: 'my-modal',
      component: (closeModal) => <MyModal closeModal={closeModal} />,
      centerMode: true,
      dim: 'rgba(0, 0, 0, 0.8)',
      animation: {
        className: 'fade',
        duration: 300,
      },
    });
  };

  const closeModal = () => {
    modal.close('my-modal');
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <button onClick={closeModal}>모달 닫기</button>
    </div>
  );
}
```

### 4. 중첩 모달 사용하기

모달 안에서 다른 모달을 열 수도 있습니다:

```tsx
function ParentModal({ closeModal }: { closeModal: () => Promise<void> }) {
  const modal = useModal();

  const openChildModal = () => {
    modal.open({
      name: 'child-modal',
      component: (closeChildModal) => (
        <ChildModal closeModal={closeChildModal} />
      ),
      centerMode: true,
      dim: 'rgba(0, 0, 0, 0.5)',
    });
  };

  return (
    <div>
      <h2>부모 모달</h2>
      <button onClick={openChildModal}>자식 모달 열기</button>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
}
```

## API Reference

### ModalProvider

앱의 최상위에서 모달 컨텍스트를 제공하는 컴포넌트입니다.

```tsx
<ModalProvider>{/* 앱 컴포넌트들 */}</ModalProvider>
```

### useModal Hook

모달을 제어하기 위한 훅입니다.

```tsx
const modal = useModal();
```

#### 반환값

| 메서드     | 타입                                | 설명                                 |
| ---------- | ----------------------------------- | ------------------------------------ |
| `open`     | `(options: ModalConfig) => string` | 모달을 열고 모달의 name을 반환합니다 |
| `close`    | `(name: string) => Promise<void>`   | 특정 이름의 모달을 닫습니다          |
| `closeAll` | `() => Promise<void>`               | 모든 모달을 닫습니다                 |
| `isOpen`   | `(name: string) => boolean`         | 특정 모달이 열려있는지 확인합니다    |

### ModalConfig

`modal.open()` 메서드에 전달하는 옵션들입니다.

| 속성                   | 타입                                               | 기본값      | 설명                                        |
| ---------------------- | -------------------------------------------------- | ----------- | ------------------------------------------- |
| `name`                 | `string`                                           | 자동생성    | 모달의 고유 이름 (중첩 모달 사용 시 필수)   |
| `component`            | `(closeModal: () => Promise<void>) => JSX.Element` | **필수**    | 모달로 표시할 컴포넌트                      |
| `centerMode`           | `boolean`                                          | `false`     | 모달을 화면 중앙에 정렬할지 여부            |
| `dim`                  | `string`                                           | `undefined` | 배경 딤 색상 (예: `"rgba(0, 0, 0, 0.8)"`)   |
| `animation`            | `AnimationOptions`                                 | `undefined` | 애니메이션 설정                             |
| `containerPadding`     | `string`                                           | `undefined` | 모달 컨테이너의 패딩값                      |
| `disabledScrollLock`   | `boolean`                                          | `false`     | 배경 스크롤 잠금을 비활성화할지 여부        |
| `disabledOutsideClose` | `boolean`                                          | `false`     | 외부 클릭으로 모달 닫기를 비활성화할지 여부 |
| `onClose`              | `() => void`                                       | `undefined` | 모달이 닫힐 때 호출되는 콜백                |

### AnimationOptions

| 속성        | 타입     | 기본값      | 설명                             |
| ----------- | -------- | ----------- | -------------------------------- |
| `className` | `string` | `undefined` | 애니메이션에 사용할 CSS 클래스명 |
| `duration`  | `number` | **필수**    | 애니메이션 지속 시간 (밀리초)    |

## 애니메이션 커스터마이징

CSS를 사용하여 모달의 등장/사라짐 애니메이션을 커스터마이징할 수 있습니다:

```css
/* 모달이 나타날 때 */
.react-modal__container__enter.fade {
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.react-modal__container__enter.fade > div {
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

/* 모달이 사라질 때 */
.react-modal__container__exit.fade {
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.react-modal__container__exit.fade > div {
  transform: scale(0.8);
  transition: all 0.3s ease-in-out;
}
```

## 사용 예제

### 기본 모달

```tsx
const modal = useModal();

const openBasicModal = () => {
  modal.open({
    name: 'basic-modal',
    component: (closeModal) => (
      <div>
        <h2>기본 모달</h2>
        <button onClick={closeModal}>닫기</button>
      </div>
    ),
    centerMode: true,
    dim: 'rgba(0, 0, 0, 0.5)',
  });
};
```

### 확인 모달 (외부 클릭 불가)

```tsx
const openConfirmModal = () => {
  modal.open({
    name: 'confirm-modal',
    component: (closeModal) => (
      <div>
        <h2>정말 삭제하시겠습니까?</h2>
        <div>
          <button onClick={closeModal}>
            취소
          </button>
          <button
            onClick={async () => {
              // 삭제 로직
              await closeModal();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    ),
    centerMode: true,
    disabledOutsideClose: true, // 외부 클릭으로 닫기 비활성화
    dim: 'rgba(0, 0, 0, 0.8)',
  });
};
```

### 스크롤 가능한 모달

```tsx
const openScrollableModal = () => {
  modal.open({
    name: 'scrollable-modal',
    component: (closeModal) => (
      <div>
        <h2>긴 콘텐츠 모달</h2>
        {/* 긴 콘텐츠들... */}
        <button onClick={closeModal}>닫기</button>
      </div>
    ),
    centerMode: true,
    disabledScrollLock: true, // 배경 스크롤 잠금 비활성화
  });
};
```

### 애니메이션이 있는 모달

```tsx
const openAnimatedModal = () => {
  modal.open({
    name: 'animated-modal',
    component: (closeModal) => (
      <div>
        <h2>애니메이션 모달</h2>
        <button onClick={closeModal}>닫기</button>
      </div>
    ),
    centerMode: true,
    dim: 'rgba(0, 0, 0, 0.8)',
    animation: {
      className: 'fade-bounce',
      duration: 500,
    },
  });
};
```

## 모달 상태 확인

```tsx
const modal = useModal();

// 특정 모달이 열려있는지 확인
const isModalOpen = modal.isOpen('my-modal');

// 조건부 렌더링
if (isModalOpen) {
  console.log('모달이 열려있습니다!');
}
```

## 모든 모달 닫기

```tsx
const modal = useModal();

const handleCloseAll = async () => {
  await modal.closeAll();
};
```

## 주의사항

1. **ModalProvider**: 반드시 앱의 최상위에서 `ModalProvider`로 감싸주세요.
2. **고유한 name**: 중첩 모달을 사용할 때는 각 모달에 고유한 `name`을 지정해주세요.
3. **애니메이션 duration**: 애니메이션을 사용할 때는 CSS transition과 `duration` 값을 일치시켜주세요.
4. **자동 라우팅 감지**: 라우팅이 변경되면 자동으로 모든 모달이 닫힙니다.

## Next.js 사용자를 위한 추가 설정

기본적으로 모든 라우팅 변경시 모달이 자동으로 닫힙니다. 하지만 더 정교한 제어가 필요하다면 아래 방법을 사용하세요.

### App Router (Next.js 13+)

```tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useModal } from '@lani.ground/react-modal';

export function ModalRouteHandler() {
  const pathname = usePathname();
  const { closeAll } = useModal();

  useEffect(() => {
    // 페이지 변경시 모든 모달 닫기
    closeAll();
  }, [pathname, closeAll]);

  return null;
}

// _app.tsx 또는 layout.tsx에 추가
<ModalProvider>
  <ModalRouteHandler />
  {children}
</ModalProvider>;
```

### Pages Router (Next.js 12 이하)

```tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useModal } from '@lani.ground/react-modal';

export function ModalRouteHandler() {
  const router = useRouter();
  const { closeAll } = useModal();

  useEffect(() => {
    const handleRouteChange = () => {
      closeAll();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeAll]);

  return null;
}
```
