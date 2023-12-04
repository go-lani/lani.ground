# react-modal

![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-modal)

Modal components used in reactjs.

[Demo](https://laniground.com/playground/react-modal)

## Example

![Modal Example](https://laniground.com/assets/example/react-modal_new.gif)

## Installation

```bash
npm install @lani.ground/react-modal

// or

yarn add @lani.ground/react-modal
```

## Usage

```tsx
// Components to be shown

interface PopupProps {
  closeModal: () => Promise<void>;
}

function Popup({closeModal}: PopupProps) {
  return (
    <div className="sample-modal-inner">
      <button
        type="button"
        onClick={closeModal}
      >
        Close Modal
      </button>
      <div>
        {/* content here */}
        {/*
          If you want to implement nested modals
          <Modal name="[unique name]"
            ...
          />
        */}
      </div>
    </div>
  );
}
  )
}
```

```tsx
// using modal
import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';

<Modal
  name="modal"
  trigger={<button type="button">Click Me!</button>}
  component={(closeModal) => <Popup closeModal={closeModal} />}
  onAfterClose={() => {
    // callback here
  }}
  dim="rgba(0, 0, 0, 0.8)"
  animation={{
    duration: 1000, // Modals cannot be re-opened or closed for the specified time.(ms)
    className: 'sample',
  }}
  centerMode
  direct
/>;
```

```css
/* Examples of effects when modals appear and disappear */
.react-modal__container__enter.sample,
.react-modal__container__exit.sample {
  transition-duration: 1s;
}

.react-modal__container__enter {
  opacity: 1;
  transition-property: all;
  filter: blur(0);
}

.react-modal__container__enter .sample-modal-inner {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  transition: all 1s;
}

.react-modal__container__exit {
  opacity: 0;
  transition-property: all;
  filter: blur(1rem);
}

.react-modal__container__exit .sample-modal-inner {
  transform: scale(0);
  opacity: 0;
  transition: all 1s;
  filter: blur(1rem);
}
```

### Isolating components by state

``` tsx
const [isVaild, setIsValid] = useState<boolean>(false);

<Modal
  trigger={
    <button
      type="button"
      onClick={() => {
        setIsValid(!!Math.round(Math.random())); // random boolean
      }}
    >
      Click Me!
    </button>
  }
  component={(closeModal) => {
    if (isVaild) return <div>Vaild!</div>;
    return <div>Not vaild!</div>;
  }}
/>
```


## Props

| Name                   | type                                                                                                   | description                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name(optional)         | string (default: 'modal')                                                                              | If there are nested modals, it should be used and requires a unique value.<br /> 고유한 값으로 중첩 모달을 사용시에 필요합니다.                                                                                                                                                                                                                                                                                                                                          |
| trigger(optional)                | JSX.Element                                                                                            | Trigger Component<br />When you click on the component, the modal component will be displayed on the screen.(If you set your own prop to true, you might not need a trigger prop.) <br />트리거 컴포넌트(만약 direct props를 true로 했을 때 trigger props가 필요하지 않을 수 있습니다.)                                                                                                                                                                                                                                                                                                                                        |
| component              | (closeModal: () => Promise<void>) => JSX.Element                                                       | Modal Component<br /> 화면에 표시될 모달 컴포넌트                                                                                                                                                                                                                                                                                                                                                                                                                        |
| onAfterClose(optional) | () => unknown                                                                                          | The callback function that is executed after the modal is closed.<br />모달이 닫힌 후 실행되는 콜백 함수입니다.                                                                                                                                                                                                                                                                                                                                                          |
| dim(optional)          | string                                                                                                 | Please enter the color to be used for dim.<br /> Dim 배경 색상                                                                                                                                                                                                                                                                                                                                                                                                           |
| direct(optional)       | boolean (default: false)                                                                               | Whether to immediately show the modal upon rendering<br /> 모달을 렌더링 즉시 노출시킬지 여부                                                                                                                                                                                                                                                                                                                                                                            |
| centerMode(optional)   | boolean (default: false)                                                                               | Whether to use the center mode<br /> 중앙 정렬 모드 사용 여부                                                                                                                                                                                                                                                                                                                                                                                                            |
| animation(optional)    | {<br />className?: string<br />(default: react-modal\_\_container), <br /> duration: number(ms)<br />} | You can set the animation option to add effects when a modal is displayed<br /> 모달이 표시될 때 효과를 추가하려면 애니메이션 옵션을 설정할 수 있습니다.<br /> **_className_**: You can inject a specific class so that you can control the animation. <br /> 애니메이션을 제어하기 위해 특정 클래스를 삽입할 수 있습니다.<br />**_duration_**: Modals cannot be re-opened or closed for the specified time.<br /> 모달은 지정된 시간 동안 다시 열거나 닫을 수 없습니다. |
