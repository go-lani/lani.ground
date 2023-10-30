import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export default function OutsideClickHandler(_a) {
    var onOutsideClick = _a.onOutsideClick, children = _a.children;
    var $outerHandlerRef = useRef(null);
    var outsideClickHandler = function (e) {
        if (!$outerHandlerRef.current ||
            $outerHandlerRef.current.contains(e.target))
            return;
        onOutsideClick();
    };
    useEffect(function () {
        document.addEventListener('click', outsideClickHandler, { capture: true });
        return function () {
            document.removeEventListener('click', outsideClickHandler, {
                capture: true,
            });
        };
    }, []);
    return _jsx("div", { ref: $outerHandlerRef, children: children });
}
