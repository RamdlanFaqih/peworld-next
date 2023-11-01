import React from 'react';
import { Modal } from 'flowbite-react';
import { useRouter } from 'next/router';
import Button from '../button/button';

export default function PopUpModal({ onClose }) {
  const router = useRouter();

  const handleRegisterWorkers = () => {
    router.push('/auth/workers/register'); 
    onClose(); 
  };

  const handleRegisterRecruiters = () => {
    router.push('/auth/recruiters/register'); 
    onClose();
  };

  return (
    <>
      <Modal show={true} size="lg" popup onClose={onClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="px-5 mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Kamu ingin daftar sebagai apa ?
            </h3>
            <div className="flex justify-center gap-4 px-5">
              <Button text="Pekerja" onClick={handleRegisterWorkers}>
              </Button>
              <Button text="Perekrut" onClick={handleRegisterRecruiters}>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
