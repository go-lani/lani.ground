import { useEffect, useRef } from 'react';
import useScrollLock from '../hooks/useScrollLock';

interface Props {
  name: string;
  dim?: string;
  closeModal: (callback?: () => void) => void;
  children: React.ReactNode;
}

export default function ModalContainer({
  name,
  dim,
  closeModal,
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

  const outsideClickHandler = (e: MouseEvent) => {
    const $modal = (e.target as HTMLElement).closest('[data-type="modal"]');

    if (
      !$modalContents.current ||
      $modalContents.current.contains(e.target as Node)
    )
      return;

    if (($modal as HTMLElement).dataset.name === name) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, { capture: true });

    return () => {
      document.removeEventListener('click', outsideClickHandler, {
        capture: true,
      });
    };
  }, [closeModal, name]);

  return (
    <div
      data-type="modal"
      data-name={name}
      className="react-modal__container"
      style={{ backgroundColor: dim }}
    >
      <div ref={$modalContents}>{children}</div>
    </div>
  );
}
