"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function OutsideClickHandler(_a) {
    var onOutsideClick = _a.onOutsideClick, children = _a.children;
    var $outerHandlerRef = (0, react_1.useRef)(null);
    var outsideClickHandler = function (e) {
        if (!$outerHandlerRef.current ||
            $outerHandlerRef.current.contains(e.target))
            return;
        onOutsideClick();
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('click', outsideClickHandler, { capture: true });
        return function () {
            document.removeEventListener('click', outsideClickHandler, {
                capture: true,
            });
        };
    }, []);
    return (0, jsx_runtime_1.jsx)("div", { ref: $outerHandlerRef, children: children });
}
exports.default = OutsideClickHandler;
