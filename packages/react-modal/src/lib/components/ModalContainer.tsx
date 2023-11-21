import { useCallback, useEffect, useMemo, useRef } from 'react';

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
  isAnimating: boolean;
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
  children,
}: Props) {
  const $modalContents = useRef<HTMLDivElement>(null);
  const $modalContainer = useRef<HTMLDivElement>(null);

  const classes = useMemo(
    () =>
      isEnter
        ? `react-modal__container__enter ${animation?.className}`
        : `react-modal__container__exit ${animation?.className}`,
    [animation, isEnter],
  );

  useEffect(() => {
    setIsEnter(true);
  }, [setIsEnter]);

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
    document.addEventListener('click', outsideClickHandler, {
      capture: true,
    });

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
      ref={$modalContainer}
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
