import { useCallback, useEffect, useRef } from 'react';
import useScrollLock from '../hooks/useScrollLock';

interface Props {
  name: string;
  dim?: string;
  closeModal: (callback?: () => void) => void;
  centerMode: boolean;
  children: React.ReactNode;
}

export default function ModalContainer({
  name,
  dim,
  closeModal,
  centerMode,
  children,
}: Props) {
  const { lockScroll, unlockScroll } = useScrollLock();
  const $modalContents = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  const outsideClickHandler = useCallback(
    (e: MouseEvent) => {
      const $modal = (e.target as HTMLElement).closest('[data-type="modal"]');

      if (!$modal) return;

      if (
        !$modalContents.current ||
        $modalContents.current.contains(e.target as Node)
      )
        return;

      if (
        ($modal as HTMLElement).dataset.name &&
        ($modal as HTMLElement).dataset.name === name
      ) {
        closeModal();
      }
    },
    [closeModal, name],
  );

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, { capture: true });

    return () => {
      document.removeEventListener('click', outsideClickHandler, {
        capture: true,
      });
    };
  }, [outsideClickHandler]);

  return (
    <div
      data-type="modal"
      data-name={name}
      className="react-modal__container"
      style={{ backgroundColor: dim }}
    >
      <div
        ref={$modalContents}
        className={`${
          centerMode ? 'react-modal__outer' : 'react-modal__content'
        }`}
      >
        {centerMode ? (
          <div className="react-modal__inner">
            <div className="react-modal__content">{children}</div>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
}
