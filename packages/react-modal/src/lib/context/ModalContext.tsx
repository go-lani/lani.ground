'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ModalRenderer from '../components/ModalRenderer';
import { preventScrollPropagation } from '../utils/scroll';

// 모달 아이템 타입 정의
export interface ModalConfig {
  id: string;
  component: (closeModal: () => Promise<void>) => JSX.Element;
  name: string;
  dim?: string;
  centerMode?: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  containerPadding?: string;
  disabledScrollLock?: boolean;
  disabledOutsideClose?: boolean;
  onClose?: () => void;
  isClosing?: boolean;
}

// Context 타입 정의
interface ModalContextType {
  modals: ModalConfig[];
  openModal: (modal: Omit<ModalConfig, 'id'>) => string;
  closeModal: (id: string) => Promise<void>;
  closeAllModals: () => Promise<void>;
  isModalOpen: (id: string) => boolean;
}

// Context 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider Props 타입
interface ModalProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const eventListenersAttached = useRef(false);

  // 클라이언트 마운트 체크 (Next.js App Router SSR 이슈 해결)
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Provider 언마운트 시 모든 이벤트 리스너 정리
      document.removeEventListener('wheel', preventScrollPropagation);
      document.removeEventListener('touchmove', preventScrollPropagation);
    };
  }, []);

  // 이벤트 리스너 관리 함수
  const manageEventListeners = useCallback((shouldAttach: boolean) => {
    if (shouldAttach && !eventListenersAttached.current) {
      document.addEventListener('wheel', preventScrollPropagation, {
        passive: false,
      });
      document.addEventListener('touchmove', preventScrollPropagation, {
        passive: false,
      });
      eventListenersAttached.current = true;
    } else if (!shouldAttach && eventListenersAttached.current) {
      document.removeEventListener('wheel', preventScrollPropagation);
      document.removeEventListener('touchmove', preventScrollPropagation);
      eventListenersAttached.current = false;
    }
  }, []);

  // 모달 상태 변경 시 이벤트 리스너 관리
  useEffect(() => {
    if (!isMounted) return;

    const hasNonDisabledScrollLockModal = modals.some(
      (modal) => !modal.disabledScrollLock,
    );

    manageEventListeners(hasNonDisabledScrollLockModal);
  }, [isMounted, modals, manageEventListeners]);

  // 모달 열기 - 즉시 처리
  const openModal = useCallback(
    (modal: Omit<ModalConfig, 'id'>) => {
      // 서버에서는 모달을 열지 않음
      if (!isMounted) return '';

      // 이미 같은 이름의 모달이 열려있는지 확인
      const existingModal = modals.find((m) => m.name === modal.name);
      if (existingModal) {
        return existingModal.id; // 이미 열려있는 모달의 ID 반환
      }

      const id = `modal-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newModal: ModalConfig = {
        ...modal,
        id,
      };

      setModals((prev) => [...prev, newModal]);
      return id;
    },
    [isMounted, modals],
  );

  // 모달 닫기 - 즉시 처리
  const closeModal = useCallback(
    async (id: string) => {
      // 서버에서는 처리하지 않음
      if (!isMounted) return Promise.resolve();

      return new Promise<void>((resolve) => {
        // 먼저 닫히는 중 상태로 변경하고 애니메이션 시간 저장
        let animationDuration = 0;

        setModals((prevModals) => {
          const targetModal = prevModals.find((modal) => modal.id === id);
          if (!targetModal) {
            resolve();
            return prevModals;
          }

          // 애니메이션 시간 저장
          animationDuration = targetModal.animation?.duration || 0;

          // 모달 닫기 시작도 즉시 반영 (사용자가 즉시 봐야 함)
          return prevModals.map((modal) =>
            modal.id === id ? { ...modal, isClosing: true } : modal,
          );
        });

        // 애니메이션 시간만큼 기다린 후 제거
        const cleanup = () => {
          setModals((prevModals) => {
            const modalToRemove = prevModals.find((m) => m.id === id);
            if (modalToRemove?.onClose) {
              try {
                modalToRemove.onClose();
              } catch (error) {
                console.warn('Modal onClose callback error:', error);
              }
            }
            resolve();
            return prevModals.filter((m) => m.id !== id);
          });
        };

        if (animationDuration > 0) {
          setTimeout(cleanup, animationDuration);
        } else {
          cleanup();
        }
      });
    },
    [isMounted],
  );

  // 모든 모달 닫기 - 즉시 처리
  const closeAllModals = useCallback(async () => {
    if (!isMounted) return Promise.resolve();

    return new Promise<void>((resolve) => {
      setModals((prevModals) => {
        prevModals.forEach((modal) => {
          if (modal.onClose) {
            try {
              modal.onClose();
            } catch (error) {
              console.warn('Modal onClose callback error:', error);
            }
          }
        });
        resolve();
        return [];
      });

      // 모든 모달이 닫힐 때 이벤트 리스너도 정리
      manageEventListeners(false);
    });
  }, [isMounted, manageEventListeners]);

  // 특정 모달이 열려있는지 확인
  const isModalOpen = useCallback(
    (id: string) => {
      // 서버에서는 항상 false 반환
      if (!isMounted) return false;
      return modals.some((modal) => modal.id === id);
    },
    [modals, isMounted],
  );

  // 모든 라우팅 변경 감지 (popstate + 프로그래매틱 라우팅)
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    // 현재 pathname 저장
    let currentPathname = window.location.pathname;

    const closeModalsOnRouteChange = () => {
      const newPathname = window.location.pathname;
      if (newPathname !== currentPathname) {
        currentPathname = newPathname;
        // closeAllModals를 사용하여 모든 cleanup 로직이 실행되도록 함
        closeAllModals();
      }
    };

    // 1. 브라우저 뒤로가기/앞으로가기 감지
    window.addEventListener('popstate', closeModalsOnRouteChange);

    // 2. 프로그래매틱 라우팅 감지 (next/link, react-router 등)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    // pushState 오버라이드 (next/link, router.push 등)
    window.history.pushState = function (state, title, url) {
      const result = originalPushState.call(this, state, title, url);
      // 다음 마이크로태스크에서 체크 (DOM 업데이트 후)
      Promise.resolve().then(closeModalsOnRouteChange);
      return result;
    };

    // replaceState 오버라이드 (router.replace 등)
    window.history.replaceState = function (state, title, url) {
      const result = originalReplaceState.call(this, state, title, url);
      Promise.resolve().then(closeModalsOnRouteChange);
      return result;
    };

    // 정리 함수
    return () => {
      window.removeEventListener('popstate', closeModalsOnRouteChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [isMounted, closeAllModals]); // closeAllModals 의존성 추가

  const value: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {/* 클라이언트에서만 ModalRenderer 렌더링 */}
      {isMounted && <ModalRenderer />}
    </ModalContext.Provider>
  );
}

// Custom Hook
export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}
