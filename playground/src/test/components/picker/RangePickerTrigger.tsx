interface RangePickerTriggerProps {
  startValue?: string;
  endValue?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  onStartClick: () => void;
  onEndClick: () => void;
  disabled?: boolean;
  activeInput?: 'start' | 'end' | null;
}

export const RangePickerTrigger = ({
  startValue,
  endValue,
  startPlaceholder,
  endPlaceholder,
  onStartClick,
  onEndClick,
  disabled,
  activeInput,
}: RangePickerTriggerProps) => (
  <div className="flex items-center justify-start gap-2">
    <div
      className={`inline-flex items-center justify-between gap-2 bg-white p-2 px-4 ${
        activeInput === 'start' ? 'border border-red-500' : ''
      }`}
    >
      <input
        type="text"
        readOnly
        disabled={disabled}
        placeholder={startPlaceholder || '시작일'}
        value={startValue || ''}
        className="text-black focus:outline-none"
      />
      <button
        type="button"
        className="picker-trigger-button"
        onClick={!disabled ? onStartClick : undefined}
        disabled={disabled}
        style={{
          width: '18px',
          height: '18px',
          backgroundImage:
            'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cmVjdCBoZWlnaHQ9IjgiIHdpZHRoPSIzMCIgeD0iNDkiIHk9IjEiLz48cG9seWdvbiBwb2ludHM9IjExOSwxMTkgOSwxMTkgOSw0OSAxLDQ5IDEsMTI3IDEyNywxMjcgMTI3LDQ5IDExOSw0OSAgIi8+PHBvbHlnb24gcG9pbnRzPSIxMDcsOSAxMTksOSAxMTksMzEgOSwzMSA5LDkgMjEsOSAyMSwxIDEsMSAxLDM5IDEyNywzOSAxMjcsMSAxMDcsMSAgIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9IjMxIiB5PSIxIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9Ijg5IiB5PSIxIi8+PC9nPjwvc3ZnPg==")',
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
    <span className="inline-flex text-white">~</span>
    <div
      className={`inline-flex items-center justify-between gap-2 bg-white  p-2 px-4 ${
        activeInput === 'end' ? 'border border-red-500' : ''
      }`}
    >
      <input
        type="text"
        readOnly
        disabled={disabled}
        placeholder={endPlaceholder || '종료일'}
        value={endValue || ''}
        className="text-black focus:outline-none"
      />
      <button
        type="button"
        className="picker-trigger-button"
        onClick={!disabled ? onEndClick : undefined}
        disabled={disabled}
        style={{
          width: '18px',
          height: '18px',
          backgroundImage:
            'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cmVjdCBoZWlnaHQ9IjgiIHdpZHRoPSIzMCIgeD0iNDkiIHk9IjEiLz48cG9seWdvbiBwb2ludHM9IjExOSwxMTkgOSwxMTkgOSw0OSAxLDQ5IDEsMTI3IDEyNywxMjcgMTI3LDQ5IDExOSw0OSAgIi8+PHBvbHlnb24gcG9pbnRzPSIxMDcsOSAxMTksOSAxMTksMzEgOSwzMSA5LDkgMjEsOSAyMSwxIDEsMSAxLDM5IDEyNywzOSAxMjcsMSAxMDcsMSAgIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9IjMxIiB5PSIxIi8+PHJlY3QgaGVpZ2h0PSIxOCIgd2lkdGg9IjgiIHg9Ijg5IiB5PSIxIi8+PC9nPjwvc3ZnPg==")',
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
  </div>
);

export default RangePickerTrigger;
