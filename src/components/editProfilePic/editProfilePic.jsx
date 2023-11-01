import React from 'react';
import { Modal } from 'flowbite-react';
import { useRouter } from 'next/router';
import Button from '../button/button';

export default function EditProfiePic({ onClose }) {
  const router = useRouter();

  const handleLoginWorker = () => {
    router.push('/auth/workers/login'); 
    onClose();
  };

  const handleLoginRecruiter = () => {
    router.push('/auth/recruiters/login');
    onClose(); 
  };

  return (
    <>
      <Modal show={true} size="lg" popup onClose={onClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="px-5 mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Kamu ingin login sebagai apa ?
            </h3>
            <div className="flex justify-center gap-4 px-5">
              <Button text="Pekerja" onClick={handleLoginWorker}>
              </Button>
              <Button text="Perekrut" onClick={handleLoginRecruiter}>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
