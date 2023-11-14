import { Modal } from '@lani.ground/react-modal';
import '@lani.ground/react-modal/css';
import DummyComponent from './mock/DummyComponent';
import ContentLayout from './common/ContentLayout';

export default function ModalPage() {
  return (
    <ContentLayout packageName="react-modal">
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
          console.log('callback');
        }}
        dim="rgba(0, 0, 0, 0.8)"
        animation={{
          duration: 500,
          className: 'sample-modal',
        }}
        centerMode
      />
    </ContentLayout>
  );
}
