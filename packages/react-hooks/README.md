# react-hooks

![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-hooks)

React Hook Collection

[Demo](https://laniground.com/playground/react-hooks)

## useVisibleElement

### usage

```tsx
import { useVisibleElement } from '@lani.ground/react-hooks';

export default function Component() {
  const { ref, activeKey, activeElement } = useVisibleElement({
    activeClass: 'active',
  });
  console.log('activeKey', activeKey); // scroll-item-0
  console.log('activeElement', activeElement); // <section><p>section 1</p></section>

  return (
    <div ref={ref}>
      <section style={{height: '100vh'}}>
        <p>section 1</p>
      </section>
      <section style={{height: '100vh'}}>
        <p>section 2</p>
      </section>
      <section style={{height: '100vh'}}>
        <p>section 3</p>
      </section>
      <section style={{height: '100vh'}}>
        <p>section 4</p>
      </section>
    </div>
  );
}
```

## useWindowScroll

### usage

```tsx
import { useScrollLock } from '@lani.ground/react-hooks';

export default function Component() {
  comst {lockScroll, unlockScroll} = useScrollLock();

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    }
  }, [])


  return (<>...</>)
}
```

## useCookie

### usage

``` tsx
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
    <>
      <button type="button" onClick={() => checkCookie()}>
        Check Cookie
      </button>
      <button type="button" onClick={() => setTestCookie()}>
        Set Cookie
      </button>
      <button type="button" onClick={() => deleteCookie('test')}>
        Delete Cookie
      </button>
    </>
  );
}

```


## useString

### usage

``` tsx
import { useString } from '@lani.ground/react-hooks';

export default function String() {
  const { ellipsis } = useString();
  return (
    <>
      <p>{ellipsis({ value: 'String', length: 3, dir: 'left' })}</p> {/* ...ing */}
      <p>{ellipsis({ value: 'String', length: 3, dir: 'right' })}</p> {/* Str... */}
    </>
  )
}

```