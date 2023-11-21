import { useCallback, useRef } from 'react';
import { GROUND_MODAL_ROOT } from '../components';

type CSSProperties = {
  [key: string]: string | number;
};
export default function useScrollLock() {
  const scrollRef = useRef<number | null>(null);
  const modifyBodyStyle = useCallback((style: CSSProperties) => {
    const $body = document.querySelector('body');
    if ($body) {
      Object.assign($body.style, style);
    } else {
      console.error('document.body is not defined');
    }
  }, []);

  const cancelScrollEvent = useCallback((event: TouchEvent) => {
    event.preventDefault();
  }, []);

  const lockScroll = () => {
    const $modalCounts =
      document.querySelector(`#${GROUND_MODAL_ROOT}`)?.childElementCount || 0;

    if ($modalCounts !== 0) return;

    scrollRef.current = window.scrollY;

    modifyBodyStyle({
      overflowY: 'hidden',
      position: 'fixed',
      top: `-${scrollRef.current}px`,
      left: '0',
      right: '0',
    });
    document.body.addEventListener('touchmove', cancelScrollEvent);
  };

  const unlockScroll = () => {
    const $modalCounts =
      document.querySelector(`#${GROUND_MODAL_ROOT}`)?.childElementCount || 0;
    const nextCounts = $modalCounts > 0 ? $modalCounts - 1 : 0;

    if (!(nextCounts === 0 || scrollRef.current !== null)) return;

    modifyBodyStyle({
      overflowY: '',
      position: '',
      top: '',
      left: '',
      right: '',
    });

    window.scrollTo({ top: scrollRef.current || 0, behavior: 'instant' });
    scrollRef.current = null;
    document.body.removeEventListener('touchmove', cancelScrollEvent);
  };

  return {
    lockScroll,
    unlockScroll,
  };
}
