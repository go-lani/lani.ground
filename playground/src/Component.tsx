import { useWindowScroll } from '@lani.ground/react-hooks';
import { useEffect } from 'react';

export default function Component({ onClose }: { onClose: () => void }) {
  const { lockScroll, unlockScroll } = useWindowScroll();
  useEffect(() => {
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, []);
  return (
    <div>
      <p>hihihi</p>
      <button type="button" onClick={onClose}>
        닫기
      </button>
    </div>
  );
}
