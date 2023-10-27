import { useCallback, useRef } from 'react';
import { GROUND_IMAGE_VIEWER_ROOT } from '../components';

type CSSProperties = {
  [key: string]: string | number;
};

export default function useScrollLock() {
  const scrollRef = useRef(0);

  const modifyBodyStyle = useCallback((style: CSSProperties) => {
    const $body = document.querySelector('body');
    if ($body) {
      Object.assign($body.style, style);
    } else {
      console.error('document.body is not defined');
    }
  }, []);

  const lockScroll = () => {
    scrollRef.current = window.scrollY;
    const $modalCounts =
      document.querySelector(`#${GROUND_IMAGE_VIEWER_ROOT}`)
        ?.childElementCount || 0;

    if ($modalCounts > 1) return;

    modifyBodyStyle({
      overflowY: 'hidden',
      position: 'fixed',
      top: `-${scrollRef.current}px`,
      left: '0',
      right: '0',
    });
  };

  const unlockScroll = () => {
    const $modalCounts =
      document.querySelector(`#${GROUND_IMAGE_VIEWER_ROOT}`)
        ?.childElementCount || 0;
    if ($modalCounts >= 1) return;

    modifyBodyStyle({
      overflowY: '',
      position: '',
      top: '',
      left: '',
      right: '',
    });
    window.scrollTo({ left: 0, top: scrollRef.current, behavior: 'instant' });
  };

  return {
    lockScroll,
    unlockScroll,
  };
}
