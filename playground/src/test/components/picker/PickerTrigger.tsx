interface PickerTriggerProps {
  type?: 'date' | 'time';
  onClick: () => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
}

export const PickerTrigger = ({
  type = 'date',
  onClick,
  placeholder,
  value,
  disabled,
  isActive,
  className,
}: PickerTriggerProps) => (
  <div
    className={`inline-flex items-center justify-between gap-2 bg-white p-2 px-4 ${
      isActive ? 'active' : ''
    } ${className || ''} relative`}
    onClick={!disabled ? onClick : undefined}
  >
    <input
      type="text"
      readOnly
      disabled={disabled}
      placeholder={placeholder}
      value={value || ''}
      className="text-black focus:outline-none"
    />
    <button
      type="button"
      className="picker-trigger-button"
      disabled={disabled}
      style={{
        width: '18px',
        height: '18px',
        backgroundImage: `url(${
          type === 'date'
            ? 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cmVjdCBoZWlnaHQ9IjgiIHdpZHRoPSIzMCIgeD0iNDkiIHk9IjEiLz48cG9seWdvbiBwb2ludHM9IjExOSwxMTkgOSwxMTkgOSw0OSAxLDQ5IDEsMTI3IDEyNywxMjcgMTI3LDQ5IDExOSw0OSAgIi8+PHBvbHlnb24gcG9pbnRzPSIxMDcsOSAxMTksOSAxMTksMzEgOSwzMSA5LDkgMjEsOSAyMSwxIDEsMSAxLDM5IDEyNywzOSAxMjcsMSAxMDcsMSAgIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9IjMxIiB5PSIxIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9Ijg5IiB5PSIxIi8+PC9nPjwvc3ZnPg=='
            : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cG9seWdvbiBwb2ludHM9Ijk5LDYwIDY4LDYwIDY4LDI5IDYwLDI5IDYwLDY4IDk5LDY4ICAiLz48cmVjdCBoZWlnaHQ9IjgiIHdpZHRoPSI4IiB4PSIyMCIgeT0iNjAiLz48cGF0aCBkPSJNNjQsMTI3YzM0LjgsMCw2My0yOC4yLDYzLTYzUzk4LjgsMSw2NCwxQzI5LjIsMSwxLDI5LjIsMSw2NFMyOS4yLDEyNyw2NCwxMjd6IE02NCw5YzMwLjMsMCw1NSwyNC43LDU1LDU1cy0yNC43LDU1LTU1LDU1ICAgQzMzLjcsMTE5LDksOTQuMyw5LDY0UzMzLjcsOSw2NCw5eiIvPjwvZz48L3N2Zz4='
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 0,
      }}
    >
      열기
    </button>
  </div>
);

export default PickerTrigger;
