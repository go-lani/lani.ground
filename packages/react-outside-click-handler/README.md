# react-outside-click-handler


![npm version](https://img.shields.io/npm/v/%40lani.ground/react-outside-click-handler)

Handler component that make it easier to control when you click on a component other than the one you want.

[Demo](https://laniground.com/playground/react-outside-click-handler)

## Example

![Outside click handler Example](https://laniground.com/assets/example/outside_click_handler_example.gif)

## Installation

``` bash
npm install @lani.ground/react-outside-click-handler

// or

yarn add @lani.ground/react-outside-click-handler
```

## Usage

``` tsx
import { OutsideClickHandler } from "@lani.ground/react-outside-click-handler";

const [selectedOption, setSelectedOption] = useState<string>("");
const [isOpen, setIsOpen] = useState<boolean>(false);

const OPTIONS = ["option1", "option2", "option3"];

<button type="button" onClick={() => setIsOpen(true)}>
  Click Me
</button>

{
  isOpen && (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <ul className="bg-gray-500 px-5">
        {OPTIONS.map((option) => (
          <li>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </OutsideClickHandler>
  );
}

<p>
  selected: <strong>{selectedOption}</strong>
</p>
```

## Props

| Name                            | Type        | Description                                                                                                                            |
| ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| onOutsideClick<b>(required)</b> | () => void  | Function called when a click occurs outside the consumer's area<br /> 소비자 컴포넌트의 영역을 제외한 영역을 클릭했을 때 호출되는 함수 |
| children<b>(required)</b>       | JSX.Element | Consumer Component<br /> 소비자 컴포넌트                                                                                               |
| disabled<b>(optional)</b>       | boolean(default: false) | ouside click disabled<br /> 외부 영역 클릭 비활성화 |                                                                      |
| capture<b>(optional)</b>       | boolean(default: true) | Whether capturing is enabled<br /> 캡처링 사용 여부 |
