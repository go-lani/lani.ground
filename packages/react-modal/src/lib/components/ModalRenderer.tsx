import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModalContext } from '../context/ModalContext';
import Modal from './Modal';

const MODAL_ROOT = 'modal-root';

export default function ModalRenderer() {
  const { modals, closeModal } = useModalContext();
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let $modalRoot = document.querySelector(`#${MODAL_ROOT}`);

    if (!$modalRoot) {
      $modalRoot = document.createElement('div');
      $modalRoot.setAttribute('id', `${MODAL_ROOT}`);
      document.body.append($modalRoot);
    }

    setModalRoot($modalRoot);
  }, []);

  // 스크롤 락이 필요한 모달이 있는지 확인 - useMemo로 최적화
  const hasScrollLockModal = useMemo(
    () => modals.some((modal) => !modal.disabledScrollLock),
    [modals],
  );

  // 스크롤 락/언락 처리
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (hasScrollLockModal) {
      // 스크롤 락
      scrollPositionRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 언락
      document.body.style.overflow = '';
      if (scrollPositionRef.current !== 0) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant' as ScrollBehavior,
        });
      }
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasScrollLockModal]);

  // 모달별 closeModal 함수들을 memoization
  const closeModalCallbacks = useMemo(() => {
    const callbacks = new Map<string, () => Promise<void>>();

    modals.forEach((modal) => {
      if (!callbacks.has(modal.id)) {
        callbacks.set(modal.id, async () => {
          // 모달 onClose 콜백 먼저 호출
          if (modal.onClose) {
            modal.onClose();
          }
          // Context에서 모달 제거
          await closeModal(modal.id);
        });
      }
    });

    return callbacks;
  }, [modals, closeModal]);

  return (
    <>
      {modalRoot &&
        modals.map((modal) => {
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
