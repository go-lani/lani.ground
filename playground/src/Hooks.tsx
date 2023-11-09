import './App.css';
import { useCookies } from '@lani.ground/react-hooks';
import { useEffect } from 'react';

export default function Hooks() {
  const { getCookie, setCookie, hasCookie, deleteCookie } = useCookies();
  const set = () => {
    const day = new Date();
    day.setMinutes(day.getMinutes() + 1);
    setCookie('test', 'true', { expires: 'today' });
  };

  useEffect(() => {
    const test = getCookie('test');
    console.log('test', test);
  }, []);

  return (
    <main className="flex flex-col">
      <button
        type="button"
        onClick={() => {
          const hasTest = hasCookie('test');
          console.log('hasTest', hasTest);
        }}
      >
        check cookie
      </button>
      <button type="button" onClick={set}>
        set cookie
      </button>
      <button type="button" onClick={() => deleteCookie('test')}>
        delete cookie
      </button>
      hi
    </main>
  );
}
