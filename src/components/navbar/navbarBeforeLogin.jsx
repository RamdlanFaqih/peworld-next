import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "../button/button";
import Styles from "./styles.module.css";
import React, { useState } from 'react';
import Modal from "./popUpModalLogin";
import ModalRegister from "./popUpModalRegister";

const inter = Inter({ subsets: ["latin"] });

export default function NavbarBeforeLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className={`${Styles.container} flex flex-col md:flex-row justify-between py-5 px-4 md:px-10 lg:px-20 xl:px-32`}>
      <div className="mb-4 md:mb-0">
        <Image src="/brand.svg" alt="peworld" width={127} height={35} className="max-w-full" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <Button style="outline" text="Masuk" onClick={() => setIsModalOpen(true)} />
        <Button style="filled" text="Daftar" onClick={() => setIsRegisterModalOpen(true)} />
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      {isRegisterModalOpen && <ModalRegister onClose={() => setIsRegisterModalOpen(false)} />}
    </div>
  );
}
