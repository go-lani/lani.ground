import React, { useCallback, useEffect, useRef } from 'react';

type OutsideClickHandlerProps = {
  children: React.ReactNode;
  onOutsideClick: (e: MouseEvent) => void;
  disabled?: boolean;
  capture?: boolean;
};

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({
  onOutsideClick,
  children,
  disabled = false,
  capture = true,
}) => {
  const $outerHandlerRef = useRef<HTMLDivElement | null>(null);

  const isInsideContents = (e: MouseEvent) =>
    $outerHandlerRef.current &&
    $outerHandlerRef.current.contains(e.target as Node);

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      document.removeEventListener('mouseup', onMouseUp, { capture });

      if (!isInsideContents(e)) {
        onOutsideClick(e);
      }
    },
    [capture, onOutsideClick],
  );

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isInsideContents(e)) {
        document.addEventListener('mouseup', onMouseUp, { capture });
      }
    },
    [capture, onMouseUp],
  );

  const addEventListeners = useCallback(() => {
    if (!disabled) {
      document.addEventListener('mousedown', onMouseDown, {
        capture,
      });
    }
  }, [capture, disabled, onMouseDown]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousedown', onMouseDown, {
      capture,
    });
    document.removeEventListener('mouseup', onMouseUp, {
      capture,
    });
  }, [capture, onMouseDown, onMouseUp]);

  useEffect(() => {
    addEventListeners();

    return removeEventListeners;
  }, [addEventListeners, removeEventListeners]);

  return <div ref={$outerHandlerRef}>{children}</div>;
};

export default OutsideClickHandler;
