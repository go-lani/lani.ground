import { useCallback, useRef } from 'react';

type CSSProperties = {
  [key: string]: string | number;
};

export default function useWindowScroll() {
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
    modifyBodyStyle({
      overflowY: 'hidden',
      position: 'fixed',
      top: `-${scrollRef.current}px`,
      left: '0',
      right: '0',
    });
  };

  const unlockScroll = () => {
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
