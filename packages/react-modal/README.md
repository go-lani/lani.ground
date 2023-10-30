# react-modal


![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-modal)

Modal components used in reactjs.

## Installation

``` bash
npm install @lani.ground/react-modal

// or

yarn add @lani.ground/react-modal
```

## Example

![Modal Example](https://laniground.com/assets/example/react-modal-overlapping-example.gif)


## Usage

```tsx
// Components to be shown
function Popup(closeModal: () => Promise<void>) {
  return (
    <div>
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

``` tsx
import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';

<Modal
  name="modal"
  trigger={<button type="button">Click Me!</button>}
  component={Popup}
  onAfterClose={() => {
    // callback here
  }}
  dim="rgba(0, 0, 0, 0.8)"
  direct
/>
```

## Props


|Name|type|description|
|----|----|----|
|name(optional)|string (default: 'modal')|If there are nested modals, it should be used and requires a unique value.<br /> 고유한 값으로 중첩 모달을 사용시에 필요합니다.|
|trigger|JSX.Element|Trigger Component<br />When you click on the component, the modal component will be displayed on the screen.<br />트리거 컴포넌트|
|component|(closeModal: () => Promise<void>) => JSX.Element|Modal Component<br /> 화면에 표시될 모달 컴포넌트|
|onAfterClose(optional)|() => unknown|The callback function that is executed after the modal is closed.<br />모달이 닫힌 후 실행되는 콜백 함수입니다.|
|dim(optional)|string|Please enter the color to be used for dim.<br /> Dim 배경 색상|
|direct(optional)|boolean (default: false)|Whether to immediately show the modal upon rendering<br /> 모달을 렌더링 즉시 노출시킬지 여부|
