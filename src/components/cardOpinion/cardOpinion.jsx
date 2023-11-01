import React from "react";
import Image from "next/image";
import Styles from "./styles.module.css";

const CardOpinion = ({ type, text, onClick }) => {
  return (
    <div className={`${Styles.cardContainer} bg-white shadow-md overflow-hidden p-4 mb-4`}>
      <div className={`${Styles.displayPictureContainer} mb-4 flex items-center justify-center`}>
        <Image
          src="/hero.jpeg"
          alt="Foto Profil"
          width={120}
          height={120}
          className={Styles.displayPicture}
        />
      </div>
      <div className={`${Styles.contentOpinion} text-center`}>
        <h2 className="text-xl font-semibold mb-2">Nama Pengguna</h2>
        <p className="text-gray-600 mb-2">Pekerjaan Pengguna</p>
        <p className="text-gray-800 mb-4">
          Komentar Pengguna tentang Website Lorem ipsum dolor sit amet
        </p>
      </div>
    </div>
  );
};

export default CardOpinion;
