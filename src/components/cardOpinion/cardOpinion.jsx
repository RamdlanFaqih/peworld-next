import React from "react";
import Image from "next/image";
import Styles from "./styles.module.css";

const CardOpinion = ({ displayPicture, username, job, comment, onClick }) => {
  return (
    <div className={`${Styles.cardContainer} bg-white shadow-md overflow-hidden p-4 mb-4`}>
      <div className={`${Styles.displayPictureContainer} mb-4 flex items-center justify-center`}>
        <Image
          src={displayPicture || "/dummyProfile.png"}
          alt="Foto Profil"
          width={120}
          height={120}
          className={Styles.displayPicture}
        />
      </div>
      <div className={`${Styles.contentOpinion} text-center`}>
        <h2 className="text-xl font-semibold mb-2">{username || "Nama Pengguna"}</h2>
        <p className="text-gray-600 mb-2">{job || "Pekerjaan Pengguna"}</p>
        <p className="text-gray-800 mb-4">{comment || "Komentar Pengguna tentang Website"}</p>
      </div>
    </div>
  );
};

export default CardOpinion;
