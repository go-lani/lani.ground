import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';
import DummyComponent from './mock/DummyComponent';
import ContentLayout from './common/ContentLayout';

export default function ModalPage() {
  return (
    <ContentLayout packageName="react-modal">
      <Modal
        name="modal-default"
        trigger={
          <button
            type="button"
            className="rounded bg-green-500 px-4 py-2 text-lg font-bold text-white"
          >
            Click Me!
          </button>
        }
        component={(closeModal) => <DummyComponent closeModal={closeModal} />}
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
          duration: 1000,
          className: 'sample',
        }}
        centerMode
      />
      <div className="h-[100vh] bg-red-300">section 2</div>
      <div className="h-[100vh] bg-red-400">section 3</div>
      <div className="h-[100vh] bg-red-500">section 4</div>
    </ContentLayout>
  );
}
