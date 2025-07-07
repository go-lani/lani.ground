import { hasBodyScroll } from './browser';

const isBrowser = typeof window !== 'undefined';

interface OriginalStyles {
  overflow: string;
  paddingRight: string;
}

export const lockScroll = (
  isMobile: boolean,
  scrollbarWidth: number,
  originalStyles: OriginalStyles,
) => {
  if (!isBrowser || !document?.documentElement || !document?.body) return 0;

  // 현재 스크롤 위치 저장
  const scrollY = window.scrollY;

  // 데스크톱에서만 스크롤바 패딩 조정
  if (!isMobile && hasBodyScroll()) {
    const currentPadding =
      parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
  }

  // 스크롤 위치 강제 설정 후 overflow hidden 적용
  window.scrollTo(0, scrollY);
  document.documentElement.style.overflow = 'hidden';

  return scrollY;
};

export const unlockScroll = (
  scrollY: number,
  originalStyles: OriginalStyles,
) => {
  if (!isBrowser || !document?.documentElement || !document?.body) return;

  // Styles 복원
  document.documentElement.style.overflow = originalStyles.overflow;
  document.body.style.paddingRight = originalStyles.paddingRight;

  // 스크롤 위치 복원
  window.scrollTo(0, scrollY);
};
