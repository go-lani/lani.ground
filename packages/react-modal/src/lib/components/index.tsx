import { cloneElement, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContainer from './ModalContainer';

export const GROUND_MODAL_ROOT = 'ground-modal-root';

type Props = {
  name?: string;
  trigger: JSX.Element;
  component: (closeModal: () => Promise<void>) => JSX.Element;
  onAfterClose?: () => unknown;
  dim?: string;
  direct?: boolean;
};

export default function Modal({
  name = 'modal',
  trigger,
  component,
  onAfterClose,
  dim = '',
  direct = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(direct);
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  const openModal = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const close = () => {
    return new Promise<void>((resolve) => {
      setIsOpen(false);
      resolve();
    });
  };

  const closeModal = useCallback(async () => {
    await close();
    if (typeof onAfterClose === 'function') {
      onAfterClose();
    }
  }, [onAfterClose]);

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

  return (
    <>
      {cloneElement(trigger, { onClick: openModal })}
      {isOpen &&
        modalRoot &&
        createPortal(
          <ModalContainer name={name} dim={dim} closeModal={closeModal}>
            {component(closeModal)}
          </ModalContainer>,
          modalRoot,
        )}
    </>
  );
}
