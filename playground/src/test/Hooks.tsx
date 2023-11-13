import { useEffect } from 'react';
import {
  useCookies,
  useString,
  useWindowScroll,
} from '@lani.ground/react-hooks';

export default function Hooks() {
  const { ellipsis } = useString();
  const { getCookie, setCookie, hasCookie, deleteCookie } = useCookies();
  const { lockScroll, unlockScroll } = useWindowScroll();
  const setTestCookie = () => {
    const day = new Date();
    day.setMinutes(day.getMinutes() + 1);
    setCookie('test', 'true', { expires: 'today' });
  };

  const checkCookie = () => {
    const hasTest = hasCookie('test');
    console.log('hasTest', hasTest); // true | false
  };

  useEffect(() => {
    const testCookie = getCookie('test');
    console.log('testCookie', testCookie); // true | false
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">@lani.ground/react-hooks</h1>
      <section className="mt-14 rounded-xl bg-gray-600 p-4 text-lg">
        <h2 className="text-2xl font-bold">react-hooks/useCookie</h2>
        <div className="mt-4 flex flex-col items-start gap-4">
          <button
            type="button"
            className="rounded bg-green-500 px-4 py-2"
            onClick={() => checkCookie()}
          >
            Check Cookie
          </button>
          <button
            type="button"
            className="rounded bg-blue-500 px-4 py-2"
            onClick={() => setTestCookie()}
          >
            Set Cookie
          </button>
          <button
            type="button"
            className="rounded bg-red-500 px-4 py-2"
            onClick={() => deleteCookie('test')}
          >
            Delete Cookie
          </button>
        </div>
      </section>
      <section className="mt-14 rounded-xl bg-gray-600 p-4 text-lg">
        <h2 className="text-2xl font-bold">react-hooks/useString</h2>
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
      </section>
      <section className="mt-14 rounded-xl bg-gray-600 p-4 text-lg">
        <h2 className="text-2xl font-bold">react-hooks/useWindowScroll</h2>
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
          <div className="h-[100vh]"></div>
        </div>
      </section>
    </>
  );
}
