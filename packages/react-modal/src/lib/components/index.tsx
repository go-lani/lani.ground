import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContainer from './ModalContainer';
import { delay } from '../util/utils';

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

  const openModal = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (!!animation && isAnimating) return;

      if (!!animation) {
        setIsAnimating(true);
      }
      setIsOpen(true);
    },
    [animation, isAnimating],
  );

  const close = () => {
    return new Promise<void>((resolve) => {
      setIsOpen(false);
      resolve();
    });
  };

  const closeModal = useCallback(async () => {
    if (!isEnter || (!!animation && isAnimating)) return;

    setIsEnter(false);

    if (animation?.duration) {
      await delay(animation?.duration);
    }

    await close();

    if (typeof onAfterClose === 'function') {
      onAfterClose();
    }
  }, [animation, isAnimating, isEnter, onAfterClose]);

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
            setIsAnimating={setIsAnimating}
          >
            {component(closeModal)}
          </ModalContainer>,
          modalRoot,
        )}
    </>
  );
}
