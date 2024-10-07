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
  isEnter: boolean;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  containerPadding?: string;
  disabledOutsideClose: boolean;
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
  containerPadding,
  disabledOutsideClose,
  children,
}: Props) {
  const $modalContents = useRef<HTMLDivElement>(null);
  const $modalContainer = useRef<HTMLDivElement>(null);
  const [isRender, setIsRender] = useState(false);

  const classes = useMemo(
    () =>
      animation?.duration
        ? isRender
          ? `react-modal__container__enter ${animation.className ?? ''}`
          : `react-modal__container__exit ${animation.className ?? ''}`
        : '',
    [animation?.className, animation?.duration, isRender],
  );

  useEffect(() => {
    setIsEnter(true);
  }, [setIsEnter]);

  useEffect(() => {
    if (isEnter) {
      const nextTick = setTimeout(() => {
        setIsRender(true);
      }, 10);

      return () => {
        clearTimeout(nextTick);
      };
    } else {
      setIsRender(false);
    }
  }, [isEnter]);

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
  }, [outsideClickHandler]);

  useEffect(() => {
    const bodyCheck = () => {
      if (document.body.style.overflow !== 'hidden') return;

      document.body.style.overflow = '';
    };

    window.addEventListener('popstate', bodyCheck);
    return () => window.removeEventListener('popstate', bodyCheck);
  }, []);

  const styles = {
    backgroundColor: dim,
    padding: containerPadding,
  };

  return (
    <div
      ref={$modalContainer}
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
