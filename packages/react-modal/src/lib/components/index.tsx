import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useScrollLock from '../hooks/useScrollLock';
import ModalContainer from './ModalContainer';

export const GROUND_MODAL_ROOT = 'ground-modal-root';

type Props = {
  component: (closeModal: () => Promise<void>) => JSX.Element;
  isOpen: boolean;
  name?: string;
  onClose?: () => unknown;
  dim?: string;
  centerMode?: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  containerPadding?: string;
  isUnlockScroll?: boolean;
};

export default function Modal({
  component,
  onClose,
  animation,
  containerPadding,
  name = 'modal',
  dim = '',
  centerMode = false,
  isOpen = false,
  isUnlockScroll = false,
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

      if (!isUnlockScroll) {
        lockScroll();
      }
      setIsShow(true);
      setIsAnimating(true);

      setTimeout(
        () => {
          setIsAnimating(false);
        },
        animation?.duration || 0,
      );
    },
    [animation?.duration, isAnimating, isUnlockScroll, lockScroll],
  );

  const closeModal = useCallback(async () => {
    if (isAnimating) return;

    if (!isUnlockScroll) {
      unlockScroll();
    }

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
  }, [animation?.duration, isAnimating, onClose, unlockScroll, isUnlockScroll]);

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
            containerPadding={containerPadding}
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
