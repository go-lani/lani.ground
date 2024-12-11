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

  const lockScroll = () => {
    const $modalCounts =
      document.querySelector(`#${GROUND_MODAL_ROOT}`)?.childElementCount || 0;

    if ($modalCounts !== 0) return;

    scrollRef.current = window.scrollY;

    modifyBodyStyle({
      overflow: 'hidden',
    });
  };

  const unlockScroll = () => {
    const $modalCounts =
      document.querySelector(`#${GROUND_MODAL_ROOT}`)?.childElementCount || 0;
    const nextCounts = $modalCounts > 0 ? $modalCounts - 1 : 0;
    const currentScroll = scrollRef.current;

    if (!(nextCounts === 0 || currentScroll !== null)) return;

    modifyBodyStyle({
      overflow: '',
    });

    if (currentScroll !== null) {
      window.scrollTo({
        top: currentScroll,
        behavior: 'instant' as ScrollBehavior,
      });
    }
    scrollRef.current = null;
  };

  return {
    lockScroll,
    unlockScroll,
  };
}
