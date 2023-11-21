import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContainer from './ModalContainer';
import { delay } from '../util/utils';
import useScrollLock from '../hooks/useScrollLock';

export const GROUND_MODAL_ROOT = 'ground-modal-root';

type Props = {
  name?: string;
  trigger: JSX.Element;
  component: (closeModal: () => Promise<void>) => JSX.Element;
  onAfterClose?: () => unknown;
  dim?: string;
  centerMode?: boolean;
  animation?: {
    className?: string;
    duration: number;
  };
  direct?: boolean;
};

export default function Modal({
  name = 'modal',
  trigger,
  component,
  onAfterClose,
  dim = '',
  centerMode = false,
  animation,
  direct = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const { lockScroll, unlockScroll } = useScrollLock();

  const openModal = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      if (isAnimating) return;

      lockScroll();
      setIsOpen(true);
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
        setIsOpen(false);

        if (typeof onAfterClose === 'function') {
          onAfterClose();
        }
      },
      animation?.duration || 0,
    );
  }, [animation?.duration, isAnimating, onAfterClose, unlockScroll]);

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
    setIsOpen(direct);
  }, [direct]);

  return (
    <>
      {cloneElement(trigger, { onClick: openModal })}
      {isOpen &&
        modalRoot &&
        createPortal(
          <ModalContainer
            name={name}
            closeModal={closeModal}
            dim={dim}
            centerMode={centerMode}
            animation={animation}
            isEnter={isEnter}
            setIsEnter={setIsEnter}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          >
            {component(closeModal)}
          </ModalContainer>,
          modalRoot,
        )}
    </>
  );
}
