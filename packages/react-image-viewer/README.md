# react-image-viewer

![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-image-viewer)

Image Viewer for viewing images inside react components

[Demo](https://laniground.com/playground/react-image-viewer)

## Example

![Viewer Example](https://laniground.com/assets/example/react-image-viewer-example.gif)

## Installation

```bash
npm install @lani.ground/react-image-viewer

// or

yarn add @lani.ground/react-image-viewer
```

## Usage

```tsx
import { ImageViewerProvider } from '@lani.ground/react-image-viewer';
import '@lani.ground/react-image-viewer/css';

<ImageViewerProvider
  controller={{
    prev: (
      <button type="button" onClick={() => console.log('prev')}>
        prev
      </button>
    ),
    next: <button type="button" onClick={() => console.log('next')}></button>,
  }}
  disabledGallery={false}
>
  ...
</ImageViewerProvider>;
```

## Props

| Name                 | type                                                     | description                                                                                                                                    |
| -------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| controller(optional) | {<br />next: JSX.Element;<br />prev: JSX.Element;<br />} | To customize the arrow, pass the element through the controller props<br /> 화살표를 커스텀하려면 JSX.Element를 controller props에 전달합니다. |
| disabledGallery(optional) | boolean(default: false)  | Check to disable gallery mode (switches to single image viewer upon deactivation)<br /> 갤러리 모드를 해제할지 여부(해제시 단일 이미지 뷰어로 전환됩니다.) |