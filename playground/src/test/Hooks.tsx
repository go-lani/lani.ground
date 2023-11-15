import { useMemo, useState } from 'react';
import {
  useCookies,
  useString,
  useVisibleElement,
  useWindowScroll,
} from '@lani.ground/react-hooks';
import ContentLayout from './common/ContentLayout';

export default function HooksPage() {
  const { ellipsis } = useString();
  const { getCookie, setCookie, hasCookie, deleteCookie } = useCookies();
  const { lockScroll, unlockScroll } = useWindowScroll();
  const { ref, activeElement, activeKey } = useVisibleElement();
  const [flag, setFlag] = useState(false);
  const setTestCookie = () => {
    const day = new Date();
    day.setMinutes(day.getMinutes() + 1);
    setCookie('test', 'true', { expires: 'today' });
    setFlag(!flag);
  };

  const checkCookie = () => {
    const hasTest = hasCookie('test');
    console.log('hasTest', hasTest); // true | false
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = useMemo(() => getCookie('test'), [flag]);

  return (
    <ContentLayout packageName="react-hooks">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-neutral-700 px-6 py-4 text-lg">
          <h2 className="text-lg font-bold md:text-xl">
            react-hooks/useCookie
          </h2>
          <div className="mt-4 flex flex-col items-start gap-4">
            <button
              type="button"
              className="rounded bg-green-500 px-4 py-2"
              onClick={() => checkCookie()}
            >
              hasCookie("test")
            </button>
            <button
              type="button"
              className="rounded bg-blue-500 px-4 py-2"
              onClick={() => setTestCookie()}
            >
              Set Cookie("test": "true")
            </button>
            <button
              type="button"
              className="rounded bg-red-500 px-4 py-2"
              onClick={() => {
                deleteCookie('test');
                setFlag(!flag);
              }}
            >
              Delete Cookie("test")
            </button>
            <p>getCookie("test"): {String(cookie)}</p>
          </div>
        </div>
        <div className="rounded-lg bg-neutral-700 px-6 py-4 text-lg">
          <h2 className="text-lg font-bold md:text-xl">
            react-hooks/useString
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <p>original: String</p>
            <p>
              ellipsis(left) :{' '}
              {ellipsis({ value: 'String', length: 3, dir: 'left' })}
            </p>
            <p>
              ellipsis(right) :{' '}
              {ellipsis({ value: 'String', length: 3, dir: 'right' })}
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-neutral-700 px-6 py-4 text-lg">
          <h2 className="text-lg font-bold md:text-xl">
            react-hooks/useWindowScroll
          </h2>
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              className="rounded bg-red-500 px-4 py-2"
              onClick={lockScroll}
            >
              lockScroll
            </button>
            <button
              type="button"
              className="rounded bg-green-500 px-4 py-2"
              onClick={unlockScroll}
            >
              unlockScroll
            </button>
            <div className="h-[100vh]" />
          </div>
        </div>
        <div className="rounded-lg bg-neutral-700 px-6 py-4 text-lg">
          <h2 className="text-lg font-bold md:text-xl">
            react-hooks/useVisibleElement
          </h2>
          <div className="mt-4 flex flex-col">
            <div className="sticky top-0 bg-yellow-400 p-4">
              <p>activeKey: {activeKey}</p>
              <p>
                activeElement: {`${JSON.stringify(activeElement?.outerHTML)}`}
              </p>
            </div>
            <div ref={ref}>
              <div className="h-[100vh] bg-red-200">section 1</div>
              <div className="h-[100vh] bg-red-300">section 2</div>
              <div className="h-[100vh] bg-red-400">section 3</div>
              <div className="h-[100vh] bg-red-500">section 4</div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
