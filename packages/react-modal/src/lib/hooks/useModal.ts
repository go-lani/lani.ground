import { useCallback } from 'react';
import { ModalConfig, useModalContext } from '../context/ModalContext';

export function useModal() {
  const { openModal, closeModal, closeAllModals, modals } = useModalContext();

  const open = useCallback(
    (modal: Omit<ModalConfig, 'id'>) => {
      const modalName =
        modal.name ||
        `modal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      openModal({ ...modal, name: modalName });
      return modalName;
    },
    [openModal],
  );

  const close = useCallback(
    async (name: string) => {
      const targetModal = modals.find((m) => m.name === name);
      if (targetModal) {
        await closeModal(targetModal.id);
      }
    },
    [closeModal, modals],
  );

  const isOpen = useCallback(
    (name: string) => {
      return modals.some((m) => m.name === name && !m.isClosing);
    },
    [modals],
  );

  // closeAll과 closeAllModals는 동일하므로 그냥 넘겨줘도 됨
  return { open, close, closeAll: closeAllModals, isOpen };
}
