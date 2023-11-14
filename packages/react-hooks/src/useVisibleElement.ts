import { useEffect, useRef, useState } from 'react';

interface Props {
  key?: string;
  activeClass?: string;
}

export default function useVisibleElement(props?: Props) {
  const { key = 'visible-element', activeClass } = props || {};

  const [activeKey, setActiveKey] = useState<string>('');
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const key = entry.target.getAttribute('data-key');
      if (entry.isIntersecting) {
        if (activeClass) {
          entry.target.classList.add(activeClass);
        }

        setActiveKey(key || '');
        setActiveElement(entry.target);
      } else if (activeClass) {
        entry.target.classList.remove(activeClass);
      }
    });
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(callback);

    const scrollItems = Array.from(ref.current?.children as HTMLCollection);

    if (!scrollItems?.length) return () => {};

    scrollItems.forEach((item, index) => {
      item.setAttribute('data-key', `${key}-${index}`);
      intersectionObserver.observe(item);
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return {
    ref,
    activeKey,
    activeElement,
  };
}
