'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ImgViewer from './Viewer';

export const GROUND_IMAGE_VIEWER_ROOT = 'ground-image-viewer-root';

type Props = {
  children: JSX.Element;
  controller?: {
    next: JSX.Element;
    prev: JSX.Element;
  };
} & React.ComponentProps<'div'>;

export default function ImageViewerProvider({
  children,
  controller,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>();
  const imageViewerProviderRef = useRef<HTMLDivElement>(null);

  const onCloseImgViewer = () => {
    setIsOpen(false);
  };

  const openImageViewer = (e: MouseEvent, index?: number) => {
    e.stopPropagation();

    setIsOpen(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!imageViewerProviderRef.current) return undefined;

    const $images = Array.from(
      imageViewerProviderRef.current.querySelectorAll('img'),
    );

    $images.forEach((img, index) => {
      img.addEventListener('click', (e) => openImageViewer(e, index));
    });

    setImages($images);

    return () => {
      $images.forEach((img) => {
        img.removeEventListener('click', openImageViewer);
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const $body = document.querySelector('body');

    if (!$body) return undefined;
    if (document.querySelector(`#${GROUND_IMAGE_VIEWER_ROOT}`))
      return undefined;

    const $imageViewerRoot = document.createElement('div');
    $imageViewerRoot.setAttribute('id', GROUND_IMAGE_VIEWER_ROOT);

    $body.appendChild($imageViewerRoot);

    setModalRoot($imageViewerRoot);
    return () => {
      $imageViewerRoot.remove();
    };
  }, []);

  return (
    <>
      <div ref={imageViewerProviderRef}>{children}</div>
      {isOpen &&
        modalRoot &&
        createPortal(
          <ImgViewer
            {...props}
            controller={controller}
            images={images}
            currentIndex={currentIndex || 0}
            onCloseImgViewer={onCloseImgViewer}
          />,
          modalRoot,
        )}
    </>
  );
}
