import { OutsideClickHandler } from '@lani.ground/react-outside-click-handler';
// import OutsideClickHandler from 'react-outside-click-handler';
import { useState } from 'react';
import '../App.css';

export default function OutsideClickHandlerPage() {
  const [number, setNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <h1 className="mb-14 text-3xl font-bold">@lani.ground/react-modal</h1>
      <div className="relative">
        <button
          type="button"
          className="rounded bg-green-500 px-4 py-2"
          onMouseDown={() => {
            setIsVisible(!isVisible);
          }}
        >
          button
        </button>
        {isVisible && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsVisible(false);
            }}
          >
            <ul className="absolute left-0 top-full w-[200px] bg-amber-500">
              <li>
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    setIsVisible(false);
                    setNumber(1);
                  }}
                >
                  1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    setNumber(2);
                    setIsVisible(false);
                  }}
                >
                  2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    setNumber(3);
                    setIsVisible(false);
                  }}
                >
                  3
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    setNumber(4);
                    setIsVisible(false);
                  }}
                >
                  4
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full"
                  onClick={() => {
                    setNumber(5);
                    setIsVisible(false);
                  }}
                >
                  5
                </button>
              </li>
            </ul>
          </OutsideClickHandler>
        )}
      </div>
      <p>current number : {number}</p>
    </>
  );
}
