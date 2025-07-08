import { hasBodyScroll } from './browser';

const isBrowser = typeof window !== 'undefined';

interface OriginalStyles {
  overflow: string;
  paddingRight: string;
}

// 스크롤 가능한 요소인지 체크하는 유틸 함수
const isScrollable = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  const hasScroll =
    style.overflow === 'auto' ||
    style.overflow === 'scroll' ||
    style.overflowY === 'auto' ||
    style.overflowY === 'scroll';
  return hasScroll && element.scrollHeight > element.clientHeight;
};

// 모달 내부 스크롤 전파 방지 핸들러
export const preventScrollPropagation = (e: Event) => {
  const target = e.target as HTMLElement;
  const modalContainer = target.closest('.react-modal__container');

  // 모달 컨테이너가 아니면 이벤트 중단
  if (!modalContainer) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // 현재 요소부터 부모로 올라가면서 스크롤 가능한 요소 찾기
  let scrollableParent = target;
  while (scrollableParent && modalContainer.contains(scrollableParent)) {
    if (isScrollable(scrollableParent)) {
      // 스크롤 가능한 요소를 찾으면 스크롤 허용
      if (e.type === 'wheel') {
        const wheelEvent = e as WheelEvent;
        const isAtTop = scrollableParent.scrollTop === 0;
        const isAtBottom =
          scrollableParent.scrollTop + scrollableParent.clientHeight >=
          scrollableParent.scrollHeight;

        // 스크롤이 끝에 도달했을 때만 이벤트 중단
        if (
          (isAtTop && wheelEvent.deltaY < 0) ||
          (isAtBottom && wheelEvent.deltaY > 0)
        ) {
          e.preventDefault();
        }
      }
      e.stopPropagation();
      return;
    }
    scrollableParent = scrollableParent.parentElement as HTMLElement;
  }

  // 스크롤 가능한 요소를 찾지 못했으면 이벤트 중단
  e.preventDefault();
  e.stopPropagation();
};

export const lockScroll = (
  isMobile: boolean,
  scrollbarWidth: number,
  originalStyles: OriginalStyles,
) => {
  if (!isBrowser || !document?.documentElement || !document?.body) return 0;

  // 데스크톱에서만 스크롤바 패딩 조정
  if (!isMobile && hasBodyScroll()) {
    const currentPadding =
      parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
  }

  // overflow hidden 적용
  document.documentElement.style.overflow = 'hidden';

  return window.scrollY;
};

export const unlockScroll = (
  scrollY: number,
  originalStyles: OriginalStyles,
) => {
  if (!isBrowser || !document?.documentElement || !document?.body) return;

  // Styles 완전히 제거 (이전 상태로 복원하는 대신)
  document.documentElement.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');

  // 스크롤 위치 복원
  window.scrollTo(0, scrollY);
};
