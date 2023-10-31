# react-hooks

![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-hooks)

## useVisibleElement

### usage

```tsx
export default function Component() {
  const { ref, activeKey, activeElement } = useVisibleElement({
    activeClass: 'active',
  });
  console.log('activeKey', activeKey); // scroll-item-0
  console.log('activeElement', activeElement); // <section><p>section 1</p></section>

  return (
    <div ref={ref}>
      <section>
        <p>section 1</p>
      </section>
      <section>
        <p>section 2</p>
      </section>
      <section>
        <p>section 3</p>
      </section>
      <section>
        <p>section 4</p>
      </section>
    </div>
  );
}
```


## useWindowScroll

### usage

```tsx
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
