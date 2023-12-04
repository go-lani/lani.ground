import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';
import DummyComponent from './mock/DummyComponent';
import ContentLayout from './common/ContentLayout';
import { useState } from 'react';

export default function ModalPage() {
  const [isVaild, setIsValid] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ContentLayout packageName="react-modal">
      <button type="button" onClick={() => setIsOpen(true)}>
        is modal open
      </button>
      <Modal
        name="modal-default"
        component={(closeModal) => (
          <div className="bg-white">다이렉트 모달</div>
        )}
        onAfterClose={() => {
          setIsOpen(false);
        }}
        animation={{
          className: 'sample',
          duration: 300,
        }}
        dim="rgba(0, 0, 0, 0.8)"
        direct={isOpen}
        centerMode
      />

      <Modal
        name="modal-default"
        trigger={
          <button
            type="button"
            className="rounded bg-green-500 px-4 py-2 text-lg font-bold text-white"
            onClick={() => {
              setIsValid(!!Math.round(Math.random())); // random boolean
            }}
          >
            Click Me!
          </button>
        }
        component={(closeModal) => {
          if (isVaild) return <div className="text-blue-500">Vaild!</div>;
          return <div className="text-red-500">Not vaild!</div>;
        }}
        dim="rgba(0, 0, 0, 0.8)"
      />
      <div className="h-[100vh] bg-red-200">section 1</div>
      <Modal
        name="modal"
        trigger={
          <button
            type="button"
            className="rounded bg-green-500 px-4 py-2 text-lg font-bold text-white"
          >
            Click Me!
          </button>
        }
        component={(closeModal) => <DummyComponent closeModal={closeModal} />}
        onAfterClose={() => {
          // callback here
          // console.log('callback');
        }}
        dim="rgba(0, 0, 0, 0.8)"
        animation={{
          className: 'sample',
          duration: 300,
        }}
        centerMode
      />
      <div className="h-[100vh] bg-red-300">section 2</div>
      <div className="h-[100vh] bg-red-400">section 3</div>
      <div className="h-[100vh] bg-red-500">section 4</div>
    </ContentLayout>
  );
}
