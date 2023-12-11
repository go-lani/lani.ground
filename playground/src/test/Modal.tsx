import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';
import DummyComponent from './mock/DummyComponent';
import ContentLayout from './common/ContentLayout';
import { useEffect, useState } from 'react';

export default function ModalPage() {
  const [isVaild, setIsValid] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(!!Math.round(Math.random()));
  }, []);

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
        onClose={() => {
          setIsOpen(false);
        }}
        animation={{
          className: 'sample',
          duration: 300,
        }}
        dim="rgba(0, 0, 0, 0.8)"
        isOpen={isOpen}
        centerMode
      />

      <Modal
        name="modal-default"
        component={(closeModal) => {
          if (isVaild) return <div className="text-blue-500">Vaild!</div>;
          return <div className="text-red-500">Not vaild!</div>;
        }}
        onClose={() => {
          setIsOpen2(false);
        }}
        dim="rgba(0, 0, 0, 0.8)"
        isOpen={isOpen2}
      />
      <div className="h-[100vh] bg-red-200">section 1</div>
      <button
        type="button"
        className="rounded bg-green-500 px-4 py-2 text-lg font-bold text-white"
        onClick={() => setIsOpen3(true)}
      >
        Click Me!
      </button>
      <Modal
        name="modal"
        component={(closeModal) => <DummyComponent closeModal={closeModal} />}
        onClose={() => {
          setIsOpen3(false);
        }}
        dim="rgba(0, 0, 0, 0.8)"
        animation={{
          className: 'sample',
          duration: 300,
        }}
        centerMode
        isOpen={isOpen3}
      />
      <div className="h-[100vh] bg-red-300">section 2</div>
      <div className="h-[100vh] bg-red-400">section 3</div>
      <div className="h-[100vh] bg-red-500">section 4</div>
    </ContentLayout>
  );
}
