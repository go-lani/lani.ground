/// <reference types="react" />
type OuterHandlerProps = {
    onOutsideClick: () => void;
    children: JSX.Element;
};
export default function OutsideClickHandler({ onOutsideClick, children, }: OuterHandlerProps): JSX.Element;
export {};
