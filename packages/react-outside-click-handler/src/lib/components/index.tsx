import { useEffect, useRef } from 'react';

type OuterHandlerProps = { onOutsideClick: () => void; children: JSX.Element };

export default function OutsideClickHandler({
  onOutsideClick,
  children,
}: OuterHandlerProps): JSX.Element {
  const $outerHandlerRef = useRef<HTMLDivElement>(null);

  const outsideClickHandler = (e: MouseEvent) => {
    if (
      !$outerHandlerRef.current ||
      $outerHandlerRef.current.contains(e.target as Node)
    )
      return;

    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, { capture: true });

    return () => {
      document.removeEventListener('click', outsideClickHandler, {
        capture: true,
      });
    };
  }, []);

  return <div ref={$outerHandlerRef}>{children}</div>;
}
