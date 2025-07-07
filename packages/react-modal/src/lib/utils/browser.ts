const isBrowser = typeof window !== 'undefined';

export const isMobileDevice = () => {
  if (!isBrowser || !navigator) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const getScrollbarWidth = () => {
  if (!isBrowser || !document?.body) return 0;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

export const hasBodyScroll = () => {
  if (!isBrowser || !document?.body) return false;
  return document.body.scrollHeight > window.innerHeight;
};
