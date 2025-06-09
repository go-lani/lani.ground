# @lani.ground/kits 🧰

![npm](https://img.shields.io/npm/v/%40lani.ground%2Fkits)

> 자주 사용되는 JavaScript 유틸리티 함수들을 모아놓은 종합 도구 모음

## 📦 설치

```bash
npm install @lani.ground/kits
```

또는

```bash
yarn add @lani.ground/kits
pnpm add @lani.ground/kits
```

## 🚀 사용법

```javascript
import { dateKit, numberKit, stringKit, objectKit, validateKit, cookieKit } from '@lani.ground/kits';
```

## 📅 dateKit

날짜 포맷팅, 비교, 변환 등 날짜 관련 유틸리티 함수들

### 주요 기능

- `formatDate()` - 날짜를 원하는 형식으로 포맷팅
- `displayDateFormat()` - 오프셋을 고려한 날짜 포맷팅
- `getValueByUnit()` - 날짜 객체에서 연/월/일 등 추출
- `isWithinDateRange()` - 날짜 범위 내 포함 여부 확인
- `isBefore()` / `isAfter()` - 날짜 비교
- `isLeapYear()` - 윤년 여부 확인
- `getLastDayOfMonth()` - 해당 월의 마지막 날 반환

### 사용 예제

```javascript
// 날짜 포맷팅
dateKit.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
// → "2024-03-15 14:30:00"

// 한국어 요일 포맷
dateKit.formatDate(new Date(), 'YYYY년 MM월 DD일 (ddd)');
// → "2024년 03월 15일 (금요일)"

// 오프셋을 고려한 포맷팅
dateKit.displayDateFormat({
  date: '2024-03-15T10:30:00',
  offset: '+09:00',
  format: 'YYYY-MM-DD HH:mm'
});
// → "2024-03-15 19:30"

// 윤년 체크
dateKit.isLeapYear(2024); // → true

// 날짜 구성 요소 추출
dateKit.getValueByUnit(new Date('2024-03-15 14:30:00'));
// → { year: 2024, month: 3, day: 15, hours: 14, minutes: 30, seconds: 0, milliseconds: 0 }

// 해당 월의 마지막 날
dateKit.getLastDayOfMonth(2024, 2); // → 29 (2024년 2월)
dateKit.getLastDayOfMonth(2023, 2); // → 28 (2023년 2월)

// 날짜 범위 확인
dateKit.isWithinDateRange({
  current: new Date(),
  startDT: new Date('2024-01-01'),
  endDT: new Date('2024-12-31')
});
// → true (현재가 2024년 내에 있다면)

// 날짜 비교
const now = new Date();
const futureDate = new Date('2024-12-31');
dateKit.isBefore({ current: now, targetDT: futureDate }); // → true
dateKit.isAfter({ current: now, targetDT: new Date('2023-01-01') }); // → true
```

## 🔢 numberKit

숫자 포맷팅, 소수점 처리 등 숫자 관련 유틸리티 함수들

### 주요 기능

- `divideNumberToDigits()` - 천 단위 구분자 추가
- `formatDecimalNumber()` - 소수점 자릿수 제한 및 포맷팅

### 사용 예제

```javascript
// 천 단위 구분자
numberKit.divideNumberToDigits(1234567);
// → "1,234,567"

// 소수점 포맷팅
numberKit.formatDecimalNumber(1234.56789, 2);
// → "1,234.57"

// 불필요한 0 제거
numberKit.formatDecimalNumber(1234.5000, 4, true);
// → "1,234.5"

// 문자열로도 처리 가능
numberKit.formatDecimalNumber('9876.543210', 3);
// → "9,876.543"

// 소수점 없는 정수
numberKit.formatDecimalNumber(1234567, 0);
// → "1,234,567"

// 아주 작은 소수 (지수 표기법 처리)
numberKit.formatDecimalNumber(0.000001234, 8);
// → "0.00000123"

// 음수 처리
numberKit.formatDecimalNumber(-1234.56789, 2);
// → "-1,234.57"
```

## ✂️ stringKit

문자열 자르기, 쿼리 변환 등 문자열 관련 유틸리티 함수들

### 주요 기능

- `getCutString()` - 문자열 자르기 (말줄임표 추가)
- `transformToQueryString()` - 객체를 쿼리 문자열로 변환
- `transformFirstCharUpperCase()` - 첫 글자 대문자화
- `maskString()` - 문자열 마스킹 처리

### 사용 예제

```javascript
// 문자열 자르기
stringKit.getCutString({
  value: '안녕하세요 반갑습니다',
  length: 5
});
// → "안녕하세요..."

// 왼쪽에서 자르기
stringKit.getCutString({
  value: '안녕하세요 반갑습니다',
  length: 5,
  dir: 'left'
});
// → "...반갑습니다"

// 쿼리 문자열 변환
stringKit.transformToQueryString({
  name: 'john',
  age: 30,
  tags: ['react', 'javascript']
});
// → "?name=john&age=30&tags=react&tags=javascript"

// 인코딩 옵션과 함께
stringKit.transformToQueryString({
  search: '한글 검색어',
  category: 'frontend'
}, { encode: true });
// → "?search=%ED%95%9C%EA%B8%80%20%EA%B2%80%EC%83%89%EC%96%B4&category=frontend"

// 빈 값들 처리
stringKit.transformToQueryString({
  name: 'john',
  age: null,
  email: undefined,
  active: true,
  count: 0
});
// → "?name=john&active=true&count=0" (null, undefined는 제외됨)

// 문자열 마스킹
stringKit.maskString('홍길동');
// → "홍*동"

// 첫 글자 대문자
stringKit.transformFirstCharUpperCase('hello world');
// → "Hello world"
```

## 🧩 objectKit

객체 검증, 정리 등 객체 관련 유틸리티 함수들

### 주요 기능

- `isEmptyObject()` - 빈 객체 여부 확인
- `getCompleteObject()` - null/undefined 속성 제거
- `getObjectKeyByValue()` - 값으로 키 찾기

### 사용 예제

```javascript
// 빈 객체 체크
objectKit.isEmptyObject({}); // → true
objectKit.isEmptyObject({ name: 'john' }); // → false

// 불완전한 속성 제거
objectKit.getCompleteObject({
  name: 'john',
  age: null,
  email: undefined,
  phone: '010-1234-5678'
});
// → { name: 'john', phone: '010-1234-5678' }

// 값으로 키 찾기
const statusMap = { pending: '대기중', completed: '완료' };
objectKit.getObjectKeyByValue(statusMap, '완료');
// → "completed"
```

## ✅ validateKit

이메일, 전화번호 등 데이터 형식 검증 유틸리티 함수들

### 주요 기능

- `isValidFormat()` - 이메일/전화번호 형식 검증

### 사용 예제

```javascript
// 이메일 검증
validateKit.isValidFormat({
  format: 'email',
  value: 'user@example.com'
});
// → true

// 전화번호 검증 (한국 형식)
validateKit.isValidFormat({
  format: 'phone',
  value: '010-1234-5678'
});
// → true

validateKit.isValidFormat({
  format: 'phone',
  value: '02-1234-5678'
});
// → false (010, 011, 016, 017, 018, 019만 지원)
```

## 🍪 cookieKit

쿠키 설정, 읽기, 삭제 등 쿠키 관련 유틸리티 함수들

### 주요 기능

- `setCookie()` - 쿠키 설정 (다양한 옵션 지원)
- `getCookie()` - 쿠키 값 읽기
- `deleteCookie()` - 쿠키 삭제
- `hasCookie()` - 쿠키 존재 여부 확인

### 사용 예제

```javascript
// 기본 쿠키 설정
cookieKit.setCookie('username', 'john');

// 옵션과 함께 쿠키 설정
cookieKit.setCookie('token', 'abc123', {
  path: '/',
  expires: 'today', // 오늘 자정에 만료
  secure: true
});

// 1시간 후 만료되는 쿠키
cookieKit.setCookie('session', 'xyz789', {
  maxAge: 3600 // 초 단위
});

// 쿠키 읽기
cookieKit.getCookie('username'); // → "john"

// 쿠키 존재 확인
cookieKit.hasCookie('username'); // → true

// 쿠키 삭제
cookieKit.deleteCookie('username');
```
