import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContainer from './ModalContainer';
import useScrollLock from '../hooks/useScrollLock';

export const GROUND_MODAL_ROOT = 'ground-modal-root';

type Props = {
  name?: string;
  component: (closeModal: () => Promise<void>) => JSX.Element;
  onClose?: () => unknown;
  dim?: string;
  centerMode?: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  isOpen: boolean;
};

export default function Modal({
  name = 'modal',
  component,
  onClose,
  dim = '',
  centerMode = false,
  animation,
  isOpen = false,
}: Props) {
  const [isShow, setIsShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const { lockScroll, unlockScroll } = useScrollLock();

  const openModal = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      if (isAnimating) return;

      lockScroll();
      setIsShow(true);
      setIsAnimating(true);

      setTimeout(
        () => {
          setIsAnimating(false);
        },
        animation?.duration || 0,
      );
    },
    [animation?.duration, isAnimating, lockScroll],
  );

  const closeModal = useCallback(async () => {
    if (isAnimating) return;

    unlockScroll();
    setIsAnimating(true);
    setIsEnter(false);

    setTimeout(
      async () => {
        setIsAnimating(false);
        setIsShow(false);

        if (typeof onClose === 'function') {
          onClose();
        }
      },
      animation?.duration || 0,
    );
  }, [animation?.duration, isAnimating, onClose, unlockScroll]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let $modalRoot = document.querySelector(`#${GROUND_MODAL_ROOT}`);

    if (!$modalRoot) {
      $modalRoot = document.createElement('div');
      $modalRoot.setAttribute('id', `${GROUND_MODAL_ROOT}`);
      document.body.append($modalRoot);
    }

    setModalRoot($modalRoot);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    openModal();
  }, [isOpen]);

  return (
    <>
      {modalRoot &&
        isShow &&
        createPortal(
          <ModalContainer
            name={name}
            closeModal={closeModal}
            dim={dim}
            centerMode={centerMode}
            animation={animation}
            isEnter={isEnter}
            setIsEnter={setIsEnter}
          >
            {component(closeModal)}
          </ModalContainer>,
          modalRoot,
        )}
    </>
  );
}
