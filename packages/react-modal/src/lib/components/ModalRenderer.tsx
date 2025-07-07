import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModalContext } from '../context/ModalContext';
import { getScrollbarWidth, isMobileDevice } from '../utils/browser';
import { lockScroll, unlockScroll } from '../utils/scroll';
import Modal from './Modal';

const MODAL_ROOT = 'modal-root';

export default function ModalRenderer() {
  const { modals, closeModal } = useModalContext();
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  // refs
  const scrollPositionRef = useRef<number>(0);
  const scrollbarWidthRef = useRef<number>(0);
  const isMobileRef = useRef<boolean>(false);
  const originalStylesRef = useRef({
    overflow: '',
    paddingRight: '',
  });
  const isScrollLockedRef = useRef<boolean>(false);

  // 모달 루트 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let $modalRoot = document.querySelector(`#${MODAL_ROOT}`);

    if (!$modalRoot) {
      $modalRoot = document.createElement('div');
      $modalRoot.setAttribute('id', MODAL_ROOT);
      document.body.append($modalRoot);
    }

    setModalRoot($modalRoot);
    scrollbarWidthRef.current = getScrollbarWidth();
    isMobileRef.current = isMobileDevice();

    return () => {
      // 컴포넌트 언마운트 시 스크롤 락이 걸려있다면 해제
      if (isScrollLockedRef.current) {
        unlockScroll(scrollPositionRef.current, originalStylesRef.current);
        isScrollLockedRef.current = false;
      }
    };
  }, []);

  // 스크롤 락이 필요한 모달 체크
  const hasScrollLockModal = useMemo(
    () => modals.some((modal) => !modal.disabledScrollLock && !modal.isClosing),
    [modals],
  );

  // 스크롤 락/언락 처리
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 스크롤 락이 필요하고 현재 락이 걸려있지 않은 경우
    if (hasScrollLockModal && !isScrollLockedRef.current) {
      // 현재 스타일 저장
      originalStylesRef.current = {
        overflow: document.documentElement.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      // requestAnimationFrame을 사용하여 다음 페인트 프레임에서 스크롤 락 적용
      requestAnimationFrame(() => {
        scrollPositionRef.current = lockScroll(
          isMobileRef.current,
          scrollbarWidthRef.current,
          originalStylesRef.current,
        );
        isScrollLockedRef.current = true;
      });
    }
    // 스크롤 락이 필요없고 현재 락이 걸려있는 경우
    else if (!hasScrollLockModal && isScrollLockedRef.current) {
      // requestAnimationFrame을 사용하여 다음 페인트 프레임에서 스크롤 언락 적용
      requestAnimationFrame(() => {
        unlockScroll(scrollPositionRef.current, originalStylesRef.current);
        isScrollLockedRef.current = false;
      });
    }
  }, [hasScrollLockModal]);

  // 모달별 closeModal 함수들을 memoization
  const closeModalCallbacks = useMemo(() => {
    const callbacks = new Map<string, () => Promise<void>>();

    modals.forEach((modal) => {
      if (!callbacks.has(modal.id)) {
        callbacks.set(modal.id, async () => {
          if (modal.onClose) {
            modal.onClose();
          }
          await closeModal(modal.id);
        });
      }
    });

    return callbacks;
  }, [modals, closeModal]);

  if (!modalRoot) return null;

  return (
    <>
      {modals.map((modal) => {
        const modalCloseCallback = closeModalCallbacks.get(modal.id)!;

        return createPortal(
          <Modal
            key={modal.id}
            name={modal.name || modal.id}
            closeModal={modalCloseCallback}
            dim={modal.dim}
            centerMode={modal.centerMode || false}
            animation={modal.animation}
            containerPadding={modal.containerPadding}
            disabledOutsideClose={modal.disabledOutsideClose || false}
            isClosing={modal.isClosing}
          >
            {modal.component(modalCloseCallback)}
          </Modal>,
          modalRoot,
        );
      })}
    </>
  );
}
