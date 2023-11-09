import './App.css';
import { useCookies } from '@lani.ground/react-hooks';
import { useEffect } from 'react';

export default function Hooks() {
  const { getCookie, setCookie, hasCookie, deleteCookie } = useCookies();
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
    <main className="flex flex-col">
      <button type="button" onClick={() => checkCookie()}>
        Check Cookie
      </button>
      <button type="button" onClick={() => setTestCookie()}>
        Set Cookie
      </button>
      <button type="button" onClick={() => deleteCookie('test')}>
        Delete Cookie
      </button>
    </main>
  );
}
