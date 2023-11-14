import { cloneElement, useEffect, useRef, useState } from 'react';
import { OutsideClickHandler } from '@lani.ground/react-outside-click-handler';
import useScrollLock from '../hooks/useScrollLock';

type Props = {
  controller?: {
    next: JSX.Element;
    prev: JSX.Element;
  };
  currentIndex: number;
  images: HTMLImageElement[];
  onCloseImgViewer: () => void;
} & React.ComponentProps<'div'>;

export default function ImgViewer({
  controller,
  currentIndex,
  images,
  onCloseImgViewer,
  ...props
}: Props) {
  const { lockScroll, unlockScroll } = useScrollLock();
  const currentImage = useRef<HTMLImageElement | null>(null);
  const imgViewer = useRef<HTMLDivElement | null>(null);
  const thumbnailContainer = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(0);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [currentDragOffset, setCurrentDragOffset] = useState({ x: 0, y: 0 });

  const calculateDelta = (
    event: Touch | React.MouseEvent<HTMLImageElement>,
    initial: {
      x: number;
      y: number;
    },
  ) => ({
    x: event.clientX - initial.x,
    y: event.clientY - initial.y,
  });

  const dragHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLImageElement>) => {
      setIsDragging(true);
      setStartDragPosition({ x: e.clientX, y: e.clientY });
      setCurrentDragOffset(dragPosition);
    },
    onMouseMove: (e: React.MouseEvent<HTMLImageElement>) => {
      if (isDragging) {
        const delta = calculateDelta(e, startDragPosition);
        setDragPosition({
          x: delta.x + currentDragOffset.x,
          y: delta.y + currentDragOffset.y,
        });
      }
    },
    onMouseUp: () => setIsDragging(false),
    onTouchStart: (e: React.TouchEvent<HTMLImageElement>) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setStartDragPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
        setCurrentDragOffset(dragPosition);
      }
    },
    onTouchMove: (e: React.TouchEvent<HTMLImageElement>) => {
      if (isDragging && e.touches.length === 1) {
        const delta = calculateDelta(e.touches[0] as Touch, startDragPosition);
        setDragPosition({
          x: delta.x + currentDragOffset.x,
          y: delta.y + currentDragOffset.y,
        });
      }
    },
    onTouchEnd: () => setIsDragging(false),
  };

  const onScrollCurrentThumbnail = (index: number) => {
    if (!thumbnailContainer.current) return;

    const thumbnail = thumbnailContainer.current.children[index] as
      | HTMLElement
      | undefined;
    const containerWidth = thumbnailContainer.current.offsetWidth;

    const thumbnailWidth = thumbnail?.offsetWidth ?? 0;
    const thumbnailOffset = thumbnail?.offsetLeft ?? 0;

    const scrollLeft =
      thumbnailOffset - containerWidth / 2 + thumbnailWidth / 2;

    thumbnailContainer.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  const onClickThumbnail = (index: number) => {
    setActiveIndex(index);
    onScrollCurrentThumbnail(index);
  };

  const onMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const deltaY = e.deltaY / 100;
    setScale((prevScale) => Math.min(Math.max(prevScale - deltaY, 0), 10));
  };

  useEffect(() => {
    if (!currentImage.current) return;

    const newScale = 1 + scale * 0.1;
    currentImage.current.style.transform = `translate(calc(-50% + ${dragPosition.x}px), calc(-50% + ${dragPosition.y}px)) scale(${newScale})`;
  }, [scale, dragPosition]);

  useEffect(() => {
    if (!imgViewer.current) return () => {};

    const getDistance = (e: TouchEvent): number => {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      return Math.sqrt(
        (touch2.pageX - touch1.pageX) ** 2 + (touch2.pageY - touch1.pageY) ** 2,
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setInitialDistance(getDistance(e));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance !== null) {
        const newDistance = getDistance(e);
        const diff = initialDistance - newDistance;

        setScale((prev) => {
          const newScale = prev - diff * 0.1;

          if (newScale > 10) return 10;

          return newScale < 1 ? 0 : newScale;
        });

        setInitialDistance(newDistance);
      }
    };

    imgViewer.current.addEventListener(
      'touchstart',
      handleTouchStart as EventListener,
      {
        passive: false,
      },
    );
    imgViewer.current.addEventListener(
      'touchmove',
      handleTouchMove as EventListener,
      {
        passive: false,
      },
    );

    return () => {
      imgViewer?.current?.removeEventListener(
        'touchstart',
        handleTouchStart as EventListener,
      );
      imgViewer?.current?.removeEventListener(
        'touchmove',
        handleTouchMove as EventListener,
      );
    };
  }, [initialDistance]);

  useEffect(() => {
    setDragPosition({ x: 0, y: 0 });
    setScale(0);
    onScrollCurrentThumbnail(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const cancelEvent = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', cancelEvent as EventListener, {
      passive: false,
    });

    lockScroll();

    return () => {
      document.removeEventListener('touchmove', cancelEvent as EventListener);
      unlockScroll();
    };
  }, []);

  return (
    <div
      className="react-image-viewer__container"
      onWheel={onMouseWheel}
      ref={imgViewer}
      {...props}
    >
      <OutsideClickHandler onOutsideClick={onCloseImgViewer}>
        <>
          <img
            ref={currentImage}
            src={images[activeIndex].src}
            className="react-image-viewer__current-image"
            {...dragHandlers}
            alt=""
          />
          <div className="react-image-viewer__footer">
            <div className="react-image-viewer__arrows">
              {!controller && (
                <>
                  <button
                    type="button"
                    className="react-image-viewer__arrow"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(activeIndex - 1)}
                  >
                    <img
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHQiIGhlaWdodD0iMTI4cHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtNzMuODYzIDM4LjU3IDUuNjkxNCA1LjcxODgtMTkuNzIzIDE5LjcyMyAxOS43MjMgMTkuNjk5LTUuNjkxNCA1LjcxODgtMjUuNDE4LTI1LjQxOCAyLjg0NzctMi44NzExeiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K"
                      alt="prev"
                    />
                  </button>
                  <button
                    type="button"
                    className="react-image-viewer__arrow"
                    disabled={activeIndex + 1 === images.length}
                    onClick={() => setActiveIndex(activeIndex + 1)}
                  >
                    <img
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTI4cHQiIGhlaWdodD0iMTI4cHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8cGF0aCBkPSJtNTQuMTM3IDM4LjU3LTUuNjkxNCA1LjcxODggMTkuNzIzIDE5LjcyMy0xOS43MjMgMTkuNjk5IDUuNjkxNCA1LjcxODggMjUuNDE4LTI1LjQxOC0yLjg0NzctMi44NzExeiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K"
                      alt="next"
                    />
                  </button>
                </>
              )}
              {controller && (
                <>
                  {cloneElement(controller.prev, {
                    onClick: () => {
                      if (activeIndex === 0) return;

                      controller.prev.props.onClick?.();
                      setActiveIndex(activeIndex - 1);
                    },
                    className: `${controller.prev.props.className ?? ''} ${
                      activeIndex === 0 ? 'disabled' : ''
                    }`,
                  })}

                  {cloneElement(controller.next, {
                    onClick: () => {
                      if (activeIndex + 1 === images.length) return;

                      controller.next.props.onClick?.();
                      setActiveIndex(activeIndex + 1);
                    },
                    className: `${controller.next.props.className ?? ''} ${
                      activeIndex + 1 === images.length ? 'disabled' : ''
                    }`,
                  })}
                </>
              )}
            </div>
            <div
              className="react-image-viewer__pagination"
              ref={thumbnailContainer}
            >
              {images.length > 0 &&
                images.map((image, index) => (
                  <button
                    type="button"
                    className="react-image-viewer__pagination_thumbnail"
                    key={image.src}
                    onClick={() => onClickThumbnail(index)}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className={`${activeIndex === index ? 'current' : ''}`}
                    />
                  </button>
                ))}
            </div>
          </div>
        </>
      </OutsideClickHandler>
    </div>
  );
}
