import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  name: string;
  closeModal: () => Promise<void>;
  dim?: string;
  centerMode: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  containerPadding?: string;
  disabledOutsideClose: boolean;
  isClosing?: boolean;
  children: React.ReactNode;
}

export default function Modal({
  name,
  closeModal,
  dim,
  centerMode,
  animation,
  containerPadding,
  disabledOutsideClose,
  isClosing = false,
  children,
}: Props) {
  const $modalContents = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  const classes = useMemo(
    () =>
      animation?.duration
        ? isClosing
          ? `react-modal__container__exit ${animation.className ?? ''}`
          : isEntered
            ? `react-modal__container__enter ${animation.className ?? ''}`
            : `react-modal__container__exit ${animation.className ?? ''}`
        : '',
    [animation?.className, animation?.duration, isEntered, isClosing],
  );

  useEffect(() => {
    if (!isClosing) {
      const nextTick = setTimeout(() => {
        setIsEntered(true);
      }, 10);

      return () => {
        clearTimeout(nextTick);
      };
    }
  }, [isClosing]);

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
    if (disabledOutsideClose) return;
    document.addEventListener('click', outsideClickHandler, {
      capture: true,
    });

    return () => {
      document.removeEventListener('click', outsideClickHandler, {
        capture: true,
      });
    };
  }, [disabledOutsideClose, outsideClickHandler]);

  const styles = {
    backgroundColor: dim,
    padding: containerPadding,
  };

  return (
    <div
      data-type="modal"
      data-name={name}
      className={`react-modal__container ${classes} ${
        centerMode ? 'center-mode' : ''
      }`}
      style={{ ...styles }}
    >
      <div ref={$modalContents}>{children}</div>
    </div>
  );
}
