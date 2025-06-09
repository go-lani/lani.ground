# @lani.ground/react-picker

![npm](https://img.shields.io/npm/v/%40lani.ground%2Freact-picker)

> React date/time picker library

## Installation

```sh
npm install @lani.ground/react-picker
```

## 📌 중요한 사용법 안내

**모든 Picker 컴포넌트는 팝업 UI만 제공합니다.**

트리거 요소(버튼, 입력 필드 등)는 사용자가 직접 구현해야 합니다. 각 컴포넌트는 `isOpen`, `onOpenChange` props를 통해 팝업 상태를 제어할 수 있습니다.

```jsx
// 예시: 사용자가 구현해야 하는 트리거
function MyDatePicker() {
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 사용자가 직접 구현하는 트리거 */}
      <button onClick={() => setIsOpen(true)}>
        {date ? date.toLocaleDateString() : '날짜 선택'}
      </button>

      {/* Picker 컴포넌트 */}
      <DatePicker
        date={date}
        onChange={setDate}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
```

## 컴포넌트 개요

이 라이브러리는 5가지 유형의 picker 컴포넌트를 제공합니다.

| 컴포넌트 | 설명 | 주요 기능 |
|----------|------|-----------|
| **DatePicker** | 단일 날짜 선택기 | 날짜 하나만 선택, 다양한 캘린더 타입 지원 |
| **RangePicker** | 날짜 범위 선택기 | 시작일-종료일 범위 선택, 빠른 선택 옵션 |
| **TimePicker** | 시간 선택기 | Date 객체/문자열 지원, 다양한 시간 단위 |
| **Calendar** | 독립 캘린더 | 단일/범위 모드 지원, 팝업 없이 직접 사용 |
| **DateTimePicker** | 날짜/시간 선택기 | 날짜와 시간을 함께 선택 |

---

## 1. DatePicker

단일 날짜를 선택할 수 있는 컴포넌트입니다.

### Props

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `date` | `Date \| null` | ✓ | - | 선택된 날짜 |
| `onChange` | `(date: Date) => void` | ✓ | - | 날짜 변경 콜백 |
| `isOpen` | `boolean` | ✓ | - | 팝업 열림 상태 |
| `onOpenChange` | `(isOpen: boolean) => void` | ✓ | - | 팝업 상태 변경 콜백 |
| `calendarType` | `'default' \| 'multiple' \| 'scroll'` | | `'default'` | 캘린더 유형 |
| `minDate` | `Date` | | - | 최소 선택 가능 날짜 |
| `maxDate` | `Date` | | - | 최대 선택 가능 날짜 |
| `className` | `string` | | - | CSS 클래스명 |
| `weekDays` | `string[]` | | - | 요일 라벨 배열 |
| `weekendColor` | `string` | | - | 주말 색상 |
| `holidayColor` | `string` | | - | 공휴일 색상 |
| `holidays` | `Date[]` | | - | 공휴일 날짜 배열 |
| `disabled` | `boolean` | | `false` | 비활성화 여부 |
| `autoClose` | `boolean` | | `false` | 자동 닫기 여부 |

### 사용 예시

```jsx
import { DatePicker } from '@lani.ground/react-picker';

function App() {
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DatePicker
      date={date}
      onChange={setDate}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      autoClose={true}
    />
  );
}
```

---

## 2. RangePicker

시작일과 종료일을 선택할 수 있는 범위 선택 컴포넌트입니다.

### Props

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `range` | `[Date \| null, Date \| null]` | ✓ | - | 선택된 날짜 범위 [시작일, 종료일] |
| `onChange` | `(range: [Date \| null, Date \| null]) => void` | ✓ | - | 범위 변경 콜백 |
| `isOpen` | `boolean` | ✓ | - | 팝업 열림 상태 |
| `onOpenChange` | `(isOpen: boolean) => void` | ✓ | - | 팝업 상태 변경 콜백 |
| `calendarType` | `'default' \| 'multiple' \| 'scroll'` | | `'default'` | 캘린더 유형 |
| `className` | `string` | | - | CSS 클래스명 |
| `minDate` | `Date` | | - | 최소 선택 가능 날짜 |
| `maxDate` | `Date` | | - | 최대 선택 가능 날짜 |
| `weekDays` | `string[]` | | - | 요일 라벨 배열 |
| `weekendColor` | `string` | | - | 주말 색상 |
| `holidayColor` | `string` | | - | 공휴일 색상 |
| `holidays` | `Date[]` | | - | 공휴일 날짜 배열 |
| `disabled` | `boolean` | | `false` | 비활성화 여부 |
| `activeInput` | `'start' \| 'end' \| null` | | `null` | 활성 입력 필드 |
| `onActiveInputChange` | `(activeInput: 'start' \| 'end' \| null) => void` | | - | 활성 입력 변경 콜백 |
| `quickSelectOptions` | `{label: string; days: number}[]` | | - | 빠른 선택 옵션 |
| `enableReset` | `boolean` | | - | 초기화 버튼 활성화 |
| `autoClose` | `boolean` | | `false` | 자동 닫기 여부 |

### 사용 예시

```jsx
import { RangePicker } from '@lani.ground/react-picker';

function App() {
  const [range, setRange] = useState([null, null]);
  const [isOpen, setIsOpen] = useState(false);

  const quickOptions = [
    { label: '최근 7일', days: 7 },
    { label: '최근 30일', days: 30 },
    { label: '최근 90일', days: 90 },
  ];

  return (
    <RangePicker
      range={range}
      onChange={setRange}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      quickSelectOptions={quickOptions}
      enableReset={true}
      calendarType="multiple"
    />
  );
}
```

---

## 3. TimePicker

시간을 선택할 수 있는 컴포넌트입니다. Date 객체 또는 문자열 형태를 지원합니다.

### Types

```typescript
export type TimeStep = 1 | 5 | 10 | 15 | 30;
export type TimePickerMode = 'default' | 'panel';
export type TimeUnit = 'hour' | 'minute' | 'second' | 'ampm';

// Union type for different value types
export type TimePickerProps = DateTimePickerProps | StringTimePickerProps;
```

### Props

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `value` | `Date \| string \| null` | ✓ | - | 선택된 시간 |
| `onChange` | `(value: Date \| string \| null) => void` | ✓ | - | 시간 변경 콜백 |
| `isOpen` | `boolean` | ✓ | - | 열림 상태 |
| `onOpenChange` | `(isOpen: boolean) => void` | ✓ | - | 상태 변경 콜백 |
| `minuteStep` | `TimeStep` | | `1` | 분 단위 간격 |
| `secondStep` | `TimeStep` | | `1` | 초 단위 간격 |
| `className` | `string` | | - | CSS 클래스명 |
| `disabled` | `boolean` | | `false` | 비활성화 여부 |
| `mode` | `TimePickerMode` | | `'default'` | 모드 설정 |
| `enableSnap` | `boolean` | | `false` | 스냅 기능 활성화 |
| `timeUnits` | `TimeUnit[]` | | `['hour', 'minute', 'second']` | 표시할 시간 단위 |

### 사용 예시

```jsx
import { TimePicker } from '@lani.ground/react-picker';

function App() {
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      mode="panel"
      enableSnap={true}
      minuteStep={15}
      timeUnits={['hour', 'minute', 'ampm']}
    />
  );
}
```

---

## 4. Calendar

독립적으로 사용할 수 있는 캘린더 컴포넌트입니다. 단일 날짜 또는 범위 선택을 지원합니다.

### Props

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `type` | `'date' \| 'range'` | | `'date'` | 선택 유형 |
| `date` | `Date \| null` | | - | 선택된 날짜 (date 모드용) |
| `onDateChange` | `(date: Date \| null) => void` | | - | 날짜 변경 콜백 (date 모드용) |
| `range` | `[Date \| null, Date \| null]` | | `[null, null]` | 선택된 범위 (range 모드용) |
| `onRangeChange` | `(range: [Date \| null, Date \| null]) => void` | | - | 범위 변경 콜백 (range 모드용) |
| `calendarType` | `'default' \| 'multiple' \| 'scroll'` | | `'default'` | 캘린더 유형 |
| `className` | `string` | | - | CSS 클래스명 |
| `minDate` | `Date` | | - | 최소 선택 가능 날짜 |
| `maxDate` | `Date` | | - | 최대 선택 가능 날짜 |
| `weekDays` | `string[]` | | - | 요일 라벨 배열 |
| `weekendColor` | `string` | | - | 주말 색상 |
| `holidayColor` | `string` | | - | 공휴일 색상 |
| `holidays` | `Date[]` | | - | 공휴일 날짜 배열 |
| `quickSelectOptions` | `{label: string; days: number}[]` | | - | 빠른 선택 옵션 (range 모드에서만) |
| `enableReset` | `boolean` | | - | 초기화 버튼 활성화 |

### 사용 예시

```jsx
import { Calendar } from '@lani.ground/react-picker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Calendar
      date={selectedDate}
      onDateChange={setSelectedDate}
      calendarType="scroll"
      enableReset={true}
    />
  );
}
```

---

## 5. DateTimePicker

날짜와 시간을 함께 선택할 수 있는 컴포넌트입니다.

### Types

```typescript
export type TimeStep = 1 | 5 | 10 | 15 | 30;
export type CalendarType = 'scroll' | 'default';
export type AmPm = 'AM' | 'PM';
```

### Props

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `value` | `Date \| null` | ✓ | - | 선택된 날짜/시간 |
| `onChange` | `(date: Date \| null) => void` | ✓ | - | 변경 콜백 |
| `isOpen` | `boolean` | ✓ | - | 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | ✓ | - | 상태 변경 콜백 |
| `minDate` | `Date` | | - | 최소 선택 가능 날짜 |
| `maxDate` | `Date` | | - | 최대 선택 가능 날짜 |
| `holidays` | `Date[]` | | `[]` | 공휴일 날짜 배열 |
| `weekendColor` | `string` | | - | 주말 색상 |
| `holidayColor` | `string` | | - | 공휴일 색상 |
| `calendarType` | `CalendarType` | | `'default'` | 캘린더 유형 |
| `ampm` | `boolean` | | `false` | 12시간 형식 사용 여부 |
| `minuteStep` | `TimeStep` | | `1` | 분 단위 간격 |
| `secondStep` | `TimeStep` | | `1` | 초 단위 간격 |
| `className` | `string` | | - | CSS 클래스명 |

### 사용 예시

```jsx
import { DateTimePicker } from '@lani.ground/react-picker';

function App() {
  const [dateTime, setDateTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DateTimePicker
      value={dateTime}
      onChange={setDateTime}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      ampm={true}
      minuteStep={15}
      calendarType="scroll"
    />
  );
}
```

---

## 공통 옵션

### CalendarType

| 타입 | 설명 |
|------|------|
| `'default'` | 기본 단일 캘린더 |
| `'multiple'` | 2개월 동시 표시 |
| `'scroll'` | 스크롤 가능한 연속 캘린더 |

### TimeStep

시간 간격을 설정할 수 있습니다.

| 값 | 설명 |
|----|------|
| `1` | 1분/초 단위 |
| `5` | 5분/초 단위 |
| `10` | 10분/초 단위 |
| `15` | 15분/초 단위 |
| `30` | 30분/초 단위 |

### 스타일링

각 컴포넌트는 CSS 클래스를 통해 스타일을 커스터마이징할 수 있습니다. `className` prop을 사용하여 추가 클래스를 적용할 수 있습니다.
