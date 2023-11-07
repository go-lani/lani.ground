import { useCallback, useEffect, useMemo, useRef } from 'react';
import useScrollLock from '../hooks/useScrollLock';

interface Props {
  name: string;
  closeModal: () => Promise<void>;
  dim?: string;
  centerMode: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  isEnter: boolean;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function ModalContainer({
  name,
  closeModal,
  dim,
  centerMode,
  animation,
  isEnter,
  setIsEnter,
  setIsAnimating,
  children,
}: Props) {
  const { lockScroll, unlockScroll } = useScrollLock();
  const $modalContents = useRef<HTMLDivElement>(null);

  const classes = useMemo(
    () =>
      isEnter
        ? `${
            animation?.className
              ? animation?.className
              : 'react-modal__container'
          }__enter`
        : `${
            animation?.className
              ? animation?.className
              : 'react-modal__container'
          }__exit`,
    [animation?.className, isEnter],
  );

  useEffect(() => {
    lockScroll();
    setIsEnter(true);

    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!animation?.duration) return;

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, animation.duration);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [animation?.duration, setIsAnimating]);

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
    document.addEventListener('mousedown', outsideClickHandler, {
      capture: true,
    });

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler, {
        capture: true,
      });
    };
  }, [outsideClickHandler]);

  return (
    <div
      data-type="modal"
      data-name={name}
      className={`react-modal__container ${classes}`}
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
